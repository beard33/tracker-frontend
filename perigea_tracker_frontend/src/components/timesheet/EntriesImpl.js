import * as React from 'react';

import AxiosInstance from '../../axios/AxiosInstance';
import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Col, Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NoteSpese from './NoteSpese';
import { MenuItem } from '@mui/material';
import NoteSpeseTable from './NoteSpeseTable';



export default function EntriesImpl(props) {
    const [entryFields, setEntryFields] = useState({
        codiceCommessa: '',
        giorno: 0,
        ore: 0,
        trasferta: false,
        tipoCommessa: '',
        descrizioneCommessa: '',
        ragioneSociale: ''
    })
    const [noteSpese, setNoteSpese] = useState([])
    const [showNoteSpeseFields, setShowNoteSpeseFields] = useState(false);
    const [aziende, setAziende] = useState([])
    const [commesse, setCommesse] = useState([])


    const handleChange = (e) => {
        setEntryFields({ ...entryFields, [e.target.name]: e.target.value })
        console.log(entryFields)
    }

    const insertCommessa = (e) => {
        const commessa = commesse.find(el => el.descrizioneCommessa === e.target.value)
        setEntryFields({
            ...entryFields,
            descrizioneCommessa: commessa.descrizioneCommessa,
            tipoCommessa: commessa.tipoCommessa,
            codiceCommessa: commessa.codiceCommessa
        })
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
        setCommesse(results)
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
        setAziende(results)
        console.log(aziende)
    }

    const addNoteSpese = (nota) => {
        setNoteSpese(prevNoteSpese => [...prevNoteSpese, nota])
        console.log(noteSpese)
        setShowNoteSpeseFields(false)
    }


    const showNoteSpese = () => {
        setShowNoteSpeseFields(true);
    }

    const removeNotaSpese = (type) => {
        console.log(type)
        setNoteSpese(noteSpese.filter((nota) => nota.costoNotaSpeseType !== type))
    }


    const addEntries = () => {
        props.addEntries(entryFields, noteSpese)
        setEntryFields({
            codiceCommessa: '',
            giorno: 0,
            ore: 0,
            trasferta: false,
            tipoCommessa: '',
            descrizioneCommessa: '',
            ragioneSociale: ''
        })
    }

    
    return (
        <React.Fragment>
            <Col xl={props.columns}>

                <Form
                    className='postStyleProps'
                    style={{ width: "100%", marginLeft: "2.5%", marginTop: "6.5%" }}
                >
                    <h3>Dati Giornalieri</h3>
                    <div className='info'>
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
                                id="select stato"
                                select
                                name='descrizioneCommessa'
                                label="Descrizione Commessa"
                                value={entryFields.descrizioneCommessa}
                                required
                                onChange={insertCommessa}
                            >
                                {commesse.map((option) => (
                                    <MenuItem value={option.descrizioneCommessa} >
                                        {option.descrizioneCommessa}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Form.Group>
                        <Form.Group style={{ width: "100%" }}>
                            <TextField
                                style={{ width: "100%" }}
                                label="Tipo Commessa"
                                name='tipoCommessa'
                                value={entryFields.tipoCommessa}
                            ></TextField>
                        </Form.Group>
                        <Form.Group style={{ width: "100%" }}>
                            <TextField
                                style={{ width: "100%" }}
                                label="codice Commessa"
                                name='codiceCommessa'
                                value={entryFields.codiceCommessa}
                            ></TextField>
                        </Form.Group>
                        <Form.Group style={{ width: "100%" }}>
                            <TextField
                                style={{ width: "100%" }}
                                id="select stato"
                                select
                                name='ragioneSociale'
                                label="Ragione Sociale"
                                value={entryFields.ragioneSociale}
                                onChange={handleChange}
                            >
                                {aziende.map((option) => (
                                    <MenuItem value={option.ragioneSociale} >
                                        {option.ragioneSociale}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Form.Group>
                        <Form.Group>
                            {entryFields.tipoCommessa === "F" &&
                                <NoteSpeseTable
                                    noteSpese={noteSpese}
                                    removePermission={true}
                                    onRemove={removeNotaSpese}
                                />
                            }
                        </Form.Group>
                        <Form.Group>
                            {!showNoteSpeseFields && entryFields.tipoCommessa === "F" &&
                                <Button className='noteSpese-button'
                                    onClick={showNoteSpese}
                                >
                                    ADD NOTA SPESE
                                </Button>
                            }
                            {showNoteSpeseFields &&
                                <NoteSpese
                                    anno={props.anno}
                                    mese={props.mese}
                                    codicePersona={props.codicePersona}
                                    codiceCommessa={entryFields.codiceCommessa}
                                    addNoteSpese={addNoteSpese}
                                />
                            }

                        </Form.Group>
                        
                            <Button className='entry-button'
                                onClick={addEntries}
                            >
                                Conferma Dati
                            </Button> 
                    </div>
                </Form>
            </Col>


        </React.Fragment >
    )
}