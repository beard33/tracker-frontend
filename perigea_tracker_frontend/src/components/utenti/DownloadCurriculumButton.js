import React from "react";
import AxiosInstance from "../../axios/AxiosInstance";

export default function DownloadCurriculumButton(props) {

    const downloadCurriculum = async () => {
        console.log("download excel start")
        await AxiosInstance({
            method: 'get',
            url: `curriculum/archivio/${props.codicePersona}`,
            responseType: 'blob',
        }).then((response) => {
            let blob = new Blob([response.data], { type: '.docx' })
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${props.username}_curriculum.docx`);
            document.body.appendChild(link);
            link.click();
        }).catch((error) => {
            console.log("Error into loadTimesheet ", error)
            alert("errore nello scarico")
        })
    }


    return (
        <React.Fragment>
            <button className='button-update' title='scarica curriculum' onClick={downloadCurriculum}>
                <a href="#" download>
                    <img className="menu" src="./images/curriculum.png"></img>
                </a>
            </button>
        </React.Fragment>
    )

}