import React from "react";
import Form from "react-bootstrap/Form";

import { Grid } from "@material-ui/core";
import AxiosInstance from "../../../axios/AxiosInstance";
import TextField from '@material-ui/core/TextField';
import DatiEconomiciConsulente from "./DatiEconomiciConsulente";




export default class Consulente extends React.Component {
    state = {
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
        partitaIva: '',
        costo: 0.0,
        economics: {
            codicePersona: '',
            dataIngaggio: '',
            dataDecorrenzaCosto: '',
            dataAssegnazioneCentroDiCosto: '',
            codiceCentroDiCosto: '',
            tipoIngaggio: '',
            costoGiornaliero: 0.0,
            archived: false
        },

        showComponent: false
    }


    componentDidMount = () => {
        this.setState({
            tipo: "CONSULENTE",
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

    saveConsulenteWithoutEconomics = () => {
        console.log("saveConsulente start ", this.state.codicePersona)
        AxiosInstance({
            method: 'post',
            url: "consulenti/create",
            data: {
                utente: this.state.utente,
                codicePersona: this.state.codicePersona,
                tipo: this.state.tipo,
                dataAssunzione: this.state.dataAssunzione,
                dataCessazione: this.state.dataCessazione,
                codiceResponsabile: this.state.codiceResponsabile,
                partitaIva: this.state.partitaIva,
                costo: this.state.costo
            }
        }).then(() => {
            alert("Salvataggio del consulente effettuato con successo")
            console.log("Salvataggio del consulente effettuato con successo", this.data)
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }

    saveConsulenteWithEconomics = () => {
        console.log("saveDipendente start ", this.state.codicePersona)
        AxiosInstance({
            method: 'post',
            url: "consulenti/create",
            data: {
                utente: this.state.utente,
                codicePersona: this.state.codicePersona,
                tipo: this.state.tipo,
                dataAssunzione: this.state.dataAssunzione,
                dataCessazione: this.state.dataCessazione,
                codiceResponsabile: this.state.codiceResponsabile,
                partitaIva: this.state.partitaIva,
                costo: this.state.costo,
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
            this.saveConsulenteWithoutEconomics()
        } else {
            console.log(this.state)
            this.saveConsulenteWithEconomics()
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
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.partitaIva}
                                        onChange={(e) => { this.setState({ partitaIva: e.target.value }) }}
                                        label="Partita Iva"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.costo}
                                        onChange={(e) => { this.setState({ costo: e.target.value }) }}
                                        label="Costo"
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
                            <DatiEconomiciConsulente  updateState={this.updateState}/> :
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