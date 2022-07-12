import * as React from 'react';
import AxiosInstance from '../../axios/AxiosInstance';
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { Button, Form, Row, Container } from 'react-bootstrap';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Link, Redirect, withRouter} from 'react-router-dom';
import { redirect, link } from '../../redux/Actions';
import DayPickerGrid from './DayPickerGrid';
import EntriesImpl from './EntriesImpl';
import EntryView from './EntryView';

import { setNoteSpeseDay } from '../utils/Utils';
import { connect } from 'react-redux';


class TimesheetCreazione extends React.Component {
    state = {
        codicePersona: "",
        username: "",
        anno: 0,
        mese: 0,
        days: [],
        confirmedDates: [],
        entries: [],
        modifiedDays: [],
        showEntryModal: false,
        adjustmentEntryModal: false,
        entriesView: [],
        redirect: false,
        festivi: []
    }

    componentWillMount() {
        if(!this.props.navBar) {
            this.props.dispatch(redirect(this.props.location))
        }
        this.setState({
            username: this.props.user.username,
            codicePersona: this.props.location.state.codicePersona,
            anno: this.props.location.state.anno,
            mese: this.props.location.state.mese,
        })
        console.log("PROPS", this.props.location.state)
    }


    /**
     * chiamata axios per la creazione di un timesheet mensile
     */
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
            this.setState({ redirect: true })
            alert("Creazione di un timesheet mensile effettuata con successo", this.data)
            console.log("Creazione di un timesheet mensile effettuata con successo", this.data)
        }).catch((error) => {
            console.log("Errore ", error)
            alert("Errore nella creazione", error)
        })
    }


    onSaveClick = () => {
        console.log(this.state)
        this.props.dispatch(link())
        this.createTimesheetMensile()
    }


    /**
     * metodo per la memorizzazione dei giorni selezionati
     * @param {*} giorni 
     */
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

    /**
     * metodo per l'implementazione dello stato dei giorni su cui sono stati inseriti dei dati
     * @param {*} day 
     */
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

    /**
     * metodo per l'implementazione dei dati giornalieri
     * @param {*} entryfields 
     * @param {*} note 
     */
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
                let noteSpese = setNoteSpeseDay(dayNumber, note)
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

    /**
     * metodo per salvare delle modifiche sui dati già inseriti prima del salvataggio
     * @param {*} entryfields 
     * @param {*} note 
     */
    adjustEntries = (entryfields, note) => {
        this.setState({
            entries: this.state.entries.filter((entry) => entry.codiceCommessa !== entryfields.codiceCommessa),
            adjustmentEntryModal: false,
            showEntryModal: false
        })
        this.addEntries(entryfields, note)
    }

    /**
     * rimozione di tutti i dati giornalieri in una precisa data
     * @param {*} entries 
     */
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


    /**
     * rimozione di un singolo dato giornaliero
     * @param {*} entryData 
     */
    removeEntry = (entryData) => {
        this.setState({
            entries: this.state.entries.filter((entry) => entry.codiceCommessa !== entryData.codiceCommessa),
            entriesView: this.state.entriesView.filter((entry) => entry !== entryData)
        })
    }


    /**
     * metodo per la visualizzazione dei dati relativi ad uno specifico giorno
     * @param {*} day 
     */
    entryView = (day) => {
        this.setState((prevState) => ({
            entriesView: this.state.entries.filter(el => el.giorno === day.getDate()),
            days: prevState.days.concat(day)
        }))
        console.log(this.state)
        this.setState({ showEntryModal: true })
    }


    /**
     * metodi per i modali di visualizzazione e modifica
     */
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
                {this.props.user ? null : <Redirect to={{ pathname: "/" }} />}
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
                                            label="username"
                                            value={this.state.username}
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
                            festivi={this.props.location.state.festivi}
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

                    <button className='ButtonSave' onClick={this.onSaveClick} title="Salva timesheet">
                        <img className="menu" src="./images/save.png"></img>
                    </button>

                    {this.state.redirect &&
                        <Redirect to={{
                            pathname: "/timesheet-view",
                            state: {
                                responsabile: false,
                                mese: this.state.mese - 1,
                                anno: this.state.anno,
                                codicePersona: this.props.user.codicePersona,
                                username: this.props.user.username
                            }
                        }}>
                        </Redirect>}

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

const mapStateToProps = (state) => {
    console.log(state)
    return {
      user: state.user,
      counter: state.counter,
      history: state.history,
      navBar: state.navBar
    }
  }
export default withRouter(connect(mapStateToProps)(TimesheetCreazione));





