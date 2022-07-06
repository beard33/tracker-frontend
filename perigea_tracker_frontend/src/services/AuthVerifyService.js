
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
    console.log(JSON.parse(localStorage.getItem("user")))
    props.history.listen(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        if(user) {            
            let refreshDecodeJWT = parseJWT(user.refresh_token)
            console.log("REFRESH  "+refreshDecodeJWT.exp*1000)
           
            if(refreshDecodeJWT.exp*1000 < Date.now()) {
                props.logout();                
            }
          
        }
    });
    return <div></div>;
}
export default withRouter(AuthVerify);