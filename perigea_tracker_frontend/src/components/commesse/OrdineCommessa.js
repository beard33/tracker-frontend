import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import AxiosInstance from '../../axios/AxiosInstance';
import Title from '../structural/Title';

export default class OrdineCommessa extends React.Component {
    state = {
        commessa: '',
        cliente: '',
        codiceCommessa: '',
        numeroOrdineCliente: '',
        codiceAzienda: '',
        importoOrdine: 0.0,
        dataOrdine: '',
        dataInizio: '',
        dataFine: '',
        importoResiduo: ''
    }

    componentDidMount = () => {
        console.log(this.props.location.state)
        this.setState({
            commessa: this.props.location.state.commessa,
            cliente: this.props.location.state.cliente,
            codiceCommessa: this.props.location.state.commessa.codiceCommessa,
            codiceAzienda: this.props.location.state.cliente.codiceAzienda
        })

    }


    createOrdineCommessa = () => {
        console.log("create ordine commessa start ", this.state.codiceCommessa)
        AxiosInstance({
            method: 'post',
            url: "commesse/create-ordine-commessa",
            data: {
                commessaFatturabile: this.state.commessa,
                cliente: this.state.cliente,
                ordineCommessa: {
                    codiceCommessa: this.state.codiceCommessa,
                    numeroOrdineCliente: this.state.numeroOrdineCliente,
                    codiceAzienda: this.state.codiceAzienda,
                    importoOrdine: this.state.importoOrdine,
                    dataOrdine: this.state.dataOrdine,
                    dataInizio: this.state.dataInizio,
                    dataFine: this.state.dataFine,
                    importoResiduo: this.state.importoResiduo
                }
            }

        }).then(() => {
            alert("Creazione di una commessa fatturabile e relativo ordine effettuata con successo")
            console.log("Creazione di una commessa fatturabile e relativo ordine effettuata con successo", this.data)
        }).catch((error) => {
            console.log("Errore ", error)
            alert("Errore nella creazione", error)
        })
    }


    render() {
        console.log(this.state)
        return (

            <React.Fragment>
                <Title></Title>
                <div className='postStyleProps'>
                    <h3>Info Ordine Commessa</h3>
                    <div className="info">
                        <Grid className="infoGrid"
                            container
                            spacing={20}
                        >
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "40%" }}
                                        label="Numero Ordine Cliente"
                                        value={this.state.numeroOrdineCliente}
                                        onChange={(e) => { this.setState({ numeroOrdineCliente: e.target.value }) }}
                                    ></TextField>
                                    <TextField
                                        style={{ width: "40%" }}
                                        label="Importo Ordine"
                                        value={this.state.importoOrdine}
                                        onChange={(e) => { this.setState({ importoOrdine: e.target.value }) }}
                                    ></TextField>
                                </Form.Row>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "40%" }}
                                        label="Data Ordine"
                                        type="date"
                                        value={this.state.dataOrdine}
                                        onChange={(e) => { this.setState({ dataOrdine: e.target.value }) }}
                                    ></TextField>
                                    <TextField
                                        style={{ width: "40%" }}
                                        label="Data Inizio"
                                        type="date"
                                        value={this.state.dataInizio}
                                        onChange={(e) => { this.setState({ dataInizio: e.target.value }) }}
                                    ></TextField>
                                </Form.Row>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "40%" }}
                                        label="Data Fine"
                                        type="date"
                                        value={this.state.dataFine}
                                        onChange={(e) => { this.setState({ dataFine: e.target.value }) }}
                                    ></TextField>
                                    <TextField
                                        style={{ width: "40%" }}
                                        label="Importo Residuo"
                                        type="number"
                                        value={this.state.importoResiduo}
                                        onChange={(e) => { this.setState({ importoResiduo: e.target.value }) }}
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>

                    <Form>
                        <div>
                            <button className="button-save"
                                type="button"
                                onClick={this.createOrdineCommessa}>
                                SAVE
                            </button>
                        </div>
                    </Form>

                </div>
            </React.Fragment>
        )
    }
}