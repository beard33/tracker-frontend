import React from 'react';
import TextField from '@material-ui/core/TextField';
import Form from "react-bootstrap/Form";

const FieldDetails = (props) => {
    switch (props.tipoDato) {
        case "commessa":
            return (
                <div className="field-details">
                    <Form className='details-form'
                        style={{
                            backgroundColor: "transparent",
                            width: "100%",
                            height: "calc(20vw/3.6)",
                            marginTop: "calc(-10vw/3.5)",

                            borderRadius: "10%",
                            // border: "1px solid #333333"
                        }}>

                        <TextField
                            label="tipo Commessa"
                            value={props.tipoCommessa}
                            style={{
                                width: "15%",
                                height: "10%",
                                marginRight: "2%",
                                marginLeft: "calc(vw/3.5)",
                                fontWeight: "bolder"
                            }}></TextField>

                        <TextField
                            label="descrizione"
                            value={props.descrizioneCommessa}
                            style={{
                                width: "50%",
                                height: "10%",
                                fontWeight: "bolder",
                                marginLeft: "2%"
                            }}></TextField>

                    </Form>
                </div>
            );
        case "timesheet":
            return (
                <div className="field-details">
                    <Form className='details-form'
                        style={{
                            backgroundColor: "transparent",
                            width: "100%",
                            height: "calc(20vw/3.6)",
                            marginTop: "calc(-10vw/3.5)",
                            borderRadius: "10%",
                            // border: "1px solid #333333"
                        }}>

                        <TextField
                            label="nome"
                            value={`${props.nome}_${props.cognome}`}
                            style={{
                                width: "15%",
                                height: "10%",
                                marginRight: "2%",
                                marginLeft: "calc(vw/3.5)",
                                fontWeight: "bolder"
                            }}></TextField>

                        <TextField
                            label="descrizione"
                            value={`timesheet_${props.anno}-${props.mese}`}
                            style={{
                                width: "50%",
                                height: "10%",
                                fontWeight: "bolder",
                                marginLeft: "2%"
                            }}></TextField>
                        <TextField
                            label="stato approvazione"
                            value={props.approvalStatus}
                            style={{
                                width: "15%",
                                height: "10%",
                                fontWeight: "bolder",
                                marginLeft: "2%"
                            }}></TextField>

                    </Form>
                </div>
            );
        case "gruppo":
            return (
                <div className="field-details">
                    <Form className='details-form'
                        style={{
                            backgroundColor: "transparent",
                            width: "100%",
                            height: "calc(20vw/3.6)",
                            marginTop: "calc(-10vw/3.5)",
                            borderRadius: "10%",
                            // border: "1px solid #333333"
                        }}>

                        <TextField
                            label="nome"
                            value={`${props.nome}`}
                            style={{
                                width: "15%",
                                height: "10%",
                                marginRight: "2%",
                                marginLeft: "calc(vw/3.5)",
                                fontWeight: "bolder"
                            }}></TextField>

                        <TextField
                            label="descrizione"
                            value={`${props.descrizione}`}
                            style={{
                                width: "50%",
                                height: "10%",
                                fontWeight: "bolder",
                                marginLeft: "2%"
                            }}></TextField>
                    </Form>
                </div>
            )
    }

}
export default FieldDetails 