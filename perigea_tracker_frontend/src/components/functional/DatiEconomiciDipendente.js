import React from "react";
import Form from "react-bootstrap/Form";
import { Grid, Input } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';



export default class DatiEconomiciDipendente extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            livelloIniziale: '',
            tipoContrattoIniziale: '',
            ralInizile: 0.0,
            ralAttuale: 0.0,
            decorrenzaRalAttuale: 0.0,
            dataAssegnazioneTicket: 0.0,
            rimborsoGionaliero: 0.0,
            decorrenzaRimborso: '',
            livelloAttuale: '',
            decorrenzaLivello: '',
            tipoContrattoAttuale: '',
            jobTitle: '',
            sceltaTredicesima: '',
            ultimoPremio: 0.0,
            dataUltimoPremio: '',
            modelloAuto: '',
            rimborsoPerKm: 0.0,
            kmPerGiorno: 0.0,
            costoGiornaliero: 0.0,
            dataDecorrenzaCosto: '',
            codiceCentroDiCosto: '',
            decorrenzaAssegnazioneCentroDiCosto: '',
            decorrenzaKmRimborsabili: '',
            decorrenzaRimborsiKm: '',
            decorrenzaTipoContratto: ''
        }
    }

    updateDipendenteState = () => {
        this.props.updateState(this.state)
    }


    render() {
        return (
            <React.Fragment>
                <div className="postStyleProps">
                    <h5>Dati Contratto </h5>
                    <div className="info">
                        <Grid className="infoGrid"
                            container
                            spacing={20}>
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        value={this.state.livelloIniziale}
                                        style={{ width: "25%" }}
                                        label="Livello Iniziale"
                                        onChange={(e) => {
                                            this.setState({ livelloIniziale: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.decorrenzaLivello}
                                        placeholder="yyyy-mm-dd"
                                        onChange={(e) => {
                                            this.setState({ decorrenzaLivello: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Decorrenza Livello"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.livelloAttuale}
                                        onChange={(e) => {
                                            this.setState({ livelloAttuale: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Livello Attuale"
                                    ></TextField>
                                </Form.Row>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.tipoContrattoIniziale}
                                        onChange={(e) => {
                                            this.setState({ tipoContrattoIniziale: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Tipo Contratto Iniziale"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.tipoContrattoAttuale}
                                        onChange={(e) => {
                                            this.setState({ tipoContrattoAttuale: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Tipo Contratto Attuale"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.decorrenzaTipoContratto}
                                        placeholder="yyyy-mm-dd"
                                        onChange={(e) => {
                                            this.setState({ decorrenzaTipoContratto: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Decorrenza Tipo Contratto"
                                    ></TextField>
                                </Form.Row>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.jobTitle}
                                        onChange={(e) => {
                                            this.setState({ jobTitle: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Job Title"
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>
                    <h5>RAL</h5>
                    <div className="info">
                        <Grid className="infoGrid"
                            container
                            spacing={20}
                        >
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.ralInizile}
                                        onChange={(e) => {
                                            this.setState({ ralInizile: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Ral Iniziale"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.decorrenzaRalAttuale}
                                        placeholder="yyyy-mm-dd"
                                        onChange={(e) => {
                                            this.setState({ decorrenzaRalAttuale: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Decorrenza Ral Attuale"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.ralAttuale}
                                        onChange={(e) => {
                                            this.setState({ ralAttuale: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Ral Attuale"
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>
                    <h5>Centro di Costo</h5>
                    <div className="info">
                        <Grid className="infoGrid"
                            container
                            spacing={20}
                        >
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "40%" }}
                                        value={this.state.codiceCentroDiCosto}
                                        onChange={(e) => {
                                            this.setState({ codiceCentroDiCosto: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Codice Centro di Costo"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "40%" }}
                                        value={this.state.decorrenzaAssegnazioneCentroDiCosto}
                                        placeholder="yyyy-mm-dd"
                                        onChange={(e) => {
                                            this.setState({ decorrenzaAssegnazioneCentroDiCosto: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Decorrenza Assegnazione Centro di Costo"
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>
                    <h5>Dati auto e Kilometri</h5>
                    <div className="info">
                        <Grid className="infoGrid"
                            container
                            spacing={20}
                        >
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.modelloAuto}
                                        onChange={(e) => {
                                            this.setState({ modelloAuto: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Modello Auto"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.rimborsoPerKm}
                                        onChange={(e) => {
                                            this.setState({ rimborsoPerKm: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Rimborso per Km"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.kmPerGiorno}
                                        onChange={(e) => {
                                            this.setState({ kmPerGiorno: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Km per Giorno"
                                    ></TextField>
                                </Form.Row>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.decorrenzaKmRimborsabili}
                                        placeholder="yyyy-mm-dd"
                                        onChange={(e) => {
                                            this.setState({ decorrenzaKmRimborsabili: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Decorrenza Km Rimborsabili"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.decorrenzaRimborsiKm}
                                        placeholder="yyyy-mm-dd"
                                        onChange={(e) => {
                                            this.setState({ decorrenzaRimborsiKm: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Decorrenza Rimborso Km"
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>
                    <h5>Costi e Rimborsi Giornalieri</h5>
                    <div className="info">
                        <Grid className="infoGrid"
                            container
                            spacing={20}
                        >
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.rimborsoGionaliero}
                                        onChange={(e) => {
                                            this.setState({ rimborsoGionaliero: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Rimborso Giornaliero"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.decorrenzaRimborso}
                                        placeholder="yyyy-mm-dd"
                                        onChange={(e) => {
                                            this.setState({ decorrenzaRimborso: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Decorrenza rimborso"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.costoGiornaliero}
                                        onChange={(e) => {
                                            this.setState({ costoGiornaliero: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Costo Giornaliero"
                                    ></TextField>
                                </Form.Row>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.dataDecorrenzaCosto}
                                        placeholder="yyyy-mm-dd"
                                        onChange={(e) => {
                                            this.setState({ dataDecorrenzaCosto: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Decorrenza Costo"
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>
                    <h5>Altri Dati Economici</h5>
                    <div className="info">
                        <Grid className="infoGrid"
                            container
                            spacing={20}
                        >
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.sceltaTredicesima}
                                        onChange={(e) => {
                                            this.setState({ sceltaTredicesima: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Scelta Tredicesima"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.dataAssegnazioneTicket}
                                        placeholder="yyyy-mm-dd"
                                        onChange={(e) => {
                                            this.setState({ dataAssegnazioneTicket: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Data Assegnazione Ticket"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.ultimoPremio}
                                        onChange={(e) => {
                                            this.setState({ ultimoPremio: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Ultimo Premio"
                                    ></TextField>
                                </Form.Row>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.dataUltimoPremio}
                                        placeholder="yyyy-mm-dd"
                                        onChange={(e) => {
                                            this.setState({ dataUltimoPremio: e.target.value })
                                            this.updateDipendenteState()
                                        }}
                                        label="Data Ultimo Premio"
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>

                    </div>
                </div>
            </React.Fragment>

        );
    }
}

