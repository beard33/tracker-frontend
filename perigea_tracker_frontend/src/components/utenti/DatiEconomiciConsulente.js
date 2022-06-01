import React from "react";
import Form from "react-bootstrap/Form";
import { Grid, Input } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { ingaggioType } from "../enum/EconomicsEnums";
import { MenuItem } from '@mui/material';

export default class DatiEconomiciConsulente extends React.Component {
    state = {
        dataIngaggio: '',
        dataDecorrenzaCosto: '',
        decorrenzaAssegnazioneCentroDiCosto: '',
        codiceCentroDiCosto: '',
        tipoIngaggio: '',
        costoGiornaliero: 0.0,
    };

    updateConsulenteState = () => {
        this.props.updateState(this.state)
    }


    render() {
        return (
            <React.Fragment>
                <div className="postStyleProps">
                    <h5>Ingaggio</h5>
                    <div className="info">
                        <Grid className="infoGrid"
                            container
                            spacing={20}
                        >
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "40%" }}
                                        id="select stato"
                                        select
                                        label="Tipo Ingaggio"
                                        value={this.state.tipoIngaggio}
                                        onChange={(e) => {
                                            this.setState({ tipoIngaggio: e.target.value })
                                            this.updateConsulenteState()
                                        }}
                                    >
                                        {ingaggioType.map((option) => (
                                            <MenuItem key={option.key} value={option.key} >
                                                {option.key + " - " + option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        style={{ width: "40%" }}
                                        value={this.state.dataIngaggio}
                                        type="date"
                                        onChange={(e) => {
                                            this.setState({ dataIngaggio: e.target.value })
                                            this.updateConsulenteState()
                                        }}
                                        label="Data Ingaggio"
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>
                    <h5>Costo</h5>
                    <div className="info">
                        <Grid className="infoGrid"
                            container
                            spacing={20}
                        >
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "40%" }}
                                        value={this.state.costoGiornaliero}
                                        onChange={(e) => {
                                            this.setState({ costoGiornaliero: e.target.value })
                                            this.updateConsulenteState()
                                        }}
                                        label="Costo Giornaliero"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "40%" }}
                                        value={this.state.dataDecorrenzaCosto}
                                        type="date"
                                        onChange={(e) => {
                                            this.setState({ dataDecorrenzaCosto: e.target.value })
                                            this.updateConsulenteState()
                                        }}
                                        label="Decorrenza Costo"
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
                                            this.updateConsulenteState()
                                        }}
                                        label="Codice Centro di Costo"
                                    ></TextField>
                                    <TextField
                                        style={{ width: "40%" }}
                                        value={this.state.decorrenzaAssegnazioneCentroDiCosto}
                                        type="date"
                                        onChange={(e) => {
                                            this.setState({ decorrenzaAssegnazioneCentroDiCosto: e.target.value })
                                            this.updateConsulenteState()
                                        }}
                                        label="Data Assegnazione Centro di Costo"
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>

                </div>
            </React.Fragment>
        )
    }

}