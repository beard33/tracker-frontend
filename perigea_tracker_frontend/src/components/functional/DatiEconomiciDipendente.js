import React from "react";
import Form from "react-bootstrap/Form";
import { Grid, Input } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Title from '../structural/Title';

const DatiEconomiciDipendente = (props) => (

    <React.Fragment>
        <div className="personale">
            <h5>Dati Contratto </h5>
            <div className="infoAziendali">
                <Grid className="infoAziendaliGrid"
                    container
                    spacing={20}>
                    <Form style={{ width: "100%" }}>
                        <Form.Row className="infoAziendaliForm">
                            <TextField
                                style={{ width: "25%" }}
                                label="Livello Iniziale"
                                onChange={(e) => props.updateState(e.target.value)}
                            ></TextField>
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.dataCessazione}
                                placeholder="yyyy-mm-dd"
                                // onChange={(e) => { this.setState({ dataCessazione: e.target.value }) }}
                                label="Decorrenza Livello"
                            ></TextField>
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.tipo}
                                // onChange={(e) => { this.setState({ tipo: e.target.value }) }}
                                label="Livello Attuale"
                            ></TextField>
                        </Form.Row>
                        <Form.Row className="infoAziendaliForm">
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.codiceResponsabile}
                                // onChange={(e) => { this.setState({ codiceResponsabile: e.target.value }) }}
                                label="Tipo Contratto Iniziale"
                            ></TextField>
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.codiceResponsabile}
                                // onChange={(e) => { this.setState({ codiceResponsabile: e.target.value }) }}
                                label="Tipo Contratto Attuale"
                            ></TextField>
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.codiceResponsabile}
                                placeholder="yyyy-mm-dd"
                                // onChange={(e) => { this.setState({ codiceResponsabile: e.target.value }) }}
                                label="Decorrenza Tipo Contratto"
                            ></TextField>
                        </Form.Row>
                        <Form.Row className="infoAziendaliForm">
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.codiceResponsabile}
                                // onChange={(e) => { this.setState({ codiceResponsabile: e.target.value }) }}
                                label="Job Title"
                            ></TextField>
                        </Form.Row>
                    </Form>
                </Grid>
            </div>
            <h5>RAL</h5>
            <div className="infoAziendali">
                <Grid className="infoAziendaliGrid"
                    container
                    spacing={20}
                >
                    <Form style={{ width: "100%" }}>
                        <Form.Row className="infoAziendaliForm">
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.dataAssunzione}

                                //onChange={(e) => { this.setState({ dataAssunzione: e.target.value }) }}
                                label="Ral Iniziale"
                            ></TextField>
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.dataCessazione}
                                placeholder="yyyy-mm-dd"
                                // onChange={(e) => { this.setState({ dataCessazione: e.target.value }) }}
                                label="Decorrenza Ral Attuale"
                            ></TextField>
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.tipo}
                                // onChange={(e) => { this.setState({ tipo: e.target.value }) }}
                                label="Ral Attuale"
                            ></TextField>
                        </Form.Row>
                    </Form>
                </Grid>
            </div>
            <h5>Centro di Costo</h5>
            <div className="infoAziendali">
                <Grid className="infoAziendaliGrid"
                    container
                    spacing={20}
                >
                    <Form style={{ width: "100%" }}>
                        <Form.Row className="infoAziendaliForm">
                            <TextField
                                style={{ width: "40%" }}
                                // value={this.state.dataAssunzione}

                                //onChange={(e) => { this.setState({ dataAssunzione: e.target.value }) }}
                                label="Codice Centro di Costo"
                            ></TextField>
                            <TextField
                                style={{ width: "40%" }}
                                // value={this.state.dataCessazione}
                                placeholder="yyyy-mm-dd"
                                // onChange={(e) => { this.setState({ dataCessazione: e.target.value }) }}
                                label="Decorrenza Assegnazione Centro di Costo"
                            ></TextField>
                        </Form.Row>
                    </Form>
                </Grid>
            </div>
            <h5>Dati auto e Kilometri</h5>
            <div className="infoAziendali">
                <Grid className="infoAziendaliGrid"
                    container
                    spacing={20}
                >
                    <Form style={{ width: "100%" }}>
                        <Form.Row className="infoAziendaliForm">
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.dataAssunzione}

                                //onChange={(e) => { this.setState({ dataAssunzione: e.target.value }) }}
                                label="Modello Auto"
                            ></TextField>
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.dataCessazione}

                                // onChange={(e) => { this.setState({ dataCessazione: e.target.value }) }}
                                label="Rimborso per Km"
                            ></TextField>
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.tipo}
                                // onChange={(e) => { this.setState({ tipo: e.target.value }) }}
                                label="Km per Giorno"
                            ></TextField>
                        </Form.Row>
                        <Form.Row className="infoAziendaliForm">
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.dataAssunzione}
                                placeholder="yyyy-mm-dd"
                                //onChange={(e) => { this.setState({ dataAssunzione: e.target.value }) }}
                                label="Decorrenza Km Rimborsabili"
                            ></TextField>
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.dataCessazione}
                                placeholder="yyyy-mm-dd"
                                // onChange={(e) => { this.setState({ dataCessazione: e.target.value }) }}
                                label="Decorrenza Rimborso Km"
                            ></TextField>
                        </Form.Row>
                    </Form>
                </Grid>
            </div>
            <h5>Costi e Rimborsi Giornalieri</h5>
            <div className="infoAziendali">
                <Grid className="infoAziendaliGrid"
                    container
                    spacing={20}
                >
                    <Form style={{ width: "100%" }}>
                        <Form.Row className="infoAziendaliForm">
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.dataAssunzione}

                                //onChange={(e) => { this.setState({ dataAssunzione: e.target.value }) }}
                                label="Rimborso Giornaliero"
                            ></TextField>
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.dataCessazione}
                                placeholder="yyyy-mm-dd"
                                // onChange={(e) => { this.setState({ dataCessazione: e.target.value }) }}
                                label="Decorrenza rimborso"
                            ></TextField>
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.tipo}
                                // onChange={(e) => { this.setState({ tipo: e.target.value }) }}
                                label="Costo Giornaliero"
                            ></TextField>
                        </Form.Row>
                        <Form.Row className="infoAziendaliForm">
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.dataAssunzione}
                                placeholder="yyyy-mm-dd"
                                //onChange={(e) => { this.setState({ dataAssunzione: e.target.value }) }}
                                label="Decorrenza Costo"
                            ></TextField>
                        </Form.Row>
                    </Form>
                </Grid>
            </div>
            <h5>Altri Dati Economici</h5>
            <div className="infoAziendali">
                <Grid className="infoAziendaliGrid"
                    container
                    spacing={20}
                >
                    <Form style={{ width: "100%" }}>
                        <Form.Row className="infoAziendaliForm">
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.dataAssunzione}

                                //onChange={(e) => { this.setState({ dataAssunzione: e.target.value }) }}
                                label="Scelta Tredicesima"
                            ></TextField>
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.dataCessazione}
                                placeholder="yyyy-mm-dd"
                                // onChange={(e) => { this.setState({ dataCessazione: e.target.value }) }}
                                label="Data Assegnazione Ticket"
                            ></TextField>
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.tipo}
                                // onChange={(e) => { this.setState({ tipo: e.target.value }) }}
                                label="Ultimo Premio"
                            ></TextField>
                        </Form.Row>
                        <Form.Row className="infoAziendaliForm">
                            <TextField
                                style={{ width: "25%" }}
                                // value={this.state.dataAssunzione}
                                placeholder="yyyy-mm-dd"
                                //onChange={(e) => { this.setState({ dataAssunzione: e.target.value }) }}
                                label="Data Ultimo Premio"
                            ></TextField>
                        </Form.Row>
                    </Form>
                </Grid>
            </div>
        </div>
    </React.Fragment>


)
export default DatiEconomiciDipendente;

