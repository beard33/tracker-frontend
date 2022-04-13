import React from 'react';

export default function WelcomeHeader(props) {
    const role = props.admin ;
    return (
        <div>
            {!props.db ?
                <h2 style={{ textAlign: "center", fontSize: "30px" }}>Benvenuto {props.name}</h2>
                : <h2 style={{ textAlign: "center", fontSize: "30px" }}>{props.name}</h2>}
            <img src={props.img} className="img-welcome-header" style={{backgroundColor: "#333333"}} />
            <h4 style={{ display: "block", justifyContent: "center", textAlign: "center" }}>{role + " - " + props.userEmail}</h4>
        </div>
    );
}
