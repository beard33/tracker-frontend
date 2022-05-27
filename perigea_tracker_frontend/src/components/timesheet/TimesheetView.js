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
import Typography from '@mui/material/Typography';
import FileSaver from 'file-saver';


let entries = []
let counter = 0;
let getControl = false
let ore = 0
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
            counter: 0,
            commesse: [],
            getTotals: false,
            showDeleteModal: false
        }
        this.calendarComponentRef = React.createRef();
    }



    componentDidMount() {
        console.log(this.state)
        this.setState({
            codicePersona: this.props.location.state.codicePersona,
            anno: this.props.location.state.anno,
            mese: this.props.location.state.mese
        })
        this.getTimesheets(this.props.location.state.anno, this.props.location.state.mese)
    }



    componentDidUpdate() {
        if (counter < 1) {
            this.getTimesheets(this.state.anno, this.state.mese)
        }
    }

    deleteTimesheet = () => {
        console.log("delete del timesheet start")
        AxiosInstance({
            method: 'delete',
            url: `timesheet/delete`,
            data: {
                anno: this.state.anno,
                mese: this.state.mese,
                codicePersona: this.state.codicePersona
            }
        }).then((response) => {
            console.log("timesheet eliminato con successo");
        }).catch((error) => {
            console.log("Error into delete ", error)
        })
    }

    downloadExcel = async () => {
        console.log("download excel start")
        await AxiosInstance({
            method: 'get',
            url: `timesheet/download-report/${this.state.anno}/${this.state.mese}/${this.props.location.state.codicePersona}`,
            responseType: 'blob',
        }).then((response) => {
            let blob = new Blob([response.data], { type: '.xlsx' })
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${this.props.location.state.username}_timesheet.xlsx`);
            document.body.appendChild(link);
            link.click();
            // saveAs(blob, "rapportino.xlsx")
        }).catch((error) => {
            console.log("Error into loadTimesheet ", error)
            alert("errore nello scarico")
        })

    }

    deleteEntry = (entry) => {
        console.log("delete entry start")
        AxiosInstance({
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

    // createTimesheetMensile = () => {
    //     console.log("Inizio creazione di un timesheet mensile")
    //     AxiosInstance({
    //         method: 'post',
    //         url: "timesheet/create",
    //         data: {
    //             timesheet: {
    //                 codicePersona: this.state.codicePersona,
    //                 anno: this.state.anno,
    //                 mese: this.state.mese
    //             },
    //             entries: this.state.entries
    //         }

    //     }).then((response) => {
    //         alert("Creazione di un timesheet mensile effettuata con successo")
    //         this.loadTimesheet(response)
    //         this.setEventList()
    //         console.log("Creazione di un timesheet mensile effettuata con successo", this.data)
    //     }).catch((error) => {
    //         console.log("Errore ", error)
    //         alert("Errore nella creazione", error)
    //     })
    // }

    updateTimesheetMensile = () => {
        console.log("Inizio creazione di un timesheet mensile")
        AxiosInstance({
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
            alert("update di un timesheet mensile effettuata con successo")
            console.log("update di un timesheet mensile effettuata con successo", this.data)
        }).catch((error) => {
            console.log("Errore ", error)
            alert("Errore nella modifica", error)
        })
    }


    getTimesheets = (anno, mese) => {
        // if (counter < 0.1) {

        AxiosInstance({
            method: "get",
            url: `timesheet/read/${anno}/${mese}/${this.props.location.state.codicePersona}`,
        }).then((response) => {
            console.log(response)
            this.loadTimesheet(response)
            getControl = false
            counter++
        }).catch((error) => {
            console.log("Error into loadTimesheet ", error)
            getControl = true
            console.log(getControl)
        })
        // }
    }
    loadTimesheet = (arg) => {
        this.setState({
            timesheet: arg.data.data,
            codicePersona: arg.data.data.codicePersona,
            anno: arg.data.data.anno,
            mese: arg.data.data.mese,
        })
        this.setEventList()
    }

    sendTimesheetRequest = async () => {
        console.log("invio della richiesta per l'approvazione del timesheet start")
        await AxiosInstance({
            method: 'post',
            url: "richieste/send-timesheet-request",
            data: {
                codicePersona: this.state.codicePersona,
                anno: this.state.anno,
                mese: this.state.mese
            }
        }).then((response) => {
            console.log(response.data.data)
            alert("richiesta di approvazione inviata con successo")
            console.log("Richiesta di approvazione inviata con successo", this.data)
        }).catch((error) => {
            console.log("Errore ", error)
            alert("Errore nell'invio della richiesta", error)
        })
    }

    getOreTotaliCommessa = (codiceCommessa) => {
        let oreCommessa = 0;
        let commessaEntries = this.state.timesheet.entries.filter((el) => el.codiceCommessa === codiceCommessa)
        commessaEntries.map((el) => {
            oreCommessa = oreCommessa + el.ore
        })
        return oreCommessa
    }



    setEventList = () => {
        let event = {}
        this.setState({ commesse: [] })
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
            event = {
                title: `${entry.tipoCommessa === "F" ? entry.ragioneSociale : entry.descrizioneCommessa}` + "  " + entry.ore,
                start: new Date(this.state.timesheet.anno, this.state.timesheet.mese - 1, entry.giorno),
                allDay: true,
                className: `fc-event-${entry.tipoCommessa}`
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
            counter++

        })
        console.log(this.state.commesse)
        this.setState({ getTotals: true })
    }

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
                    />
                }
            </React.Fragment>
        )
    }

    dailyEntries = (day) => {

        // let timesheet = this.state.timesheet.find(el => el.mese === day.getMonth() + 1 && el.anno === day.getFullYear())
        let entriesView = this.state.timesheet.entries.filter(el => el.giorno === day.getDate())
        if (entriesView.length === 0) {
            console.log("NO ENTRIES")
            this.updateModal()
        } else {
            this.setState({ entriesView: entriesView })
            console.log(entriesView)
        }
    }



    updateModal = () => {
        this.setState({ adjustmentEntryModal: true })
    }

    setNewMonth = (element) => {
        getControl = true
        const today = new Date(new Date().getFullYear(), new Date().getMonth())
        const date = element.start.getDate()
        if (date === 1) {
            this.setState({ mese: element.start.getMonth() + 1, anno: element.start.getFullYear() })
        } else {
            if (element.start.getMonth() === 11) {
                this.setState({ mese: 1 })
            } else {
                this.setState({ mese: element.start.getMonth() + 2, anno: element.start.getFullYear() })
            }
        }
        console.log(date, today)
        counter = 0
        if (element.start < today &&
            element.start.getMonth() !== today.getMonth() - 1) {
            console.log("DISABLE UPDATE")
        }
    }


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
        let entry;
        let noteSpese = []
        console.log(entryfields, note, entries)
        const dateDiff = this.state.selectedDay.end.getDate() - this.state.selectedDay.start.getDate();
        for (let i = 0; i < dateDiff; i++) {
            let dayNumber = this.state.selectedDay.start.getDate() + i
            console.log(this.state.selectedDay, dayNumber)
            if (entryfields.tipoCommessa === "F") {
                noteSpese = this.setNoteSpeseDay(dayNumber, note)
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
            console.log(entry)
            this.handleAddEntry(entry)
        }
        this.setState({
            calendarEvents: [],
            commesse: []
        })
        // if (!getControl) {
        this.updateTimesheetMensile()
        // } else {
        //     this.createTimesheetMensile()
        //     getControl = false
        // }

        counter = 0
    }

    removeTimesheet = () => {
        this.setState({
            calendarEvents: []
        })
        this.deleteTimesheet()
    }

    removeDailyEntries = (entriesData) => {
        this.setState({
            calendarEvents: [],
            adjustmentEntryModal: false,
            modalIsOpen: false
        })
        entriesData.map((entry) => {

            this.deleteEntry(entry)
        })
        counter = 0
    }

    removeEntry = (entryData) => {
        entries = this.state.timesheet.entries.filter((entry) => entry !== entryData)
        console.log(entries)
        this.setState({
            calendarEvents: [],
            commesse: [],
            adjustmentEntryModal: false,
            modalIsOpen: false
        })

        this.deleteEntry(entryData)
        counter = 0
    }

    openDeleteModal = () => {
        this.setState({ showDeleteModal: true })

    }

    updateEntries = (entryfields, note) => {
        console.log(this.state.selectedDay)
        entries = this.state.timesheet.entries.filter((entry) => entry.giorno !== this.state.selectedDay.start.getDate())
        console.log("ENTRIES", entries)
        this.setState({
            adjustmentEntryModal: false,
            modalIsOpen: false
        })
        this.addEntries(entryfields, note)
        alert("campi del giorno" + entryfields.giorno + "/" + entryfields.mese + " sono stati modificato con successo")
    }

    render() {
        const { selectedDay } = this.state;
        const defaultValues = {
            title: 'doctor',
            startDate: selectedDay ? selectedDay.startStr : null,
            endDate: selectedDay ? selectedDay.endStr : null,
        };

        return (
            <React.Fragment>
                <Container fluid="xl" className='container'>
                    <div className="page-title-box">
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
                                                    <button className='delete-button' title='elimina il timesheet' onClick={this.openDeleteModal}>
                                                        <img className="menu" src="./images/bin.png"></img>
                                                    </button>


                                                    <button className='excel-button' title='scarica rapportino excel' onClick={this.downloadExcel}>
                                                        <a href="#" download>
                                                            <img className="menu" src="./images/excel.png"></img>
                                                        </a>
                                                    </button>

                                                    <button className='richiesta-button' title='invio richiesta approvazione' onClick={this.sendTimesheetRequest}>
                                                        <img className="menu" src="./images/richiesta.png"></img>
                                                    </button>
                                                </div>
                                            }
                                            {
                                                getControl &&
                                                <Link to={{
                                                    pathname: "/timesheet-create",
                                                    state: {
                                                        mese: this.state.mese,
                                                        anno: this.state.anno,
                                                        codicePersona: this.state.codicePersona,                                                        
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
                                                initialDate={new Date(this.props.location.state.anno, this.props.location.state.mese - 1)}
                                                // initialDate={new Date(2022, 4)}
                                                themeSystem="bootstrap"
                                                locale='it'
                                                firstDay={1}
                                                headerToolbar={
                                                    {
                                                        start: 'prev',
                                                        center: 'title',
                                                        end: 'next today'
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
                                                datesSet={(element) => {
                                                    this.setNewMonth(element)
                                                }}
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
                                    <button onClick={() => this.setState({ modalIsOpen: false, adjustmentEntryModal: false })} type="button" className="button-close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <ModalBody className="postPropsStyle">
                                    <div className='postStyleProps'>
                                        {!this.state.adjustmentEntryModal &&
                                            <EntryView anno={this.state.anno}
                                                mese={this.state.mese}
                                                entries={this.state.entriesView}
                                                adjustmentEntryModal={this.updateModal}
                                                removeEntry={this.removeEntry}
                                                removeAll={this.removeDailyEntries} />
                                        }

                                        {this.state.adjustmentEntryModal &&
                                            <div className='postStylePropsModal'>
                                                <EntriesImpl
                                                    columns={12}
                                                    addEntries={this.updateEntries}
                                                    anno={this.props.anno}
                                                    mese={this.props.mese}
                                                    codicePersona={this.props.location.codicePersona}
                                                    adjustment={true} />
                                            </div>
                                        }

                                    </div>
                                </ModalBody>
                                {/* {this.state.showDeleteModal &&
                                    <ModalFooter>

                                    </ModalFooter>
                                } */}
                            </Modal>
                            <Modal className="modal-lg" isOpen={this.state.showDeleteModal} toggle={this.openDeleteModal} >
                                <div className="modal-header">
                                    {/* <h5 className="modal-title mt-0" id="myLargeModalLabel">Dati Giornalieri</h5> */}
                                    <button onClick={() => this.setState({ showDeleteModal: false })} type="button" className="button-close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <ModalBody className="postPropsStyle">
                                    <Typography className='modalText' style={{ fontSize: "150%" }}>
                                        Desideri eliminare il seguente timesheet?
                                    </Typography>
                                </ModalBody>
                                <ModalFooter>
                                    <button className='modalBackButton' title='annulla' onClick={() => this.setState({ showDeleteModal: false })}>
                                        <img className="menu" src="./images/annulla.png"></img>
                                    </button>
                                    <button className='modalDeleteButton' title='conferma' onClick={() => { this.removeEntry() }}>
                                        <a href="/timesheet" >
                                            <img className="menu" src="./images/conferma.png"></img>
                                        </a>
                                    </button>
                                </ModalFooter>
                            </Modal>
                        </Col>
                    </Row>

                </Container>

            </React.Fragment >
        )
    }
}
export default TimesheetView;