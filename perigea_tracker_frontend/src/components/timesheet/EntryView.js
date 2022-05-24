import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { Form } from 'react-bootstrap';
import NoteSpeseTable from './NoteSpeseTable';


export default function EntryView(props) {

    return (
        <React.Fragment>
            { props.entries.map((entry) => {
            console.log(entry)  
            return(                          
                
                    <Form className='postStylePropsModal' style={{ width: "100%" }}>
                        <div className='info'>
                            <Form.Row>
                                <TextField className='modal-text-field'
                                    label="giorno"
                                    value={(new Date(props.anno, props.mese - 1, entry.giorno)).toLocaleDateString()} />
                            </Form.Row>
                            <Form.Row>
                                <TextField className='modal-text-field' label="descrizione commessa"
                                    value={entry.descrizioneCommessa} />
                            </Form.Row>
                            <Form.Row>
                                <TextField className='modal-text-field' label="tipo commessa"
                                    value={entry.tipoCommessa} />
                            </Form.Row>
                            <Form.Row>
                                <TextField className='modal-text-field' label="ore"
                                    value={entry.ore} />
                            </Form.Row>
                            <Form.Row>
                                <TextField className='modal-text-field' label="ragione sociale"
                                    value={entry.ragioneSociale} />
                            </Form.Row>
                            <Form.Row>
                                <TextField className='modal-text-field' label="trasferta"
                                    value={entry.trasferta} />
                            </Form.Row>
                            <Form.Row>
                                <NoteSpeseTable noteSpese={entry.noteSpesa} removePermission={false} />
                            </Form.Row>

                            <button
                                className='entry-button'
                                onClick={props.adjustmentEntryModal}>
                                MODIFICA
                            </button>
                        </div>
                        
                    </Form>
               
            )
        })}
            <button
                className='modal-generic-button'
                onClick={props.adjustmentEntryModal}>
                AGGIUNGI DATI
            </button>

        </React.Fragment>
    )
}