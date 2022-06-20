import React from 'react';
import Form from "react-bootstrap/Form";
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { MenuItem } from '@mui/material';
import AxiosInstance from '../../axios/AxiosInstance';
import { commessaFatturabileType, commessaType } from '../enum/CommesseEnums';
import Title from '../structural/Title';
import { Link } from 'react-router-dom';



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
        responsabileCommerciale: "",
        ordineCommessa: "",
        cliente: ""
    }

    componentDidMount = () => {
        if (this.props.location.state.update) {
            this.setState(this.props.location.state.commessa)
            this.setState({
                descrizioneCommessa: this.props.location.state.commessa.commessa.descrizioneCommessa,
                codiceCommessa: this.props.location.state.commessa.commessa.codiceCommessa,
                tipoCommessa: "F"
            })
        } else {
            this.setState({
                tipoCommessa: "F",
                cliente: this.props.location.state.cliente,
                ordineCommessa: this.props.location.state.OrdineCommessa
            })
        }
    }

    /**
     * chiamata axios per la creazione di un ordine commessa e
     * relativa commessa fatturabile
     */
    createOrdineCommessa = async () => {
        console.log("create ordine commessa start ", this.state.codiceCommessa)
        await AxiosInstance({
            method: 'post',
            url: "commesse/create-ordine-commessa",
            data: {
                commessaFatturabile: {
                    commessa: {
                        tipoCommessa: this.state.tipoCommessa,
                        descrizioneCommessa: this.state.descrizioneCommessa
                    },
                    tipoCommessaFatturabile: this.state.tipoCommessaFatturabile,
                    descrizioneCommessaCliente: this.state.descrizioneCommessaCliente,
                    dataInizioCommessa: this.state.dataInizioCommessa,
                    dataFineCommessa: this.state.dataFineCommessa,
                    importoCommessaInizialePresunto: this.state.importoCommessaInizialePresunto,
                    totaleEstensioni: this.state.totaleEstensioni,
                    ordineInternoCorrente: this.state.ordineInternoCorrente,
                    totaleOrdineClienteFormale: this.state.totaleOrdineClienteFormale,
                    totaleOrdine: this.state.totaleOrdine,
                    totaleRicaviDaInizioCommessa: this.state.totaleRicaviDaInizioCommessa,
                    totaleRicaviDaInizioAnno: this.state.totaleRicaviDaInizioAnno,
                    totaleCostiDaInizioCommessa: this.state.totaleCostiDaInizioCommessa,
                    totaleCostiDaInizioAnno: this.state.totaleCostiDaInizioAnno,
                    totaleFatturatoDaInizioCommessa: this.state.totaleFatturatoDaInizioCommessa,
                    totaleFatturatoDaInizioAnno: this.state.totaleFatturatoDaInizioAnno,
                    margineIniziale: this.state.margineIniziale,
                    margineDaInizioCommessa: this.state.margineDaInizioCommessa,
                    margineDaInizioAnno: this.state.margineDaInizioAnno,
                    percentualeAvanzamentoCosti: this.state.percentualeAvanzamentoCosti,
                    percentualeAvanzamentoFatturazione: this.state.percentualeAvanzamentoFatturazione,
                    percentualeSconto: this.state.percentualeSconto,
                    responsabileCommerciale: this.state.responsabileCommerciale,
                },
                cliente: this.state.cliente,
                ordineCommessa: this.state.ordineCommessa
            }
        }).then(() => {           
            console.log("Creazione di una commessa fatturabile e relativo ordine effettuata con successo", this.data)
        }).catch((error) => {
            console.log("Errore ", error)
            alert("Errore nella creazione", error)
        })
    }

    /**
     * chiamata axios per l'update di una commessa fatturabile
     */
    updateCommessaFatturabile = async () => {        
        await AxiosInstance({
            method: 'put',
            url: "commesse/update-commessa-fatturabile",
            data: {
                commessa: {
                    codiceCommessa: this.state.codiceCommessa,
                    tipoCommessa: this.state.tipoCommessa,
                    descrizioneCommessa: this.state.descrizioneCommessa
                },
                tipoCommessaFatturabile: this.state.tipoCommessaFatturabile,
                descrizioneCommessaCliente: this.state.descrizioneCommessaCliente,
                dataInizioCommessa: this.state.dataInizioCommessa,
                dataFineCommessa: this.state.dataFineCommessa,
                importoCommessaInizialePresunto: this.state.importoCommessaInizialePresunto,
                totaleEstensioni: this.state.totaleEstensioni,
                ordineInternoCorrente: this.state.ordineInternoCorrente,
                totaleOrdineClienteFormale: this.state.totaleOrdineClienteFormale,
                totaleOrdine: this.state.totaleOrdine,
                totaleRicaviDaInizioCommessa: this.state.totaleRicaviDaInizioCommessa,
                totaleRicaviDaInizioAnno: this.state.totaleRicaviDaInizioAnno,
                totaleCostiDaInizioCommessa: this.state.totaleCostiDaInizioCommessa,
                totaleCostiDaInizioAnno: this.state.totaleCostiDaInizioAnno,
                totaleFatturatoDaInizioCommessa: this.state.totaleFatturatoDaInizioCommessa,
                totaleFatturatoDaInizioAnno: this.state.totaleFatturatoDaInizioAnno,
                margineIniziale: this.state.margineIniziale,
                margineDaInizioCommessa: this.state.margineDaInizioCommessa,
                margineDaInizioAnno: this.state.margineDaInizioAnno,
                percentualeAvanzamentoCosti: this.state.percentualeAvanzamentoCosti,
                percentualeAvanzamentoFatturazione: this.state.percentualeAvanzamentoFatturazione,
                percentualeSconto: this.state.percentualeSconto,
                responsabileCommerciale: this.state.responsabileCommerciale
            }
        }).then(() => {            
            console.log("Update di una commessa fatturabile e relativo ordine effettuata con successo", this.data)
        }).catch((error) => {
            console.log("Errore ", error)
            alert("Errore nella modifica", error)
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
                                        id="select Commessa Type"
                                        select
                                        label="tipo Commmessa"
                                        placeholder='F'
                                        value={this.state.tipoCommessa}
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
                        <div>
                            <Link className='view-button' to={{
                                pathname: "/commesse"                                
                            }} >
                                <button className="ButtonSave"
                                    type="button"
                                    title={this.props.location.state.update ? "APPLICA MODIFICHE" : "SALVA"}
                                    onClick={this.props.location.state.update ? this.updateCommessaFatturabile : this.createOrdineCommessa}>
                                    <img className="menu" src="./images/save.png"></img>
                                </button>
                            </Link>
                        </div>
                    </Form>

                </div>
            </React.Fragment>
        )
    }
}