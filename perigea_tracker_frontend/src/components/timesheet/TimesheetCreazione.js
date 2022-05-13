import * as React from 'react';
import AxiosInstance from '../../axios/AxiosInstance';
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { Button, Form, Row } from 'react-bootstrap';
import Modal from 'react-modal';
import DayPickerGrid from './DayPickerGrid';
import EntriesImpl from './EntriesImpl';
import EntryView from './EntryView';



export default class TimesheetCreazione extends React.Component {
    state = {
        codicePersona: "",
        anno: 0,
        mese: 0,
        days: [],
        entries: [],
        modifiedDays: [],
        showEntryModal: false,
        adjustmentEntryModal: false,
        entriesView: []
    }

    componentWillMount() {
        this.setState({
            codicePersona: this.props.codicePersona,
            anno: this.props.anno,
            mese: this.props.mese
        })
    }

    createTimesheetMensile = () => {
        console.log("Inizio creazione di un timesheet mensile")
        AxiosInstance({
            method: 'post',
            url: "timesheet/create",
            data: {
               timesheet: {
                   codicePersona: this.state.codicePersona,
                   anno: this.state.anno,
                   mese: this.state.mese
               },
               entries: this.state.entries
            }

        }).then(() => {
            alert("Creazione di un timesheet mensile effettuata con successo")
            console.log("Creazione di un timesheet mensile effettuata con successo", this.data)
        }).catch((error) => {
            console.log("Errore ", error)
            alert("Errore nella creazione", error)
        })
    }
    

    onSaveClick = () => {
        console.log(this.state)
        this.createTimesheetMensile()
    }


    addDays = (giorni) => {
        console.log(giorni)
        if (giorni != undefined && giorni.length > 0) {
            this.setState({ days: giorni })

        } else {
            console.log("vuoto")
        }
    }

    resetDays = () => {
        this.setState({ days: [] })
    }

    getModifiedDays = (day) => {
        this.setState((prevState) => ({
            modifiedDays: prevState.modifiedDays.concat(day)
        }))
    }

    handleAddEntry = (entry) => {
        this.setState((prevState) => ({
            entries: prevState.entries.concat(entry)
        }));
    }

    setNoteSpeseDay = (day, note) => {
        let noteSpese = []
        let notaSpesa
        note.map((item) => {
            notaSpesa = {
                anno: item.anno,
                mese: item.mese,
                giorno: day,
                codicePersona: item.codicePersona,
                codiceCommessa: item.codiceCommessa,
                costoNotaSpeseType: item.costoNotaSpeseType,
                importo: item.importo
            }
            noteSpese.push(notaSpesa)
        })
        return noteSpese;
    }

    addEntries = (entryfields, note) => {
        console.log(entryfields)
        console.log("giorni" + this.state.days)
        let entry;
        if (this.state.days.length === 0) {
            alert("Seleziona prima delle date")
        } else {
            this.state.days.map((day) => {
                let dayNumber = day.getDate();
                console.log(dayNumber)
                let noteSpese = this.setNoteSpeseDay(dayNumber, note)
                entry = {
                    codiceCommessa: entryfields.codiceCommessa,
                    giorno: dayNumber,
                    ore: entryfields.ore,
                    trasferta: entryfields.trasferta,
                    tipoCommessa: entryfields.tipoCommessa,
                    descrizioneCommessa: entryfields.descrizioneCommessa,
                    ragioneSociale: entryfields.ragioneSociale,
                    noteSpese: noteSpese
                }
                console.log(entry)
                this.handleAddEntry(entry)
                this.getModifiedDays(day)
            })
            this.resetDays()
        }
    }

    adjustEntries = (entryfields, note) => {
        this.setState({ entries: this.state.entries.filter((entry) => entry.codiceCommessa !== entryfields.codiceCommessa) })
        this.addEntries(entryfields, note)
        alert("campi del giorno"+ entryfields.giorno +"/"+entryfields.mese + " sono stati modificato con successo")
    }

    entryView = (day) => {
        this.setState((prevState) => ({
            entriesView: this.state.entries.filter(el => el.giorno === day.getDate()),
            days: prevState.days.concat(day)
        }))
        console.log(this.state)        
        this.setState({ showEntryModal: true })
    }

    closeEntryModal = () => {
        this.setState({
            showEntryModal: false,
            adjustmentEntryModal: false,
            addNoteSpeseModal: false
        })
    }

    adjustmentEntryModal = () => {
        this.setState({ adjustmentEntryModal: true })
    }





    render() {

        return (
            <React.Fragment>

                <div className="postStyleProps" style={{ marginLeft: "0%", width: "103.5%" }} >
                    <h3>Timesheet References</h3>
                    <div className="info" >
                        <Grid className="infoGrid"
                            container
                            spacing={20}
                        >
                            <Form style={{ width: "100%" }}>
                                <Form.Row className="infoForm">
                                    <TextField
                                        style={{ width: "27%" }}
                                        label="codice Persona"
                                        value={this.state.codicePersona}
                                        onChange={(e) => { this.setState({ codicePersona: e.target.value }) }}
                                    ></TextField>
                                    <TextField
                                        style={{ width: "27%" }}
                                        label="anno"
                                        value={this.state.anno}
                                    ></TextField>
                                    <TextField
                                        style={{ width: "27%" }}
                                        label="mese"
                                        value={this.state.mese}
                                    ></TextField>
                                </Form.Row>
                            </Form>
                        </Grid>
                    </div>
                </div>


                <Row>
                    <DayPickerGrid
                        anno={this.state.anno}
                        mese={this.state.mese - 1}
                        addDays={this.addDays}
                        modifiedDays={this.state.modifiedDays}
                        entryView={this.entryView}
                    ></DayPickerGrid>

                    <EntriesImpl
                        columns={7}
                        addEntries={this.addEntries}
                        anno={this.props.anno}
                        mese={this.props.mese}
                        codicePersona={this.props.codicePersona}
                        adjustment={false}
                    />
                </Row>

                <Button className='ButtonSave' onClick={this.onSaveClick}>
                    SAVE
                </Button>

                <Modal
                    className="modal"
                    isOpen={this.state.showEntryModal}
                    style={{ height: "50%" }}
                >
                    {!this.state.adjustmentEntryModal &&
                        <EntryView anno={this.props.anno}
                            mese={this.props.mese}
                            entries={this.state.entriesView}
                            adjustmentEntryModal={this.adjustmentEntryModal} />
                    }

                    {this.state.adjustmentEntryModal &&
                        <div className='postStylePropsModal'>
                            <EntriesImpl
                                columns={12}
                                addEntries={this.adjustEntries}
                                anno={this.props.anno}
                                mese={this.props.mese}
                                codicePersona={this.props.codicePersona} />
                        </div>}

                    <button className='modalBackButton' onClick={this.closeEntryModal}>
                        Indietro
                    </button>


                </Modal>

            </React.Fragment>
        )
    }

}





