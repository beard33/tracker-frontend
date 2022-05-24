import React from "react";
import Form from "react-bootstrap/Form";

import { Grid } from "@material-ui/core";
import AxiosInstance from "../../axios/AxiosInstance";
import TextField from '@material-ui/core/TextField';
import DatiEconomiciDipendente from "./DatiEconomiciDipendente";
import Title from "../structural/Title";




export default class Dipendente extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            utente: {
                codicePersona: '',
                nome: '',
                cognome: '',
                dataNascita: '',
                luogoNascita: '',
                codiceFiscale: '',
                cellulare: '',
                username: '',
                avatar: '',
                provinciaResidenza: '',
                comuneResidenza: '',
                indirizzoResidenza: '',
                provinciaDomicilio: '',
                comuneDomicilio: '',
                indirizzoDomicilio: '',
                mailPrivata: '',
                mailAziendale: '',
                nomeContattoEmergenza: '',
                cellulareContattoEmergenza: '',
                iban: '',
                stato: '',
                tipo: '',
                codiceAzienda: '',
                ruoli: [],
                accountNonLocked: false,
                accountNonExpired: false,
                credentialsNonExpired: false,
                password: ''
            },
            codicePersona: '',
            tipo: '',
            dataAssunzione: '',
            dataCessazione: '',
            codiceResponsabile: '',

            economics: {
                codicePersona: '',
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
                decorrenzaTipoContratto: '',
                archived: false
            },

            showComponent: false

        };
    }

    componentDidMount = () => {
        this.setState({
            tipo: "DIPENDENTE",
            utente: this.props.location.state.utente,
            codicePersona: this.props.location.state.utente.codicePersona,
            economics: { codicePersona: this.props.location.state.utente.codicePersona }
        })
        console.log(this.state.codicePersona)

    }
    onADDButtonClick = () => {
        this.setState({
            showComponent: true
        })
    }

    updateState = (e) => { this.setState({ economics: e }) }

    saveAnagraficaDipendenteWithoutEconomics = () => {
        console.log("saveDipendente start ", this.state.codicePersona)
        AxiosInstance({
            method: 'post',
            url: "dipendenti/create",
            data: {
                utente: this.state.utente,
                codicePersona: this.state.codicePersona,
                tipo: this.state.tipo,
                dataAssunzione: this.state.dataAssunzione,
                dataCessazione: this.state.dataCessazione,
                codiceResponsabile: this.state.codiceResponsabile,
            }
        }).then(() => {
            alert("Salvataggio del dipendente effettuato con successo")
            console.log("Salvataggio del dipendente effettuato con successo", this.data)
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }

    saveAnagraficaDipendenteWithEconomics = () => {
        console.log("saveDipendente start ", this.state.codicePersona)
        AxiosInstance({
            method: 'post',
            url: "dipendenti/create",
            data: {
                utente: this.state.utente,
                codicePersona: this.state.codicePersona,
                tipo: this.state.tipo,
                dataAssunzione: this.state.dataAssunzione,
                dataCessazione: this.state.dataCessazione,
                codiceResponsabile: this.state.codiceResponsabile,
                economics: this.state.economics
            }
        }).then(() => {
            alert("Salvataggio del dipendente effettuato con successo")
            console.log("Salvataggio del dipendente effettuato con successo", this.data)
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }

    updateDipendente = () => {
        console.log("updateDipendente start ", this.state.codicePersona)
        AxiosInstance({
            method: 'put',
            url: "dipendenti/update",
            data: {
                utente: this.state.utente,
                codicePersona: this.state.codicePersona,
                tipo: this.state.tipo,
                dataAssunzione: this.state.dataAssunzione,
                dataCessazione: this.state.dataCessazione,
                codiceResponsabile: this.state.codiceResponsabile,
            }
        }).then(() => {
            alert("Update del dipendente effettuato con successo")
            console.log("Update del dipendente effettuato con successo", this.data)
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }

    updateEconomics = () => {
        console.log("update dei dati economici start ", this.state.codicePersona)
        AxiosInstance({
            method: 'put',
            url: "dipendenti/update-economics",
            data: {
                economics: this.state.economics
            }
        }).then(() => {
            alert("update dei dati economici effettuato con successo")
            console.log("update dei dati economici effettuato con successo", this.data)
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }

    onSAVEButtonClick = () => {
        if (this.props.location.state.update) {
            console.log("UPDATE")
            this.updateDipendente()
            if (this.state.showComponent) {
                this.updateEconomics()
            }
        } else {
            if (!this.state.showComponent) {
                console.log(this.state)
                this.saveAnagraficaDipendenteWithoutEconomics()
            } else {
                console.log(this.state)
                this.saveAnagraficaDipendenteWithEconomics()
            }
        }
    }



    render() {
        return (
            <React.Fragment>
                <Title></Title>
                <div className="postStyleProps">
                    <h3>Dati aziendali </h3>
                    <div className="info">
                        <Grid className="infoGrid"
                            container
                            spacing={20}>
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.dataAssunzione}
                                        placeholder="yyyy-mm-dd"
                                        onChange={(e) => { this.setState({ dataAssunzione: e.target.value }) }}
                                        label="Data Assunzione"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.dataCessazione}
                                        placeholder="yyyy-mm-dd"
                                        onChange={(e) => { this.setState({ dataCessazione: e.target.value }) }}
                                        label="Data Cessazione"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.tipo}
                                        onChange={(e) => { this.setState({ tipo: e.target.value }) }}
                                        label="Tipo Personale"
                                    ></TextField>
                                </Form.Row>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.codiceResponsabile}
                                        onChange={(e) => { this.setState({ codiceResponsabile: e.target.value }) }}
                                        label="Codice Responsabile"
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>

                    <h3>Dati Economici</h3>
                    <div>
                        {!this.state.showComponent &&
                            <button className="button-add"
                                type="button"
                                onClick={this.onADDButtonClick}
                                disabled={this.state.showComponent}
                            >
                                ADD ECONOMICS
                            </button>}
                        {this.state.showComponent ?
                            <DatiEconomiciDipendente updateState={this.updateState} /> :
                            null
                        }

                        <button className="button-save" type="button" onClick={this.onSAVEButtonClick} >
                            SAVE
                        </button>

                    </div>

                </div>
            </React.Fragment>

        )
    }
}