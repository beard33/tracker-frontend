import * as React from 'react';
import AxiosInstance from '../../axios/AxiosInstance';
import Form from "react-bootstrap/Form";
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { MenuItem } from '@mui/material';


export default class EstensioneCommessaCreate extends React.Component {
    state = {
        codiceCommessa: "",
        dataEstensione: "",
        importoInternoEstensione: 0.0,
        dataFineEstensione: ""
    }


    componentDidMount() {
        this.setState({ codiceCommessa: this.props.codiceCommessa })
    }

    onSAVEButtonClick = () => {
        this.props.closeModal()
        console.log(this.state)
        AxiosInstance({
            method: 'post',
            url: "commesse/create-estensione-commessa",
            data: {
                codiceCommessa: this.state.codiceCommessa,
                dataEstensione: this.state.dataEstensione,
                importoInternoEstensione: this.state.importoInternoEstensione,
                dataFineEstensione: this.state.dataFineEstensione
            }
        }).then(() => {
            alert("Salvataggio dell'estensione effettuato con successo")
            console.log("Salvataggio dell'estensione effettuato con successo", this.data)
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="postStyleProps" >
                    <h3>Info Estensione</h3>
                    <div className="info">
                        <Grid className="infoGrid"
                            container
                            spacing={20}
                        >
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "100%" }}
                                        label="Data Estensione Commessa"
                                        value={this.state.dataEstensione}
                                        type='date'
                                        onChange={(e) => { this.setState({ dataEstensione: e.target.value }) }}
                                    ></TextField>
                                </Form.Row>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "100%" }}
                                        label="Importo Interno Estensione"
                                        value={this.state.importoInternoEstensione}
                                        onChange={(e) => { this.setState({ importoInternoEstensione: e.target.value }) }}
                                    ></TextField>
                                </Form.Row>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "100%" }}
                                        label="Data Fine Estensione Commessa"
                                        value={this.state.dataFineEstensione}
                                        type='date'
                                        onChange={(e) => { this.setState({ dataFineEstensione: e.target.value }) }}
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>
                    <Link className='view-button' to={{
                        pathname: "/clienti",
                        codiceCommessa: this.props.codiceCommessa
                    }} >
                        <button className="ButtonSave" type="button" onClick={this.onSAVEButtonClick} title="SALVA">
                            <img className="menu" src="./images/save.png"></img>
                        </button>
                    </Link>
                </div>
            </React.Fragment>
        )
    }
}