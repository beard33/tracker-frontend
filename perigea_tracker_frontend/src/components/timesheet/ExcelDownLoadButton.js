import React, { Component } from 'react'
import AxiosInstance from '../../axios/AxiosInstance';




export default function ExcelDownloadButton(props) {

    /**
     * chiamata axios per lo scarico dell'excel
     */
    const downloadExcel = async () => {
        console.log("download excel start")
        await AxiosInstance({
            method: 'get',
            url: `timesheet/download-report/${props.anno}/${props.mese}/${props.codicePersona}`,
            responseType: 'blob',
        }).then((response) => {
            let blob = new Blob([response.data], { type: '.xlsx' })
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${props.username}_timesheet.xlsx`);
            document.body.appendChild(link);
            link.click();
        }).catch((error) => {
            console.log("Error into loadTimesheet ", error)
            alert("errore nello scarico")
        })
    }


    return (
        <React.Fragment>
            <button className='excel-button' title='scarica rapportino excel' onClick={downloadExcel}>
                <a href="#" download>
                    <img className="menu" src="./images/excel.png"></img>
                </a>
            </button>
        </React.Fragment>
    )
}