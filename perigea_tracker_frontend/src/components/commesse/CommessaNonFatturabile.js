import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { MenuItem } from '@mui/material';
import { commessaType } from '../enum/CommesseEnums';
import AxiosInstance from '../../axios/AxiosInstance';
import Title from '../structural/Title';


export default class CommessaNonFatturabile extends React.Component {
    state = {
        codiceCommessa: "",
        tipoCommessa: "",
        descrizioneCommessa: ""
    }

    componentDidMount = () => {
        this.setState({ tipoCommessa: "S" })
    }

    createCommessaNonFatturabile = () => {
        console.log("create commessa non fatturabile start ", this.state.codiceCommessa)
        AxiosInstance({
            method: 'post',
            url: "commesse/create-commessa-non-fatturabile",
            data: {
                commessaNonFatturabile: this.state
            }
        }).then(() => {
            alert("Creazione di una commessa non fatturabile")
            console.log("Creazione di una commessa non fatturabile", this.data)
        }).catch((error) => {
            console.log("Errore ", error)
            alert("Errore nella creazione", error)
        })
    }

    render() {
        return (
            <React.Fragment>
                <Title></Title>
                <div className="postStyleProps" >
                    <h3>Info Commessa</h3>
                    <div className="info">
                        <Grid className="infoGrid"
                            container
                            spacing={20}
                        >
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "25%" }}
                                        label="codice Commessa"
                                        value={this.state.codiceCommessa}
                                        onChange={(e) => { this.setState({ codiceCommessa: e.target.value }) }}
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        id="select Commessa Type"
                                        select
                                        label="tipo Commmessa"
                                        value={this.state.tipoCommessa}
                                        placeholder="S"
                                    // onChange={(e) => { this.setState({ tipoCommessa: e.target.value }) }}
                                    >
                                        {commessaType.map((option) => (
                                            <MenuItem key={option.stato} value={option.stato} >
                                                {option.stato + " - " + option.descrizione}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        label="descrizione Commessa"
                                        value={this.state.descrizioneCommessa}
                                        onChange={(e) => { this.setState({ descrizioneCommessa: e.target.value }) }}
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>

                    <button
                        className="button-save"
                        type="button"
                        onClick={this.createCommessaNonFatturabile}
                    >
                        SAVE
                    </button>

                </div>
            </React.Fragment>
        )
    }
}