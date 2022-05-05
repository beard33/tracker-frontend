import * as React from 'react';


import AxiosInstance from '../../axios/AxiosInstance';

import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

import { Button, Col, Form, Row } from 'react-bootstrap';

import DayPickerGrid from './DayPickerGrid';
import EntriesImpl from './EntriesImpl';





export default class TimesheetCreazione extends React.Component {
    state = {
        codicePersona: "",
        anno: 0,
        mese: 0,
        days: [],
        entries: [],
        modifiedDays: []

    }

    componentWillMount() {
        this.setState({
            codicePersona: this.props.codicePersona,
            anno: this.props.anno,
            mese: this.props.mese
        })
    }

    alert = () => {
        console.log(this.state.entries)
    }

    addDays = (giorni) => {
        console.log(giorni)
        if (giorni != undefined && giorni.length > 0) {
            this.setState({days: giorni})
            
        } else {
            console.log("vuoto")
        }
    }

    handleAddEntry = (entry) => {
        this.setState((prevState) => ({
            entries: prevState.entries.concat(entry)
        }));
    }

    addEntries = (entryfields) => {
        console.log(entryfields)
        console.log("giorni"+ this.state.days)
        let entry;
        if (this.state.days == []) {
            alert("Seleziona prima delle date")
        } else {
            this.state.days.map((day) => {
                let dayNumber = day.getDate();
                console.log(dayNumber)
                entry = {
                    codiceCommessa: entryfields.codiceCommessa,
                    giorno: dayNumber,
                    ore: entryfields.ore,
                    trasferta: entryfields.trasferta,
                    tipoCommessa: entryfields.tipoCommessa,
                    descrizioneCommessa: entryfields.descrizioneCommessa,
                    ragioneSociale: entryfields.ragioneSociale,
                    noteSpese: entryfields.noteSpese
                }

                console.log(entry)
                this.handleAddEntry(entry)

            })
            console.log(this.state.entries)
        }
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
                    ></DayPickerGrid>

                    <EntriesImpl
                        addEntries={this.addEntries}
                    />
                </Row>

                <Button className='ButtonSave' onClick={this.alert}>
                    SAVE
                </Button>

            </React.Fragment>
        )
    }

}





