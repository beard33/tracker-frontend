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
                <button className="button-left" onClick={goBack} disabled={props.counter == 1 ? true : false}>
                    {"<<"}
                </button>

                <button className="button-right" onClick={goForward} disabled={props.counter === props.history.length ? true : false} >
                    {">>"}
                </button>
            </div>
        </React.Fragment>
    )
}