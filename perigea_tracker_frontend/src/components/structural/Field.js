
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

                <Link className='view-button' to={{ pathname: "/home" }} >
                    <img className="view" src="./images/show-details.png"
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
                    tipoCommessa={props.commessa.tipoCommessa}
                    descrizioneCommessa={props.commessa.descrizioneCommessa}
                />

            </Box>

        )
    } else {
        return (
            <Box className="field-2">

                {<FieldImage className="image"
                    cardImage="../images/comm-noFatt.png"
                />}

                <Link className='view-button' to={{ pathname: "/home" }} >
                    <img className="view" src="./images/show-details.png"
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
                    tipoCommessa={props.commessa.tipoCommessa}
                    descrizioneCommessa={props.commessa.descrizioneCommessa}
                />

            </Box>

        )
    }
}

export default Field;