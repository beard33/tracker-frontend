import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Form } from 'react-bootstrap';
import NoteSpeseTable from './NoteSpeseTable';


export default function EntryView(props) {

    const removeEntry = (entry) => {
        props.removeEntry(entry)
    }

    const removeAllEntries = (entries) => {
        props.removeAll(entries)
    }

    const entries = props.entries


    return (
        <React.Fragment>
            {entries.map((entry) => {               
                return (
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
                            {entry.tipoCommessa === "F" &&
                                <Form.Row>
                                    <NoteSpeseTable noteSpese={entry.noteSpesa} removePermission={false} />
                                </Form.Row>
                            }
                            {!props.updateControl &&
                                <div>
                                    <Button className='modal-delete-button'
                                        onClick={() => { removeEntry(entry) }}
                                        title='Rimuovi singola entry'>
                                        <img className="menu" src="./images/clear.png"></img>
                                    </Button>
                                    <button
                                        className='entry-button'
                                        onClick={props.adjustmentEntryModal}
                                        title='modifica dati'>
                                        <img className="menu" src="./images/update.png"></img>
                                    </button>
                                </div>
                            }
                        </div>
                    </Form>

                )
            })}
            {!props.updateControl &&
                <div>
                    <button
                        className='modal-remove-button'
                        onClick={() => { removeAllEntries(entries) }}
                        title='rimuovi tutti i dati'
                    >
                        <img className="menu" src="./images/clear-all.png"></img>
                    </button>
                    <button
                        className='modal-generic-button'
                        onClick={props.adjustmentEntryModal}
                        title="aggiungi dati ">
                        <img className="menu" src="./images/add.png"></img>
                    </button>
                </div>
            }
        </React.Fragment>
    )
}