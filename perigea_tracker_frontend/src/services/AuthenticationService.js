import axios from "axios";

class AuthService {
    async login(username, password) {
        return await axios.post("http://localhost:9094/timesheet/api/auth/login",
            {
                grantType: "string",
                username: username, password, password
            }
        ).then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data.data));
            return response.data.data
        });
    }
    logout() {
        localStorage.removeItem("user");
    }
    // refresh() {
    //     let user = JSON.parse(localStorage.getItem("user"));
    //     const refreshToken = user.refresh_token;
    //     user.access_token = refreshToken;
    //     localStorage.setItem("user", JSON.stringify(user))
    // }
}

export default new AuthService();