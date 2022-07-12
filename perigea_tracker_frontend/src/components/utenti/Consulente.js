import React from "react";
import Form from "react-bootstrap/Form";

import { Grid } from "@material-ui/core";
import AxiosInstance from "../../axios/AxiosInstance";
import TextField from '@material-ui/core/TextField';
import DatiEconomiciConsulente from "./DatiEconomiciConsulente";
import Title from "../structural/Title";
import { redirect, link } from "../../redux/Actions";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';




class Consulente extends React.Component {
    state = {
        utente: "",
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

        showComponent: false,
        redirect: false
    }


    componentDidMount = () => {
        if (!this.props.navBar) {
            this.props.dispatch(redirect(this.props.location))
          }
        if (this.props.location.state.update.update) {
            this.setState({
                tipo: "CONSULENTE",
                utente: this.props.location.state.utente,
                codicePersona: this.props.location.state.utente.codicePersona,
                codiceResponsabile: this.props.location.state.update.user.codiceResponsabile,
                dataAssunzione: this.props.location.state.update.user.dataAssunzione,
                partitaIva: this.props.location.state.update.user.partitaIva,
                costo: this.props.location.state.update.user.costo,
                economics: this.props.location.state.update.user.economics
            })
        } else {
            this.setState({
                tipo: "CONSULENTE",
                utente: this.props.location.state.utente,
                codicePersona: this.props.location.state.utente.codicePersona,
                economics: { codicePersona: this.props.location.state.utente.codicePersona }
            })
        }
    }

    /**
     * metodo per permettere l'implementazione dei dati economici
     */
    onADDButtonClick = () => {
        this.setState({
            showComponent: true
        })
    }


    updateState = (e) => { this.setState({ economics: e }) }


    /**
     * chiamata axios per il salvataggio di un consulente 
     */
    saveConsulente = async () => {
        console.log("saveDipendente start ", this.state.codicePersona)
        await AxiosInstance({
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
                economics: this.state.showComponent ? this.state.economics : null
            }
        }).then(() => {
            console.log("Salvataggio del dipendente effettuato con successo", this.data)
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }

    /**
     * chiamata axios per l'update di un consulente
     */
    updateConsulente = async () => {
        console.log("update consulente start ", this.state.codicePersona)
        await AxiosInstance({
            method: 'put',
            url: "consulenti/update",
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
            console.log("Update del consulente effettuato con successo", this.data)
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }


    /**
     * chiamata axios per l'update dei dati economici
     */
    updateEconomics = async () => {
        console.log("update dei dati economici start ", this.state.codicePersona)
        await AxiosInstance({
            method: 'put',
            url: "consulenti/update-economics",
            data: {
                economics: this.state.economics
            }
        }).then(() => {
            console.log("update dei dati economici effettuato con successo", this.data)
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }


    /**
     * metodo per il controllo della chiamata axios da effettuare 
     */
    onSAVEButtonClick = async () => {
        if (this.props.location.state.update.update) {
            console.log("UPDATE")
            await this.updateConsulente()
            if (this.state.showComponent) {
                await this.updateEconomics()
            }
        } else {
            await this.saveConsulente()
        }
        this.props.dispatch(link())
        this.setState({ redirect: true })
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
                                        type="date"
                                        onChange={(e) => { this.setState({ dataAssunzione: e.target.value }) }}
                                        label="Data Assunzione"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.dataCessazione}
                                        type="date"
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

                    {
                        !this.state.showComponent &&
                        (
                            this.props.user.scope.includes("ROLE_MANAGEMENT")
                            || this.props.user.scope.includes("ROLE_ADMIN")
                            || this.props.user.scope.includes("ROLE_AMMINISTRAZIONE")
                            || this.props.user.scope.includes("ROLE_HR")
                        ) &&
                        <React.Fragment>
                            <h3>Dati Economici</h3>
                            <div>
                                <button className="button-add"
                                    type="button"
                                    onClick={this.onADDButtonClick}
                                    disabled={this.state.showComponent}
                                >
                                    ADD ECONOMICS
                                </button>
                            </div>
                        </React.Fragment>
                    }

                    {this.state.showComponent ?
                        <DatiEconomiciConsulente updateState={this.updateState} economics={this.state.economics} /> :
                        null
                    }

                    <button className="ButtonSave" type="button" onClick={this.onSAVEButtonClick} title="SALVA">
                        <img className="menu" src="./images/save.png"></img>
                    </button>

                    {this.state.redirect ? <Redirect to={{ pathname: "/consulenti" }} /> : null}

                </div>


            </React.Fragment>

        )
    }

}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        user: state.user,
        counter: state.counter,
        history: state.history,
        navBar: state.navBar
    }
}

export default withRouter(connect(mapStateToProps)(Consulente));