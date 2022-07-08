import React from "react";


export default function HistoryArrows(props) {

    const goBack = () => {
        console.log("GO BACK")
        props.goBack()
    }

    const goForward = () => {
        console.log("GO FORWARD")
        props.goForward()
    }

    return (
        <React.Fragment>

            <div className="history-buttons">
                <button className="button-left"
                    onClick={goBack}
                    disabled={props.location.pathname === "/home" ? true : false}>
                    {"<<"}
                </button>

                <button className="button-right" onClick={goForward}>{">>"}</button>
            </div>
        </React.Fragment>
    )
}