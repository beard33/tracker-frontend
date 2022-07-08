import axios from "axios";
import AxiosInstance from "../axios/AxiosInstance";
import { refreshToken, logout } from "../redux/Actions";




const setup = (store) => {
    AxiosInstance.interceptors.request.use((config) => {
        let token = JSON.parse(localStorage.getItem("user"))?.access_token        
        console.log(token)
        if (token) {
            config.headers["Authorization"] = 'Bearer' + token;
        }else{
            dispatch(logout())
        }
        
        return config;
    },
        (error) => {
            return Promise.reject(error)
        }
    );

    const { dispatch } = store;
    AxiosInstance.interceptors.response.use((res) => {
        return res;
    },
        async (err) => {
            const originalConfig = err.config;            
            if (originalConfig !== "auth/login") {
                if (!originalConfig._retry) {
                    originalConfig._retry = true;                    
                    let formData = new FormData()
                    formData.append("grant_type", "refresh_token")
                    formData.append("refresh_token", JSON.parse(localStorage.getItem("user"))?.refresh_token)
                    try {
                        const rs = await axios.post("http://localhost:9001/perigea-auth-server/oauth/token",
                            formData,
                            {
                                headers: {
                                    'Authorization': 'Basic dHJhY2tlci10aW1lc2hlZXQ6cGFzc3dvcmQ='
                                }
                            }

                        );
                                               
                        dispatch(refreshToken(rs.data.access_token));
                        let user = JSON.parse(localStorage.getItem("user"));                        
                        user.access_token = rs.data.access_token;                        
                        localStorage.removeItem("user")
                        localStorage.setItem("user", JSON.stringify(user))
                        return AxiosInstance(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }
            return Promise.reject(err)
        }
    );
}
export default setup;