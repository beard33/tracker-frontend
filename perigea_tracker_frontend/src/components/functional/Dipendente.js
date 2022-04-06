import React from "react";
import Form from "react-bootstrap/Form";

import { Grid } from "@material-ui/core";
import AxiosInstance from "../../axios/AxiosInstance";
import TextField from '@material-ui/core/TextField';
import Title from '../structural/Title';
import DatiEconomiciDipendente from "./DatiEconomiciDipendente";




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
        
    }
    onADDButtonClick = () => {
        this.setState({
            showComponent: true
        })
    }

    updateState = (e) => { this.setState({ economics: e  })}

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

    onSAVEButtonClick = () => {
        if (!this.state.showComponent) {
            console.log(this.state)
            this.saveAnagraficaDipendenteWithoutEconomics()
        } else {
            console.log(this.state)
            // this.saveAnagraficaDipendenteWithEconomics()
        }
    }



    render() {
        return (

            <React.Fragment>
               
                
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
                            <DatiEconomiciDipendente  updateState={this.updateState}/> :
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