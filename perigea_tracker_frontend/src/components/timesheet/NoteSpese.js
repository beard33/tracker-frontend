import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { costoNoteSpesaType } from '../enum/NoteSpeseEnums';
import { MenuItem } from '@mui/material';

export default function NoteSpese(props) {
    const [noteSpesa, setNoteSpesa] = useState({
        anno: 0,
        mese: 0,
        codicePersona: "",
        codiceCommessa: "",
        costoNotaSpese: "",
        importo: 0.0
    })


    useEffect(() => {
        setNoteSpesa({
            anno: props.anno,
            mese: props.mese,
            codicePersona: props.codicePersona,
            codiceCommessa: props.codiceCommessa,

        })
    }, []);

    const handleChange = (e) => {
        setNoteSpesa({ ...noteSpesa, [e.target.name]: e.target.value })
        console.log(noteSpesa)
    }


    const addNota = () => {
        console.log(noteSpesa)
        props.addNoteSpese(noteSpesa)
        setNoteSpesa({anno: 0,
            mese: 0,
            codicePersona: "",
            codiceCommessa: "",
            costoNotaSpese: "",
            importo: 0.0})
    }

    return (
        <React.Fragment>
            <Form
                className='postStyleProps'
                style={{ width: "100%", marginLeft: "1.5%", marginTop: "6.5%" }}
            >
                <h5>Dati Spesa</h5>
                <div className='info'>
                    <Form.Group style={{ width: "100%" }}>
                        <TextField
                            style={{ width: "100%" }}
                            label="Importo"
                            name='importo'
                            value={noteSpesa.importo}
                            onChange={handleChange}
                        ></TextField>
                    </Form.Group>
                    <Form.Group style={{ width: "100%" }}>
                        <TextField
                            style={{ width: "100%" }}
                            id="select stato"
                            select
                            name='costoNotaSpese'
                            label="Tipo costo note spesa"
                            value={noteSpesa.costoNotaSpese}
                            onChange={handleChange}
                        >
                            {costoNoteSpesaType.map((option) => (
                                <MenuItem value={option.value} >
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Form.Group>
                    <Form.Group>
                        <Button className='noteSpese-button'
                            onClick={addNota}
                            title="add nota"
                        >
                            <img className="menu" src="./images/add.png"></img>
                        </Button>
                    </Form.Group>
                </div>

            </Form>

        </React.Fragment>
    )
}