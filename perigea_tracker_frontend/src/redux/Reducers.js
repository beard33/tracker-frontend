
const user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { isLoggedIn: true, user, history: [], counter: 0, navBar: false } : { isLoggedIn: false, user: null, history: [], counter: 0, navBar: false };

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
                user: null,
                history: [],
                counter: 0
            };
        case "REFRESH_TOKEN":
            return {
                ...state,
                user: { ...user, access_token: payload }
            }
        case "BACK":
            return {
                ...state,
                counter: state.counter - 1,
                navBar: true
            }
        case "FORWARD":
            return {
                ...state,
                counter: state.counter + 1,
                navBar: true
            };
        case "REDIRECT":
            return {
                ...state,
                history: (state.history.filter((el) => el.id <= state.counter)).concat({
                    id: state.counter +1,
                    location: payload
                }),
                counter: state.counter +1 
            }
        case "LINK":
            return {
                ...state,
                navBar: false
            };
        default:
            return state;
    }
}