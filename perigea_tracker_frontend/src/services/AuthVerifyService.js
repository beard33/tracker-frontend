import { parse } from "path";
import { decode } from "punycode";
import React from "react";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";

const parseJWT = (token) => {
    try{
        return JSON.parse(atob(token.split(".")[1]));
    }catch(error){
        console.log(error)
        return null
    }
}


const AuthVerify = (props) => {
    props.history.listen(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user) {
            const decodeJWT = parseJWT(user.access_token)
            const refreshDecodeJWT = parseJWT(user.refresh_token)
            console.log("REFRESH  "+ refreshDecodeJWT.exp*1000, refreshDecodeJWT)
            console.log(decodeJWT, decodeJWT.exp*1000)
            if(refreshDecodeJWT.exp*1000 < Date.now()) {
                props.logout();                
            }
          
        }
    });
    return <div></div>;
}
export default withRouter(AuthVerify);