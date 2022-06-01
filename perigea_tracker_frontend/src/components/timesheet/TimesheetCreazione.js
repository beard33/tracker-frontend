import * as React from 'react';
import AxiosInstance from '../../axios/AxiosInstance';
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { Button, Form, Row, Container } from 'react-bootstrap';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import DayPickerGrid from './DayPickerGrid';
import EntriesImpl from './EntriesImpl';
import EntryView from './EntryView';



export default class TimesheetCreazione extends React.Component {
    state = {
        codicePersona: "",
        anno: 0,
        mese: 0,
        days: [],
        confirmedDates: [],
        entries: [],
        modifiedDays: [],
        showEntryModal: false,
        adjustmentEntryModal: false,
        entriesView: []
    }

    componentWillMount() {
        this.setState({
            codicePersona: this.props.location.state.codicePersona,
            anno: this.props.location.state.anno,
            mese: this.props.location.state.mese
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
            this.setState({
                days: giorni,
                confirmedDates: giorni
            })
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
        let notaSpese
        note.map((item) => {
            notaSpese = {
                anno: item.anno,
                mese: item.mese,
                giorno: day,
                codicePersona: item.codicePersona,
                codiceCommessa: item.codiceCommessa,
                costoNotaSpese: item.costoNotaSpese,
                importo: item.importo
            }
            noteSpese.push(notaSpese)
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
                    noteSpesa: noteSpese
                }
                console.log(entry)
                this.handleAddEntry(entry)
                this.getModifiedDays(day)
            })
            this.resetDays()
        }
    }

    adjustEntries = (entryfields, note) => {
        this.setState({
            entries: this.state.entries.filter((entry) => entry.codiceCommessa !== entryfields.codiceCommessa),
            adjustmentEntryModal: false,
            showEntryModal: false
        })
        this.addEntries(entryfields, note)
    }

    removeEntries = (entries) => {
        let day;
        entries.map((entry) => {
            day = entry.giorno
            this.removeEntry(entry)
        })
        this.setState({
            showEntryModal: false,
            modifiedDays: this.state.modifiedDays.filter((date) => date.getDate() !== day),
            confirmedDates: this.state.confirmedDates.filter((date) => date.getDate() !== day)
        })
    }

    removeEntry = (entryData) => {
        this.setState({
            entries: this.state.entries.filter((entry) => entry.codiceCommessa !== entryData.codiceCommessa),
            entriesView: this.state.entriesView.filter((entry) => entry !== entryData)
        })
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
            adjustmentEntryModal: false
        })
    }

    adjustmentEntryModal = () => {
        this.setState({ adjustmentEntryModal: true })
    }

    render() {
        return (
            <React.Fragment>
                <Container fluid="xl">
                    <div className="postStyleProps" style={{ marginLeft: "0%", width: "102%" }} >
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
                            confirmedDates={this.state.confirmedDates}
                        ></DayPickerGrid>

                        <EntriesImpl
                            columns={7}
                            addEntries={this.addEntries}
                            anno={this.props.location.state.anno}
                            mese={this.props.location.state.mese}
                            codicePersona={this.props.location.state.codicePersona}
                            adjustment={false}
                        />
                    </Row>

                    <Button className='ButtonSave' onClick={this.onSaveClick} title="Salva timesheet">
                        <img className="menu" src="./images/save.png"></img>
                    </Button>

                </Container>

                <Modal className="modal-lg" isOpen={this.state.showEntryModal}>
                    <div className="modal-header">
                        <h5 className="modal-title mt-0" id="myLargeModalLabel">Dati Giornalieri</h5>
                        <button onClick={() => this.setState({ showEntryModal: false })} type="button" className="button-close" data-dismiss="modal" aria-label="Close">
                        <img className="menu" src="./images/exit.png"></img>
                        </button>
                    </div>
                    <ModalBody className="postPropsStyle">
                        <div className='postStyleProps'>
                            {!this.state.adjustmentEntryModal &&
                                <EntryView anno={this.props.location.state.anno}
                                    mese={this.props.location.state.mese}
                                    entries={this.state.entriesView}
                                    adjustmentEntryModal={this.adjustmentEntryModal}
                                    removeEntry={this.removeEntry}
                                    removeAll={this.removeEntries}
                                    updateControl={false}
                                />
                            }
                            {this.state.adjustmentEntryModal &&
                                <div className='postStylePropsModal'>
                                    <EntriesImpl
                                        columns={12}
                                        addEntries={this.adjustEntries}
                                        anno={this.props.location.state.anno}
                                        mese={this.props.location.state.mese}
                                        codicePersona={this.props.location.state.codicePersona}
                                        adjustment={true} />
                                </div>}
                        </div>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}





