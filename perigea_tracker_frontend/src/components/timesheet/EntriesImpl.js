import * as React from 'react';

import AxiosInstance from '../../axios/AxiosInstance';
import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Col, Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getEventListeners } from 'events';



export default function EntriesImpl(props) {
    const [entryFields, setEntryFields] = useState({
        codiceCommessa: '',
        giorno: 0,
        ore: 0,
        trasferta: false,
        tipoCommessa: '',
        descrizioneCommessa: '',
        ragioneSociale: '',
        noteSpese: []
    })    
    let commesse = []
    let aziende = []

    const handleChange = (e) => {
        setEntryFields({...entryFields,[e.target.name]: e.target.value })
        console.log(entryFields)
    }

    useEffect(() => {
        getCommesse()
        getAziende()
    }, []);

    const getCommesse = () => {
        AxiosInstance({
            url: "commesse/read-all-commesse"
        }).then((response) => {
            loadCommesse(response);
        }).catch((error) => {
            console.log("Error into loadCommesse ", error)
            alert("Error into loadCommesse ", error)
        })
    }
    const loadCommesse = (response) => {
        let results = []
        Object.values(response.data.data).map((element) => {
            results.push({
                codiceCommessa: element.codiceCommessa,
                tipoCommessa: element.tipoCommessa,
                descrizioneCommessa: element.descrizioneCommessa
            })
        })
        console.log(results)
        commesse = results
        console.log(commesse)
    }

    const getAziende = () => {
        AxiosInstance({
            url: "clienti/read-all"
        }).then((response) => {
            loadAziende(response);
        }).catch((error) => {
            console.log("Error into loadAziende ", error)
            alert("Error into loadAziende ", error)
        })
    }

    const loadAziende = (response) => {
        let results = []
        Object.values(response.data.data).map((element) => {
            results.push({
                ragioneSociale: element.ragioneSociale,
            })
        })
        console.log(results)
        aziende = results
        console.log(aziende)
    }

    const addEntries = () => {
        props.addEntries(entryFields)
        setEntryFields({
            codiceCommessa: '',
            giorno: 0,
            ore: 0,
            trasferta: false,
            tipoCommessa: '',
            descrizioneCommessa: '',
            ragioneSociale: '',
            noteSpese: []
        })
    }

    return (
        <React.Fragment>
            <Col xs={7}>

                <Form
                    className='postStyleProps'
                    style={{ width: "100%", marginLeft: "2.5%", marginTop: "6.5%" }}
                >
                    <h3>Dati Giornalieri</h3>
                    <div className='info'>
                        {/* <Form.Group style={{ width: "100%" }}>
                            <TextField
                                style={{ width: "100%" }}
                                label="giorno"
                                value={entryFields.giorno}
                                onChange={handleChange}
                            ></TextField>
                        </Form.Group> */}
                        <Form.Group style={{ width: "100%" }}>
                            <TextField
                                style={{ width: "100%" }}
                                label="Ore"
                                name='ore'
                                value={entryFields.ore}
                                onChange={handleChange}
                            ></TextField>
                        </Form.Group>
                        <Form.Group style={{ width: "100%" }}>
                            <TextField
                                style={{ width: "100%" }}
                                label="trasferta"
                                name='trasferta'                                
                                value={entryFields.trasferta}
                                onChange={handleChange}
                            ></TextField>
                        </Form.Group>
                        <Form.Group style={{ width: "100%" }}>
                            <TextField
                                style={{ width: "100%" }}
                                label="Descrizione Commessa"
                                name='descrizioneCommessa'
                                value={entryFields.descrizioneCommessa}
                                onChange={handleChange}
                            ></TextField>
                        </Form.Group>
                        <Form.Group style={{ width: "100%" }}>
                            <TextField
                                style={{ width: "100%" }}
                                label="Tipo Commessa"
                                name='tipoCommessa'
                                value={entryFields.tipoCommessa}
                                onChange={handleChange}
                            ></TextField>
                        </Form.Group>
                        <Form.Group style={{ width: "100%" }}>
                            <TextField
                                style={{ width: "100%" }}
                                label="codice Commessa"
                                name='codiceCommessa'
                                value={entryFields.codiceCommessa}
                                onChange={handleChange}
                            ></TextField>
                        </Form.Group>
                        <Form.Group style={{ width: "100%" }}>
                            <TextField
                                style={{ width: "100%" }}
                                label="Ragione Sociale"
                                name='ragioneSociale'
                                value={entryFields.ragioneSociale}
                                onChange={handleChange}
                            ></TextField>
                            {/* <TextField
                                style={{ width: "100%" }}
                                id="select stato"
                                select
                                label="Ragione Sociale"
                                value={entryFields.ragioneSociale}
                                onChange={handleChange}
                            >
                                {aziende.map((option) => (
                                    
                                    <MenuItem value={option} >
                                        {option.ragioneSociale}
                                    </MenuItem>
                                ))}
                            </TextField> */}
                        </Form.Group>
                        <Button className='entry-button'
                        onClick={addEntries}>
                            Conferma Dati
                        </Button>
                    </div>
                </Form>
            </Col>


        </React.Fragment >
    )
}