import React, { Component } from 'react'
import AxiosInstance from '../../axios/AxiosInstance';
import CalendarAxiosInstance from '../../axios/CalendarAxiosInstance';

export default function RequestButton(props) {

    /**
      * chiamata axios per l'invio della richiesta di approvazione del timesheet
      */
    const sendTimesheetRequest = async () => {
        console.log("invio della richiesta per l'approvazione del timesheet start")
        await AxiosInstance({
            method: 'post',
            url: "richieste/send-timesheet-request",
            data: {
                codicePersona: props.codicePersona,
                anno: props.anno,
                mese: props.mese
            }
        }).then((response) => {
            console.log("Richiesta di approvazione inviata con successo")
            props.setSyncState()
        }).catch((error) => {
            console.log("Errore ", error)
            alert("ERRORE: il timesheet non è completo. Impossibile inviare la richiesta", error)
        })
    }

    return (
        <React.Fragment>
            <button className='richiesta-button' title='invio richiesta approvazione' onClick={sendTimesheetRequest}>
                <img className="menu" src="./images/richiesta.png"></img>
            </button>
        </React.Fragment>
    )
}