import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import AxiosInstance from '../../axios/AxiosInstance';
import { Link } from 'react-router-dom';
import { pagamentoType } from '../enum/AziendaEnums';
import { MenuItem } from '@mui/material';

export default class Azienda extends React.Component {
    state = {
        codiceAzienda: '',
        ragioneSociale: '',
        partitaIva: '',
        codiceFiscale: '',
        codiceDestinatario: '',
        sedeLegaleComune: '',
        sedeLegaleCap: '',
        sedeLegaleIndirizzo: '',
        sedeOperativaComune: '',
        sedeOperativaCap: '',
        sedeOperativaIndirizzo: '',
        acronimoCliente: '',
        progressivoPerCommesse: 0,
        tipologiaPagamentoType: '',
        notePerLaFatturazione: ''
    }

    componentDidMount = () => {
        console.log(this.props.updateProps)
        if (this.props.updateProps.update) {
            this.setState(this.props.updateProps.azienda.azienda)
        }
    }

    /**
     * metodo per il controllo del tipo di azienda considerato
     * @returns 
     */
    checkPropsType = () => {
        let endpoint;
        switch (this.props.type) {
          case "cliente":
            endpoint = "clienti"
            break;
          case "fornitore":
            endpoint = "fornitori"
            break;
        }
        return endpoint;
      }

    /**
     * chiamata axios per iol salvataggio del cliente
     */
    saveCliente = async () => {
        console.log("save Cliente start ")
        await AxiosInstance({
            method: 'post',
            url: "clienti/create",
            data: this.state
        }).then(() => {
            console.log("Salvataggio del cliente effettuato con successo", this.data)
        }).catch((error) => {
            console.log("Error", error)
        })
    }

    /**
     * chiamata axios per l'update del cliente
     */
    updateCliente = async () => {
        console.log("update Cliente start")
        await AxiosInstance({
            method: 'put',
            url: "clienti/update",
            data: this.state
        }).then(() => {
            console.log("Update del cliente effettuato con successo", this.data)
        }).catch((error) => {
            console.log("Error", error)
        })
    }


    /**
     * chiamata axios per il salvataggio di un fornitore
     */
    saveFornitore = async () => {
        console.log("save Fornitore start ", this.state.codiceAzienda)
        await AxiosInstance({
            method: 'post',
            url: "fornitori/create",
            data: this.state
        }).then(() => {
            console.log("Salvataggio del fornitore effettuato con successo", this.data)
        }).catch((error) => {
            console.log("Error", error)
        })
    }

    
    /**
     * chiamata axios per l'update di un fornitore
     */
    updateFornitore = async () => {
        console.log("update Fornitore start ", this.state.codiceAzienda)
        await AxiosInstance({
            method: 'put',
            url: "fornitori/update",
            data: this.state
        }).then(() => {
            console.log("Update del fornitore effettuato con successo", this.data)
        }).catch((error) => {
            console.log("Error", error)
        })
    }

    
    saveAzienda = () => {
        if (this.props.type == "cliente") {
            this.saveCliente()
        } else {
            this.saveFornitore()
        }
    }


    UpdateAzienda = () => {
        if (this.props.type == "cliente") {
            this.updateCliente()
        } else {
            this.updateFornitore()
        }
    }
    

    render() {

        return (
            <React.Fragment>
                <div className="postStyleProps" >
                    <h3>Dati Azienda</h3>
                    <div className="info">
                        <Grid className="infoGrid" container spacing={20}>
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.codiceAzienda}
                                        onChange={(e) => { this.setState({ codiceAzienda: e.target.value }) }}
                                        label="Codice Azienda"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.ragioneSociale}
                                        onChange={(e) => { this.setState({ ragioneSociale: e.target.value }) }}
                                        label="Ragione Sociale"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.partitaIva}
                                        onChange={(e) => { this.setState({ partitaIva: e.target.value }) }}
                                        label="Partita IVA"
                                    ></TextField>
                                </Form.Row>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.codiceFiscale}
                                        onChange={(e) => { this.setState({ codiceFiscale: e.target.value }) }}
                                        label="Codice Fiscale"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.codiceDestinatario}
                                        onChange={(e) => { this.setState({ codiceDestinatario: e.target.value }) }}
                                        label="Codice Destinatario"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.acronimoCliente}
                                        onChange={(e) => { this.setState({ acronimoCliente: e.target.value }) }}
                                        label="Acronimo"
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>
                    <h3>Info Sedi</h3>
                    <div className="info">
                        <Grid className="infoGrid" container spacing={20}>
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.sedeLegaleCap}
                                        onChange={(e) => { this.setState({ sedeLegaleCap: e.target.value }) }}
                                        label="CAP Sede Legale"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.sedeLegaleComune}
                                        onChange={(e) => { this.setState({ sedeLegaleComune: e.target.value }) }}
                                        label="Comune Sede Legale"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.sedeLegaleIndirizzo}
                                        onChange={(e) => { this.setState({ sedeLegaleIndirizzo: e.target.value }) }}
                                        label="Indirizzo Sede Legale"
                                    ></TextField>
                                </Form.Row>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.sedeOperativaCap}
                                        onChange={(e) => { this.setState({ sedeOperativaCap: e.target.value }) }}
                                        label="CAP Sede Operativa"
                                    ></TextField>

                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.sedeOperativaComune}
                                        onChange={(e) => { this.setState({ sedeOperativaComune: e.target.value }) }}
                                        label="Comune Sede Operativa"
                                    ></TextField>

                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.sedeOperativaIndirizzo}
                                        onChange={(e) => { this.setState({ sedeOperativaIndirizzo: e.target.value }) }}
                                        label="Indirizzo Sede Operativa"
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>
                    <h3>Info Fatturazione</h3>
                    <div className="info">
                        <Grid className="infoGrid"
                            container
                            spacing={20}
                        >
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.progressivoPerCommesse}
                                        onChange={(e) => { this.setState({ progressivoPerCommesse: e.target.value }) }}
                                        label="Progressivo Per Commesse"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        id="select pagamento Type"
                                        select
                                        label="tipologia pagamento"
                                        value={this.state.tipologiaPagamentoType}
                                        onChange={(e) => { this.setState({ tipologiaPagamentoType: e.target.value }) }}
                                    >
                                        {pagamentoType.map((option) => (
                                            <MenuItem key={option.stato} value={option.stato} >
                                                {option.stato + " - " + option.descrizione}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        style={{ width: "25%" }}
                                        value={this.state.notePerLaFatturazione}
                                        onChange={(e) => { this.setState({ notePerLaFatturazione: e.target.value }) }}
                                        label="Note per la Fatturazione"
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>
                </div>
                <Form>
                    <div>
                        <Link to={{ pathname: `/${this.checkPropsType()}` }}>
                            <button className="ButtonSave" type="button"
                                onClick={!this.props.updateProps.update ? this.saveAzienda : this.UpdateAzienda}
                                title='SALVA'
                            >
                                <img className="menu" src="./images/save.png"></img>
                            </button>
                        </Link>
                    </div>
                </Form>
            </React.Fragment>
        )
    }
}

