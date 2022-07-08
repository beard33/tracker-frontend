
const user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { isLoggedIn: true, user, forwardLocation: "", backLocation: "" } : { isLoggedIn: false, user: null, forwardLocation: "", backLocation: "" };

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user
            };
        case "LOGIN_FAIL":
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        case "LOGOUT":
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        case "REFRESH_TOKEN":
            return {
                ...state,
                user: { ...user, access_token: payload }
            }
        case "BACK":
            return {
                ...state,
                forwardLocation: payload
            }
        case "FORWARD":
            return {
                ...state,
                backLocation: payload
            };
        default:
            return state;
    }
}