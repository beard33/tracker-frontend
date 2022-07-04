import React, { Component } from 'react'
import { Container, Row, Col, Label, FormGroup, Input, Card, CardBody, Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import BootstrapTheme from '@fullcalendar/bootstrap';
import AxiosInstance from '../../axios/AxiosInstance';
import EntriesImpl from './EntriesImpl';
import EntryView from './EntryView';
import MonthTotalsTable from './MonthTotalsTable';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../structural/LoadingSpinner';
import { setNoteSpeseDay, getMonthEndDate } from '../utils/Utils';
import MonthFilter from '../structural/MonthFilter';
import ExcelDownloadButton from '../timesheet/ExcelDownLoadButton';
import RequestButton from '../timesheet/RequestButton';
import ApproveButton from '../timesheet/ApproveButton';
import Title from '../structural/Title';
import DeleteModal from '../structural/DeleteModal';





let entries = []
let getControl = true
let notaStraordinario = ""

class TimesheetView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codicePersona: "",
            calendarWeekends: true,
            calendarEvents: [],
            modalIsOpen: false,
            timesheet: "",
            anno: 0,
            mese: 0,
            adjustmentEntryModal: false,
            entriesView: [],
            commesse: [],
            getTotals: false,
            showDeleteModal: false,
            approvalControl: false,
            sync: true,
            isLoading: false,
            festivi: []
        }
        this.calendarComponentRef = React.createRef();
    }


    componentDidMount() {
        this.setState({
            codicePersona: this.props.location.state.codicePersona,
            anno: this.props.location.state.anno,
            mese: this.props.location.state.mese + 1,
        })
        this.setFestivitaEvents()
        this.getTimesheets(this.props.location.state.anno, this.props.location.state.mese + 1)

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.sync !== this.state.sync) {
            this.getTimesheets(this.state.anno, this.state.mese)
        }
    }

    /**
     * metodo per ottenere le festività
     */
    setFestivitaEvents = async () => {
        await AxiosInstance({
            method: "get",
            url: `backoffice/festivita/read-all`,
        }).then((response) => {
            this.loadFestivi(response)
        }).catch((error) => {
            console.log("Error into delete ", error)
            alert("Error into festività loading ", error)
        })
    }
    loadFestivi = (response) => {
        let event;
        console.log(response.data.data)
        response.data.data.map((festivo) => {
            let data = new Date(festivo.data)
            event = {
                title: `${festivo.nomeFestivo}`,
                start: data,
                end: new Date(data.getFullYear(), data.getMonth(), data.getDate()+1),
                allDay: true,
                className: `fc-event-festivo`
            }
            this.setState((prevState) => ({
                festivi: prevState.festivi.concat(data),
                calendarEvents: prevState.calendarEvents.concat(event),
            }))
        })
    }

    /**
     * chiamata axios per l'eliminazione del timesheet mensile
     */
    deleteTimesheet = async () => {
        console.log("delete del timesheet start")
        await AxiosInstance({
            method: 'delete',
            url: `timesheet/delete`,
            data: {
                anno: this.state.anno,
                mese: this.state.mese,
                codicePersona: this.state.codicePersona
            }
        }).then((response) => {
            console.log("timesheet eliminato con successo");
            alert("timesheet eliminato correttamente")
            this.setSyncState()
        }).catch((error) => {
            console.log("Error into delete ", error)
        })
    }


    /**
     * chiamata axios per l'eliminazione di un singolo dato giornaliero
     * @param {*} entry 
     */
    deleteEntry = async (entry) => {
        this.setState({ isLoading: true })
        console.log("delete entry start")
        await AxiosInstance({
            method: 'delete',
            url: `timesheet/delete-entry`,
            data: {
                anno: this.state.anno,
                mese: this.state.mese,
                giorno: entry.giorno,
                codiceCommessa: entry.codiceCommessa,
                codicePersona: this.state.codicePersona
            }
        }).then((response) => {
            console.log("entry eliminato con successo");
        }).catch((error) => {
            console.log("Error into deleteEntry ", error)
        })
    };

    /**
     * chiamata axios per l'update del timesheet mensile
     */
    updateTimesheetMensile = async () => {
        console.log("Inizio creazione di un timesheet mensile")
        await AxiosInstance({
            method: 'put',
            url: "timesheet/update",
            data: {
                timesheet: {
                    codicePersona: this.state.codicePersona,
                    anno: this.state.anno,
                    mese: this.state.mese
                },
                entries: entries
            }
        }).then(() => {
            console.log("update di un timesheet mensile effettuata con successo", this.data)
            this.setSyncState()
        }).catch((error) => {
            console.log("Errore ", error)
            alert("Errore nella modifica", error)
        })
    }

    /**
     * chiamata axios per la lettura di un timesheet mensile
     * @param {*} anno 
     * @param {*} mese 
     */
    getTimesheets = async (anno, mese) => {
        this.setState({ isLoading: true })
        await AxiosInstance({
            method: "get",
            url: `timesheet/read/${anno}/${mese}/${this.props.location.state.codicePersona}`,
        }).then((response) => {
            console.log(response)
            this.loadTimesheet(response)
            getControl = false
        }).catch((error) => {
            console.log("Error into loadTimesheet ", error)
            console.log(getControl)
            getControl = true
            this.setState({ isLoading: false })
        })
    }
    loadTimesheet = (arg) => {
        this.setState({
            timesheet: arg.data.data,
            codicePersona: arg.data.data.codicePersona,
            anno: arg.data.data.anno,
            mese: arg.data.data.mese,
        })
        this.setEventList()
        this.approvalControl()
    }

    /**
     * metodo per il calcolo delle ore totali lavorate in un mese
     * @param {*} codiceCommessa 
     * @returns 
     */
    getOreTotaliCommessa = (codiceCommessa) => {
        let oreCommessa = 0;
        let commessaEntries = this.state.timesheet.entries.filter((el) => el.codiceCommessa === codiceCommessa)
        commessaEntries.map((el) => {
            oreCommessa = oreCommessa + el.ore
        })
        return oreCommessa
    }

    /**
     * metodo di conversione dei dati dalla risposta al formato adatto alla griglia di FullCalendar
     */
    setEventList = () => {
        let event = {}
        this.setState({ commesse: [], sync: false })
        console.log(this.state)
        this.state.timesheet.entries.map((entry) => {
            if (!this.state.commesse.find(el => el.codiceCommessa === entry.codiceCommessa)) {
                this.setState((prevState) => ({
                    commesse: prevState.commesse.concat({
                        codiceCommessa: entry.codiceCommessa,
                        descrizioneCommessa: entry.descrizioneCommessa,
                        tipoCommessa: entry.tipoCommessa,
                        ragioneSociale: entry.ragioneSociale,
                        oreTotali: this.getOreTotaliCommessa(entry.codiceCommessa)
                    })
                }))
            }
            if (!entry.straordinario) {
                event = {
                    title: `${entry.tipoCommessa === "F" ? entry.ragioneSociale : entry.descrizioneCommessa}` + "  " + entry.ore,
                    start: new Date(this.state.timesheet.anno, this.state.timesheet.mese - 1, entry.giorno),
                    end: new Date(this.state.timesheet.anno, this.state.timesheet.mese - 1, entry.giorno + 1),
                    allDay: true,
                    className: `fc-event-${entry.tipoCommessa}`
                }
            } else {
                event = {
                    title: `${entry.ragioneSociale}` + "  " + entry.ore,
                    start: new Date(this.state.timesheet.anno, this.state.timesheet.mese - 1, entry.giorno),
                    end: new Date(this.state.timesheet.anno, this.state.timesheet.mese - 1, entry.giorno + 1),
                    allDay: true,
                    className: `fc-event-extra`
                }
            }
            if (!this.state.calendarEvents.find(el =>
                el.start.getDate() === event.start.getDate() &&
                el.start.getMonth() === event.start.getMonth() &&
                el.start.getFullYear() === event.start.getFullYear() &&
                el.title === event.title
            )) {
                this.setState((prevState) => ({
                    calendarEvents: prevState.calendarEvents.concat(event),
                }))
            }
        })
        console.log(this.state.commesse)
        this.setState({ getTotals: true, isLoading: false })
    }

    /**
     * metodo per controllare lo stato di approvazione del timesheet
     */
    approvalControl = () => {
        if (this.state.timesheet.statoRichiesta === "APPROVED") {
            this.setState({ approvalControl: true })
        }
    }

    /**
     * tabella di recap dei totali
     * @returns 
     */
    getMonthTotalsTable = () => {
        return (
            <React.Fragment>
                {getControl ?
                    null :
                    <MonthTotalsTable
                        anno={this.state.anno}
                        mese={this.state.mese}
                        codicePersona={this.state.codicePersona}
                        commesse={this.state.commesse}
                        oreTotali={this.state.timesheet.oreTotali}
                        approvalStatus={this.state.timesheet.statoRichiesta}
                    />
                }
            </React.Fragment>
        )
    }

    /**
     * metodo per il controllo della presenza dei dati in un dato giorno
     * @param {*} day 
     */
    dailyEntries = (day) => {

        let oreGiornaliere = 0
        let entriesView = this.state.timesheet.entries.filter(el => el.giorno === day.getDate())
        if (entriesView.length === 0) {
            console.log("NO ENTRIES")
            this.updateModal()
        } else {
            entriesView.map((data) => {
                oreGiornaliere += data.ore
            })
            if (oreGiornaliere > 8 && oreGiornaliere <= 12) {
                notaStraordinario = `sono state lavorate ${oreGiornaliere - 8} ore di straordinario`
            }

            this.setState({ entriesView: entriesView })
            console.log(entriesView)
        }
    }




    /**
     * metodo per il passaggio da un mese ad un altro 
     * @param {*} element 
     */
    setNewMonth = (month, year) => {
        getControl = true
        const today = new Date(new Date().getFullYear(), new Date().getMonth())
        this.setState({ mese: month, anno: year, approvalControl: false, sync: !this.state.sync })
    }

    /**
     * metodo per l'apertura dei modali di visualizzazione e modifica
     * @param {*} arg 
     */
    modal = (arg) => {
        console.log(arg);
        console.log(this.state)
        this.dailyEntries(arg.start)

        this.setState(prevState => ({
            modalIsOpen: !prevState.modalIsOpen,
            selectedDay: arg
        }));
        console.log('modalIsOpen', this.state.modalIsOpen);
        document.body.classList.add('no_padding');
    }


    handleAddEntry = (entry) => {
        entries.push(entry)
    }

    /**
     * metodp per l'aggiunta di dati giornalieri all'interno del body dell'update
     * @param {*} entryfields 
     * @param {*} note 
     */
    addEntries = (entryfields, note) => {
        let entry;
        let noteSpese = []
        let dateDiff;
        let beginDate = this.state.selectedDay.start.getDate()
        let endDate;
        console.log(entryfields, note, entries)
        if (this.state.selectedDay.end.getDate() === 1) {
            console.log("ULTIMO GIORNO")
            endDate = getMonthEndDate(this.state.mese, this.state.anno) + 1
        } else {
            endDate = this.state.selectedDay.end.getDate()
        }
        dateDiff = endDate - beginDate;
        for (let i = 0; i < dateDiff; i++) {
            let dayNumber = this.state.selectedDay.start.getDate() + i
            if (entryfields.tipoCommessa === "F") {
                noteSpese = setNoteSpeseDay(dayNumber, note)
            }
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
            this.handleAddEntry(entry)
        }
        this.setState({
            calendarEvents: [],
            commesse: []
        })
        this.updateTimesheetMensile()
    }

    /**
     * metodo per la rimozione del timesheet
     */
    removeTimesheet = () => {
        this.setState({
            calendarEvents: [],
            isLoading: true,
            showDeleteModal: false
        })
        this.deleteTimesheet()
    }

    /**
     * metodo per la rimozione di tutte le entries da un giorno
     * @param {*} entriesData 
     */
    removeDailyEntries = (entriesData) => {
        entriesData.map((entry) => {
            this.deleteEntry(entry)
        })
        this.setState({
            calendarEvents: [],
            adjustmentEntryModal: false,
            modalIsOpen: false,
            sync: !this.state.sync
        })
    }

    /**
     * metodo per la rimozione di un singolo dato giornaliero
     * @param {*} entryData 
     */
    removeEntry = (entryData) => {
        entries = this.state.timesheet.entries.filter((entry) => entry.codiceCommessa !== entryData.codiceCommessa)
        console.log(entries)
        this.deleteEntry(entryData)
        this.setState({
            calendarEvents: [],
            commesse: [],
            adjustmentEntryModal: false,
            modalIsOpen: false,
            sync: !this.state.sync
        })

    }

    /**
     * metodi per l'apertura dei modali di eliminazione e approvazione
     */
    openDeleteModal = () => {
        this.setState({ showDeleteModal: true })
    }

    closeDeleteModal = () => {
        this.setState({ showDeleteModal: false })
    }

    setSyncState = () => {
        this.setState({ sync: !this.state.sync })
    }

    updateModal = () => {
        this.setState({ adjustmentEntryModal: true })
    }


    /**
     * metodo per la modifica dei dati giornalieri
     * @param {*} entryfields 
     * @param {*} note 
     */
    updateEntries = (entryfields, note) => {
        console.log(this.state.selectedDay)
        entries = this.state.timesheet.entries.filter((entry) => entry.giorno !== this.state.selectedDay.start.getDate())
        console.log("ENTRIES", entries)
        this.setState({
            adjustmentEntryModal: false,
            modalIsOpen: false,
            isLoading: true
        })
        this.addEntries(entryfields, note)
    }


    render() {
        const { selectedDay } = this.state;

        return (
            <React.Fragment>
                <Title></Title>
                {this.state.isLoading ? <LoadingSpinner /> :
                    <Container fluid="xl" className='container'>
                        <div className="page-title-box">

                            {!this.props.location.state.responsabile && <MonthFilter setNewMonth={this.setNewMonth} />}

                            <Row className="align-items-center">
                                <Col lg={6} sm={6} md={6}>
                                    <h3 className="page-title">{this.props.location.state.username + "_timesheet"}</h3>
                                </Col>
                                <Col sm="6">
                                    <div className="float-right d-none d-md-block">
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <Row>
                            <Col md="12">
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col lg={4} sm={4} md={4}>
                                                <div
                                                    id="external-events"
                                                    style={{
                                                        padding: "10px",
                                                        width: "100%",
                                                        height: "auto",
                                                        maxHeight: "-webkit-fill-available"
                                                    }}
                                                >
                                                    {this.state.getTotals ?
                                                        this.getMonthTotalsTable() :
                                                        null
                                                    }

                                                </div>

                                                {!getControl &&
                                                    <div>
                                                        {!this.props.location.state.responsabile && !this.state.approvalControl &&
                                                            <button className='delete-button' title='elimina il timesheet' onClick={this.openDeleteModal}>
                                                                <img className="menu" src="./images/bin.png"></img>
                                                            </button>
                                                        }

                                                        <ExcelDownloadButton
                                                            anno={this.state.anno}
                                                            mese={this.state.mese}
                                                            codicePersona={this.props.location.state.codicePersona}
                                                            username={this.props.location.state.username}
                                                        />

                                                        {!this.props.location.state.responsabile && !this.state.approvalControl &&
                                                            <RequestButton
                                                                codicePersona={this.state.codicePersona}
                                                                anno={this.state.anno}
                                                                mese={this.state.mese}
                                                                setSyncState={this.setSyncState}
                                                            />
                                                        }

                                                        {
                                                            this.props.location.state.responsabile && !this.state.approvalControl &&
                                                            <ApproveButton
                                                                codicePersona={this.state.codicePersona}
                                                                anno={this.state.anno}
                                                                mese={this.state.mese}
                                                                setSyncState={this.setSyncState}
                                                            />
                                                        }

                                                    </div>
                                                }
                                                {
                                                    getControl && !this.props.location.state.responsabile &&
                                                    <Link to={{
                                                        pathname: "/timesheet-create",
                                                        state: {
                                                            mese: this.state.mese,
                                                            anno: this.state.anno,
                                                            codicePersona: this.state.codicePersona,
                                                            festivi: this.state.festivi
                                                        }
                                                    }}>
                                                        <button className='add-button' title='aggiungi timesheet'>
                                                            <img className="menu" src="./images/add.png" ></img>
                                                        </button>
                                                    </Link>
                                                }
                                            </Col>
                                            <Col lg={8} sm={8} md={8}>
                                                <FullCalendar ref={this.calendarComponentRef} defaultView="dayGridMonth" plugins={[BootstrapTheme, dayGridPlugin, interactionPlugin]}
                                                    initialDate={new Date(this.state.anno, this.state.mese - 1)}
                                                    themeSystem="bootstrap"
                                                    locale='it'
                                                    firstDay={1}
                                                    headerToolbar={
                                                        {
                                                            start: '',
                                                            center: 'title',
                                                            end: ''
                                                        }
                                                    }
                                                    buttonText={
                                                        {
                                                            prev: '<<',
                                                            next: '>>'
                                                        }
                                                    }
                                                    header={{
                                                        left: 'prev',
                                                        center: 'title',
                                                        right: 'next today'
                                                    }}
                                                    // datesSet={this.setNewMonth}
                                                    select={this.modal}
                                                    editable={true}
                                                    navLinks={false}
                                                    selectable={true}
                                                    events={this.state.calendarEvents}
                                                    id="calendar"
                                                />
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>


                                <Modal className="modal-lg" isOpen={this.state.modalIsOpen} toggle={this.modal} >
                                    <div className="modal-header">
                                        <h5 className="modal-title mt-0" id="myLargeModalLabel">Dati Giornalieri</h5>
                                        <button title='esci' onClick={() => this.setState({ modalIsOpen: false, adjustmentEntryModal: false })} type="button" className="button-close" data-dismiss="modal" aria-label="Close">
                                            <img className="menu" src="./images/exit.png"></img>
                                        </button>
                                    </div>

                                    <ModalBody className="postPropsStyle">
                                        <div className='postStyleProps'>
                                            {!this.state.adjustmentEntryModal &&
                                                <React.Fragment>
                                                    <EntryView anno={this.state.anno}
                                                        mese={this.state.mese}
                                                        entries={this.state.entriesView}
                                                        adjustmentEntryModal={this.updateModal}
                                                        removeEntry={this.removeEntry}
                                                        removeAll={this.removeDailyEntries}
                                                        updateControl={this.state.approvalControl}
                                                    />

                                                </React.Fragment>
                                            }

                                            {this.state.adjustmentEntryModal && !this.state.approvalControl &&
                                                <div className='postStylePropsModal'>
                                                    <EntriesImpl
                                                        columns={12}
                                                        addEntries={this.updateEntries}
                                                        anno={this.props.anno}
                                                        mese={this.props.mese}
                                                        codicePersona={this.props.location.state.codicePersona}
                                                        adjustment={true}
                                                    />
                                                </div>
                                            }

                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <h6>NOTE GIORNALIERE: </h6>
                                        <p>{notaStraordinario}</p>
                                    </ModalFooter>
                                </Modal>

                                <DeleteModal
                                    open={this.state.showDeleteModal}
                                    toggle={this.openDeleteModal}
                                    close={this.closeDeleteModal}
                                    delete={this.removeTimesheet}
                                    keyCode={null}
                                    typography={" Desideri eliminare il seguente timesheet?"}
                                />

                            </Col>
                        </Row>

                    </Container>
                }

            </React.Fragment >
        )
    }
}
export default TimesheetView;