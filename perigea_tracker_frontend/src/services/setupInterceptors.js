
import AxiosInstance from "../axios/AxiosInstance";
import { refreshToken } from "../redux/Actions";

const setup = (store) => {
    AxiosInstance.interceptors.request.use((config) => {
        const token = JSON.parse(localStorage.getItem("user"))?.access_token
        if (token) {
            config.headers["Authorization"] = 'Bearer' + token;
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
            if (originalConfig !== "auth/login" && err.response) {
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    try {
                        const rs = await AxiosInstance.post("perigea-auth-server/oauth/token", {
                            grant_type: "refresh_token",
                            refresh_token: JSON.parse(localStorage.getItem("user"))?.refresh_token
                        });
                        const { accessToken } = rs.data
                        console.log(rs.data)
                        dispatch(refreshToken(accessToken));
                        let user = JSON.parse(localStorage.getItem("user"));
                        user.access_token = accessToken;
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