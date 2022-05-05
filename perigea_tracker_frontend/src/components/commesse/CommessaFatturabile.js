import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { MenuItem } from '@mui/material';
import { commessaFatturabileType, commessaType } from '../enum/CommesseEnums';
import Title from '../structural/Title';



export default class CommessaFatturabile extends React.Component {
    state = {
        codiceCommessa: "",
        tipoCommessa: "",
        descrizioneCommessa: "",
        tipoCommessaFatturabile: "",
        descrizioneCommessaCliente: "",
        dataInizioCommessa: "",
        dataFineCommessa: "",
        importoCommessaInizialePresunto: 0.0,
        totaleEstensioni: 0.0,
        ordineInternoCorrente: 0.0,
        totaleOrdineClienteFormale: 0.0,
        totaleOrdine: 0.0,
        totaleRicaviDaInizioCommessa: 0.0,
        totaleRicaviDaInizioAnno: 0.0,
        totaleCostiDaInizioCommessa: 0.0,
        totaleCostiDaInizioAnno: 0.0,
        totaleFatturatoDaInizioCommessa: 0.0,
        totaleFatturatoDaInizioAnno: 0.0,
        margineIniziale: 0.0,
        margineDaInizioCommessa: 0.0,
        margineDaInizioAnno: 0.0,
        percentualeAvanzamentoCosti: 0.0,
        percentualeAvanzamentoFatturazione: 0.0,
        percentualeSconto: 0.0,
        responsabileCommerciale: ""
    }

    componentDidMount = () => {
        this.setState({
            tipoCommessa: "F"
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
                                        placeholder='F'
                                        value={this.state.tipoCommessa}
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
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "25%" }}
                                        id="select tipo commessa fatturabile"
                                        select
                                        label="Tipo Commessa Fatturabile"
                                        value={this.state.tipoCommessaFatturabile}
                                        onChange={(e) => {
                                            this.setState({ tipoCommessaFatturabile: e.target.value })
                                        }}
                                    >
                                        {commessaFatturabileType.map((option) => (
                                            <MenuItem value={option.value} >
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        label="descrizione commessa cliente"
                                        value={this.state.descrizioneCommessaCliente}
                                        onChange={(e) => { this.setState({ descrizioneCommessaCliente: e.target.value }) }}
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        label="responsabile commerciale"
                                        value={this.state.responsabileCommerciale}
                                        onChange={(e) => { this.setState({ responsabileCommerciale: e.target.value }) }}
                                    ></TextField>
                                </Form.Row>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "40%" }}
                                        type="date"
                                        value={this.state.dataInizioCommessa}
                                        onChange={(e) => { this.setState({ dataInizioCommessa: e.target.value }) }}
                                        label="data inizio commessa"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "40%" }}
                                        type="date"
                                        value={this.state.dataFineCommessa}
                                        onChange={(e) => { this.setState({ dataFineCommessa: e.target.value }) }}
                                        label="data fine commessa"
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>

