import React, { Component } from 'react'
import { Container, Row, Col, Label, FormGroup, Input, Card, CardBody, Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import BootstrapTheme from '@fullcalendar/bootstrap';
import AxiosInstance from '../../axios/AxiosInstance';
import EntriesImpl from './EntriesImpl'
import EntryView from './EntryView'
import NoteSpeseTable from './NoteSpeseTable';


let counter = 0;
class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            calendarWeekends: true,
            calendarEvents: [],
            modalIsOpen: false,
            timesheet: "",
            anno: 0,
            mese: 0,
            adjustmentEntryModal: false,
            entriesView: [],
            counter: 0



        }
        this.calendarComponentRef = React.createRef();



    }




    componentDidMount() {
        console.log(this.props.location.state)
        this.setState({
            anno: this.props.location.state.anno,
            mese: this.props.location.state.mese
        })
        this.getTimesheets(this.props.location.state.anno, this.props.location.state.mese)
    }


    componentDidUpdate() {
        this.getTimesheets(this.state.anno, this.state.mese)
    }


    getTimesheets = (anno, mese) => {
        if (counter < 1) {
            AxiosInstance({
                method: "get",
                url: `timesheet/read/${anno}/${mese}/${this.props.location.state.codicePersona}`,
            }).then((response) => {
                this.loadTimesheet(response)
            }).catch((error) => {
                console.log("Error into loadTimesheet ", error)
            })
        }
    }

    loadTimesheet = (arg) => {
        this.setState({
            timesheet: arg.data.data,
        })
        this.setEventList()
    }


    setEventList = () => {
        let event = {}
        console.log(this.state.counter)
        this.state.timesheet.entries.map((entry) => {
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
                    calendarEvents: prevState.calendarEvents.concat(event)
                }))
            }
            counter++
        })

    }

    dailyEntries = (day) => {
        // let timesheet = this.state.timesheet.find(el => el.mese === day.getMonth() + 1 && el.anno === day.getFullYear())

        // this.setState((prevState) => ({
        let entriesView = this.state.timesheet.entries.filter(el => el.giorno === day.getDate())
        this.setState({entriesView: entriesView})
        console.log(entriesView)

    }

    updateModal = () => {
        this.setState({ adjustmentEntryModal: true })
    }

    setNewMonth = (element) => {
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


    handleDateClick = (event, errors, values) => {
        console.log('values', values);
        console.log('value');

        if (values.title == null) { }
        else {
            var newEvent = {};
            newEvent = {
                id: this.state.calendarEvents.length + 1,
                title: values.title,
                start: values.startDate ? values.startDate : new Date(),
                end: values.endDate ? values.endDate : null,
                className: 'bg-primary'
            };
            this.setState({
                calendarEvents: this.state.calendarEvents.concat(newEvent),
                selectedDay: null
            });
        }
        console.log('calendar events', this.state.calendarEvents);
        this.modal()

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

                                            </div>
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
                                                        start: 'prev,next',
                                                        center: 'title',
                                                        end: 'today'
                                                    }
                                                }
                                                buttonText={
                                                    {
                                                        prev: '<<',
                                                        next: '>>'
                                                    }
                                                }
                                                header={{
                                                    left: 'prev,next today',
                                                    center: 'title',
                                                    right: 'dayGridMonth,dayGridWeek,dayGridDay'
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
                                    <button onClick={() => this.setState({ modalIsOpen: false })} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                
                                <ModalBody className="postPropsStyle">
                                   {!this.state.adjustmentEntryModal &&
                                        <EntryView anno={this.state.anno}
                                            mese={this.state.mese}
                                            entries={this.state.entriesView}
                                            adjustmentEntryModal={this.updateModal} />
                                    }
                                </ModalBody>
                                <ModalFooter>

                                </ModalFooter>
                            </Modal>
                        </Col>
                    </Row>

                </Container>

            </React.Fragment >
        )
    }
}

// export default Calendar;

export default Calendar;