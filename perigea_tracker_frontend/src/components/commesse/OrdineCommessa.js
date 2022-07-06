import React from 'react';
import Form from "react-bootstrap/Form";
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import AxiosInstance from '../../axios/AxiosInstance';
import Title from '../structural/Title';
import { MenuItem } from '@mui/material';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class OrdineCommessa extends React.Component {
    state = {
        aziende: [],
        cliente: '',
        codiceCommessa: '',
        numeroOrdineCliente: '',
        codiceAzienda: '',
        importoOrdine: 0.0,
        dataOrdine: '',
        dataInizio: '',
        dataFine: '',
        importoResiduo: '',
    }

    componentDidMount = () => {
        this.getAziende()
    }

    /**
     * metodi per la lettura di tutti i clienti
     */
    getAziende = async () => {
        await AxiosInstance({
            url: "clienti/read-all"
        }).then((response) => {
            this.loadAziende(response);
        }).catch((error) => {
            console.log("Error into loadAziende ", error)
            alert("Error into loadAziende ", error)
        })
    }
    loadAziende = (response) => {
        this.setState({ aziende: response.data.data })
    }


    /**
     * metodo per il settaggio dello stato relativo al cliente
     * @param {*} e 
     */
    setCliente = (e) => {
        this.setState({
            cliente: e.target.value,
            codiceAzienda: e.target.value.codiceAzienda
        })
    }


    render() {       
        return (
            <React.Fragment>
                <Title></Title>
                <div className='postStyleProps'>
                    <h3>Cliente</h3>
                    <div className="info">
                        <Grid className="infoGrid"
                            container
                            spacing={20}
                        >
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "60%" }}
                                        id="select stato"
                                        select
                                        name='cliente'
                                        label="Cliente"
                                        value={this.state.cliente}
                                        onChange={this.setCliente}
                                    >
                                        {this.state.aziende.map((option) => (
                                            <MenuItem value={option} >
                                                {option.ragioneSociale}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>

                    <div>
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
                    </div>

                    <Form>
                        <div>
                            <Link to={{
                                pathname: "/commessa-fatturabile",
                                state: {
                                    cliente: this.state.cliente,
                                    OrdineCommessa: {
                                        codiceCommessa: this.state.codiceCommessa,
                                        numeroOrdineCliente: this.state.numeroOrdineCliente,
                                        codiceAzienda: this.state.codiceAzienda,
                                        importoOrdine: this.state.importoOrdine,
                                        dataOrdine: this.state.dataOrdine,
                                        dataInizio: this.state.dataInizio,
                                        dataFine: this.state.dataFine,
                                        importoResiduo: this.state.importoResiduo
                                    },
                                    update: false
                                }
                            }}>
                                <button className="button-avanti"
                                    type="button"
                                    title='AVANTI'
                                >
                                    <img className="menu" src="./images/avanti.png"></img>
                                </button>
                            </Link>
                        </div>
                    </Form>

                </div >
            </React.Fragment >
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
      user: state.user
    }
  }
  
  export default connect(mapStateToProps)(OrdineCommessa);