                    <h5>Importo ed Estensioni</h5>
                    <div className="info">
                        <Grid className="infoGrid"
                            container
                            spacing={20}
                        >
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "40%" }}
                                        label="importo iniziale presunto"
                                        value={this.state.importoCommessaInizialePresunto}
                                        onChange={(e) => { this.setState({ importoCommessaInizialePresunto: e.target.value }) }}
                                    ></TextField>
                                    <TextField
                                        style={{ width: "40%" }}
                                        label="totale estensioni"
                                        value={this.state.totaleEstensioni}
                                        onChange={(e) => { this.setState({ totaleEstensioni: e.target.value }) }}
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>

                    <h5>Ordine</h5>
                    <div className="info">
                        <Grid className="infoGrid"
                            container
                            spacing={20}
                        >
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "25%" }}
                                        label="Ordine Interno Corrente"
                                        value={this.state.ordineInternoCorrente}
                                        onChange={(e) => { this.setState({ ordineInternoCorrente: e.target.value }) }}
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        label="Ordine Cliente Formale"
                                        value={this.state.totaleOrdineClienteFormale}
                                        onChange={(e) => { this.setState({ totaleOrdineClienteFormale: e.target.value }) }}
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        label="Totale Ordine"
                                        value={this.state.totaleOrdine}
                                        onChange={(e) => { this.setState({ totaleOrdine: e.target.value }) }}
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>

                    <h5>Ricavi-Costi-Fatturato</h5>
                    <div className="info">
                        <Grid className="infoGrid"
                            container
                            spacing={20}
                        >
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "40%" }}
                                        label="Ricavi da inizio Commessa"
                                        value={this.state.totaleRicaviDaInizioCommessa}
                                        onChange={(e) => { this.setState({ totaleRicaviDaInizioCommessa: e.target.value }) }}
                                    ></TextField>
                                    <TextField
                                        style={{ width: "40%" }}
                                        label="Ricavi da inizio anno"
                                        value={this.state.totaleRicaviDaInizioAnno}
                                        onChange={(e) => { this.setState({ totaleRicaviDaInizioAnno: e.target.value }) }}
                                    ></TextField>
                                </Form.Row>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "40%" }}
                                        label="Costi da inizio Commessa"
                                        value={this.state.totaleCostiDaInizioCommessa}
                                        onChange={(e) => { this.setState({ totaleCostiDaInizioCommessa: e.target.value }) }}
                                    ></TextField>
                                    <TextField
                                        style={{ width: "40%" }}
                                        label="Costi da inizio anno"
                                        value={this.state.totaleCostiDaInizioAnno}
                                        onChange={(e) => { this.setState({ totaleCostiDaInizioAnno: e.target.value }) }}
                                    ></TextField>
                                </Form.Row>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "40%" }}
                                        label="Fatturato da inizio Commessa"
                                        value={this.state.totaleFatturatoDaInizioCommessa}
                                        onChange={(e) => { this.setState({ totaleFatturatoDaInizioCommessa: e.target.value }) }}
                                    ></TextField>
                                    <TextField
                                        style={{ width: "40%" }}
                                        label="Fatturato da inizio anno"
                                        value={this.state.totaleFatturatoDaInizioAnno}
                                        onChange={(e) => { this.setState({ totaleFatturatoDaInizioAnno: e.target.value }) }}
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>

                    <h5>Margine</h5>
                    <div className="info">
                        <Grid className="infoGrid"
                            container
                            spacing={20}
                        >
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "25%" }}
                                        label="Margine Iniziale"
                                        value={this.state.margineIniziale}
                                        onChange={(e) => { this.setState({ margineIniziale: e.target.value }) }}
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        label="Margine da Inizio Commessa"
                                        value={this.state.margineDaInizioCommessa}
                                        onChange={(e) => { this.setState({ margineDaInizioCommessa: e.target.value }) }}
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        label="Margine da Inizio Anno"
                                        value={this.state.margineDaInizioAnno}
                                        onChange={(e) => { this.setState({ margineDaInizioAnno: e.target.value }) }}
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>
                    <h5>Percentuali</h5>
                    <div className="info">
                        <Grid className="infoGrid"
                            container
                            spacing={20}
                        >
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "25%" }}
                                        label="Percentuale Avanzamento Costi"
                                        value={this.state.percentualeAvanzamentoCosti}
                                        onChange={(e) => { this.setState({ percentualeAvanzamentoCosti: e.target.value }) }}
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        label="Percentuale Avanzamento Fatturazione"
                                        value={this.state.percentualeAvanzamentoFatturazione}
                                        onChange={(e) => { this.setState({ percentualeAvanzamentoFatturazione: e.target.value }) }}
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        label="Percentuale Sconto"
                                        value={this.state.percentualeSconto}
                                        onChange={(e) => { this.setState({ percentualeSconto: e.target.value }) }}
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>

                    <Form>
                        <div className="button-container">
                            <Link to={{
                                pathname: "/add-clienti",
                                commessaProps: {
                                    commessa: true,
                                    commessaFatturabile: this.state
                                }
                            }}>
                                <button
                                    className="button-avanti"
                                    type="button"
                                >
                                    AVANTI
                                </button>
                            </Link>
                        </div>
                    </Form>

                </div>
            </React.Fragment>
        )
    }
}