
import React from 'react';
import Box from './Box';

import { Link } from "react-router-dom";
import FieldImage from './FieldImage';
import FieldDetails from './FIeldDetails';




const Field = (props) => {
    if (props.tipo === "F") {
        return (
            <Box className="field-1">

                {<FieldImage className="image"
                    cardImage="../images/comm-fatt.png"
                />}

                <Link className='view-button' to={{
                    pathname: "/commessa-fatturabile-view",
                    codiceCommessa: props.commessa.codiceCommessa
                }} >
                    <img className="view-image" src="./images/show-details.png"
                        style={{ width: "calc(8vw/3.5)", height: "calc(8vw/3.5)" }}
                    ></img>
                </Link>

                <button className='delete-button'
                    onClick={() => {
                        props.showDeleteModal(props.commessa.codiceCommessa, props.commessa.tipoCommessa)
                    }}>
                    <img className="bin" src="./images/bin.png"
                        style={{ width: "calc(7vw/3.5)", height: "calc(7vw/3.5)" }}
                    ></img>
                </button>

                <FieldDetails
                    tipoDato={"commessa"}
                    tipoCommessa={props.commessa.tipoCommessa}
                    descrizioneCommessa={props.commessa.descrizioneCommessa}
                />

            </Box>

        )
    } else if (props.tipo === "S") {
        return (
            <Box className="field-2">

                {<FieldImage className="image"
                    cardImage="../images/comm-noFatt.png"
                />}

                <Link className='view-button'
                    to={{
                        pathname: "/commessa-non-fatturabile-view",
                        codiceCommessa: props.commessa.codiceCommessa
                    }} >
                    <img className="view-image" src="./images/show-details.png"
                        style={{ width: "calc(8vw/3.5)", height: "calc(8vw/3.5)" }}
                    ></img>
                </Link>

                <button className='delete-button'
                    onClick={() => {
                        props.showDeleteModal(props.commessa.codiceCommessa, props.commessa.tipoCommessa)
                    }}>
                    <img className="bin" src="./images/bin.png"
                        style={{ width: "calc(7vw/3.5)", height: "calc(7vw/3.5)" }}
                    ></img>
                </button>

                <FieldDetails
                    tipoDato={"commessa"}
                    tipoCommessa={props.commessa.tipoCommessa}
                    descrizioneCommessa={props.commessa.descrizioneCommessa}
                />

            </Box>

        )
    } else if (props.tipo === "T") {
        return (
            <Box className="field-1">

                {<FieldImage className="image"
                    cardImage="../images/fotoProfiloGenerica.png"
                />}

                <Link className='view-button' to={{
                    pathname: "/timesheet-view",
                    state: {
                        responsabile: true,
                        anno: props.timesheet.anno,
                        mese: props.timesheet.mese,
                        codicePersona: props.timesheet.codicePersona,
                        username: `${props.timesheet.nome}.${props.timesheet.cognome}`,
                        contattoResponsabile: props.contattoResponsabile
                    }
                }} >
                    <img className="view-image" title='vedi dettagli' src="./images/show-details.png"
                        style={{ width: "calc(8vw/3.5)", height: "calc(8vw/3.5)" }}
                    ></img>
                </Link>

                <FieldDetails
                    tipoDato={"timesheet"}
                    nome={props.timesheet.nome}
                    cognome={props.timesheet.cognome}
                    anno={props.timesheet.anno}
                    mese={props.timesheet.mese}
                    approvalStatus={props.timesheet.approvalStatus}
                    
                />

            </Box>

        )
    }
}

export default Field;