import React from "react";
import Form from "react-bootstrap/Form";

import { Grid } from "@material-ui/core";
import AxiosInstance from "../../axios/AxiosInstance";
import TextField from '@material-ui/core/TextField';
import Title from '../structural/Title';
import DatiEconomiciDipendente from "./DatiEconomiciDipendente";
import { Link } from 'react-router-dom';



export default class Dipendente extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            utente: {
                codicePersona: "01",
                nome: "samuel",
                cognome: "galli",
                dataNascita: "2022-01-02",
                luogoNascita: "string",
                codiceFiscale: "string",
                cellulare: "string",
                username: "string",
                avatar: "string",
                provinciaResidenza: "string",
                comuneResidenza: "string",
                indirizzoResidenza: "string",
                provinciaDomicilio: "string",
                comuneDomicilio: "string",
                indirizzoDomicilio: "string",
                mailPrivata: "string",
                mailAziendale: "string",
                nomeContattoEmergenza: "string",
                cellulareContattoEmergenza: "string",
                iban: "string",
                stato: "A",
                tipo: "I",
                codiceAzienda: "string",
                ruoli: [
                    {
                        id: "M",
                        descrizione: "manger"
                    }
                ],
                accountNonLocked: false,
                accountNonExpired: false,
                credentialsNonExpired: false,
                password: "string"
            },
            codicePersona: "01",
            tipo: '',
            dataAssunzione: "2022-01-02",
            dataCessazione: "2022-01-02",
            codiceResponsabile: "d02e486a-0613-4b19-bdf6-e05e6bc78c04",

            economics: {
                codicePersona: "01",
                livelloIniziale: "LIVELLO_1",
                tipoContrattoIniziale: "STAGE",
                ralInizile: 12.20,
                ralAttuale: 12.30,
                decorrenzaRalAttuale: "2022-02-02",
                dataAssegnazioneTicket: "2022-02-02",
                rimborsoGionaliero: 10.0,
                decorrenzaRimborso: "2022-02-02",
                livelloAttuale: "LIVELLO_1",
                decorrenzaLivello: "2022-02-02",
                tipoContrattoAttuale: "STAGE",
                jobTitle: "JUNIOR_PROF",
                sceltaTredicesima: "A",
                ultimoPremio: 10.0,
                dataUltimoPremio: "2022-02-02",
                modelloAuto: "Panda",
                rimborsoPerKm: 10.0,
                kmPerGiorno: 10.0,
                costoGiornaliero: 10.0,
                dataDecorrenzaCosto: "2022-02-02",
                codiceCentroDiCosto: "key",
                decorrenzaAssegnazioneCentroDiCosto: "2022-02-02",
                decorrenzaKmRimborsabili: "2022-02-02",
                decorrenzaRImborsiKm: "2022-02-02",
                decorrenzaTipoContratto: "2022-02-02",
                archived: false
            },

            showComponent: false

        };
    }

    componentDidMount = () => {
        this.setState({
            tipo: "DIPENDENTE",
            // utente: this.props.location.state.utente

        })
    }
    onADDButtonClick = () => {
        this.setState({
            showComponent: true
        })
    }

    updateState = (e) => { this.setState({ economics: { livelloAttuale: e } }) }


    saveAnagraficaDipendente = () => {
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

    onSAVEButtonClick = () => {
        // if (!this.state.showComponent) {
        //     this.setState({
        //     economics: null
        //     })
        // }
        console.log(this.state)
        this.saveAnagraficaDipendente()
    }



    render() {
        return (

            <React.Fragment>
                <Title></Title>
                <p>{this.state.economics.livelloIniziale}</p>
                <div className="personale">
                    <h3>Dati aziendali </h3>
                    <div className="infoAziendali">
                        <Grid className="infoAziendaliGrid"
                            container
                            spacing={20}>
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoAziendaliForm">
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
                                <Form.Row className="infoAziendaliForm">
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