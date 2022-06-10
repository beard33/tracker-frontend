import * as React from 'react';
import AxiosInstance from '../../axios/AxiosInstance';
import Form from "react-bootstrap/Form";
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { MenuItem } from '@mui/material';


export default function AssegnazioneCommessa(props) {
    const [dipendenteCommessa, setDipendenteCommessa] = React.useState({
        codiceCommessa: "",
        codicePersona: "",
        dataInizioAllocazione: "",
        dataFineAllocazione: "",
        tariffa: 0.0,
        giorniPrevisti: 0,
        giorniErogati: 0,
        giorniResidui: 0,
        importoPrevisto: 0.0,
        importoErogato: 0.0,
        importoResiduo: 0.0,
    })
    const [utenti, setUtenti] = React.useState([])

    React.useEffect(() => {
        setDipendenteCommessa({ ...dipendenteCommessa, codiceCommessa: props.codiceCommessa })
        getUtenti()
        
    }, []);

    const getUtenti = async () => {
        await AxiosInstance({
            url: "utente/read-all-utenti"
        }).then((response) => {
            loadUtenti(response);
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }
    const loadUtenti = (arg) => {
        let result = [];
        console.log(arg)
        Object.values(arg.data.data).map((element) => {
            result.push({
                codicePersona: element.codicePersona,
                mailAziendale: element.mailAziendale,
                username: element.username
            })
        });
        console.log("result : ", result)
        setUtenti(result)
    }

    const assegnaCommessa = () => {
        console.log(utenti, dipendenteCommessa)
        props.closeModal()
        AxiosInstance({
            method: 'post',
            url: "assegnazione-commesse/create",
            data: dipendenteCommessa
        }).then(() => {
            alert("Salvataggio dell'estensione effettuato con successo")
            console.log("Salvataggio dell'estensione effettuato con successo", this.data)
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }

    const handleChange = (e) => {
        setDipendenteCommessa({ ...dipendenteCommessa, [e.target.name]: e.target.value })
    }


    return (
        <React.Fragment>
            <div className="postStyleProps" >
                <h3>Info Assegnazione</h3>
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
                                    name='codicePersona'
                                    label="utente"
                                    value={dipendenteCommessa.codicePersona}
                                    onChange={handleChange}
                                >
                                    {utenti.map((option) => (
                                        <MenuItem value={option.codicePersona} >
                                            {option.username}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    style={{ width: "40%" }}
                                    label="Tariffa"
                                    name='tariffa'
                                    value={dipendenteCommessa.tariffa}
                                    onChange={handleChange}
                                ></TextField>
                            </Form.Row>
                            <Form.Row className="infoForm">
                                <TextField
                                    style={{ width: "70%" }}
                                    label="data Allocazione"
                                    name='dataInizioAllocazione'
                                    value={dipendenteCommessa.dataInizioAllocazione}
                                    onChange={handleChange}
                                    type='date'
                                ></TextField>
                            </Form.Row>
                            <Form.Row className="infoForm">
                                <TextField
                                    style={{ width: "70%" }}
                                    label="data Fine Allocazione"
                                    name='dataFineAllocazione'
                                    value={dipendenteCommessa.dataFineAllocazione}
                                    onChange={handleChange}
                                    type='date'
                                ></TextField>
                            </Form.Row>
                            <Form.Row className="infoForm">
                                <TextField
                                    style={{ width: "25%" }}
                                    label="Giorni Previsti"
                                    name='giorniPrevisti'
                                    value={dipendenteCommessa.giorniPrevisti}
                                    onChange={handleChange}
                                ></TextField>
                                <TextField
                                    style={{ width: "25%" }}
                                    label="Giorni Erogati"
                                    name='giorniErogati'
                                    value={dipendenteCommessa.giorniErogati}
                                    onChange={handleChange}
                                ></TextField>
                                <TextField
                                    style={{ width: "25%" }}
                                    label="Giorni Residui"
                                    name='giorniResidui'
                                    value={dipendenteCommessa.giorniResidui}
                                    onChange={handleChange}
                                ></TextField>
                            </Form.Row>
                            <Form.Row className="infoForm">
                                <TextField
                                    style={{ width: "25%" }}
                                    label="Importo Previsto"
                                    name='importoPrevisto'
                                    value={dipendenteCommessa.importoPrevisto}
                                    onChange={handleChange}
                                ></TextField>
                                <TextField
                                    style={{ width: "25%" }}
                                    label="Importo Erogato"
                                    name='importoErogato'
                                    value={dipendenteCommessa.importoErogato}
                                    onChange={handleChange}
                                ></TextField>
                                <TextField
                                    style={{ width: "25%" }}
                                    label="Importo Residuo"
                                    name='importoResiduo'
                                    value={dipendenteCommessa.importoResiduo}
                                    onChange={handleChange}
                                ></TextField>
                            </Form.Row>
                        </Form>
                    </Grid>
                </div>
                {/* <Link className='view-button' to={{
                    pathname: "/clienti",
                }} > */}
                <button className="ButtonSave" type="button" onClick={assegnaCommessa} title="SALVA">
                    <img className="menu" src="./images/save.png"></img>
                </button>
                {/* </Link> */}
            </div>
        </React.Fragment>
    )
}


