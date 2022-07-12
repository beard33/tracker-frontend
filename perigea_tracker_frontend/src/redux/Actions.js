

import AuthService from "../services/AuthenticationService";

export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then((data) => {
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user: data }
        });
        return Promise.resolve();
    }).catch((error) => {
        console.log(error)
        alert("Credenziali errate oppure Utente non registrato")
        dispatch({
            type: "LOGIN_FAIL"
        });
        return Promise.reject()
    });
}

export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
        type: "LOGOUT"
    });
}

export const refreshToken = (accessToken) => (dispatch) => {
    // AuthService.refresh()
    dispatch({
        type: "REFRESH_TOKEN",
        payload: accessToken
    })
}

export const goBack = () => (dispatch) => {
    dispatch({
        type: "BACK"
    })
}

export const goForward = () => (dispatch) => {
    dispatch({
        type: "FORWARD"        
    })
}

export const redirect = (location) => (dispatch) => {
    dispatch({
        type:"REDIRECT",
        payload: location
    })
}

export const link = () => (dispatch) => {
    dispatch({
        type: "LINK"
    })
}






