import * as React from 'react';
import { Container } from 'react-bootstrap';
import Title from '../structural/Title';
import TimesheetCreazione from './TimesheetCreazione';
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { Button, Form, Row } from 'react-bootstrap';


class Timesheet extends React.Component {
    state = {
        anno: 0,
        mese: 0,
        checkRef: false
    }

    setRef = () => {
        this.setState({checkRef: true})
        console.log(this.state)
        
    }

    render() {
        return (
            <React.Fragment>
                <Title></Title>
                {!this.state.checkRef &&
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
                                            style={{ width: "40%" }}
                                            label="anno"
                                            value={this.state.anno}
                                            onChange={(e) => { this.setState({ anno: e.target.value }) }}
                                        ></TextField>
                                        <TextField
                                            style={{ width: "40%" }}
                                            label="mese"                                            
                                            value={this.state.mese}
                                            onChange={(e) => { this.setState({ mese: e.target.value }) }}
                                        ></TextField>
                                    </Form.Row>
                                </Form>
                            </Grid>
                        </div>
                        <button className='button-avanti' onClick={this.setRef}>AVANTI</button>
                    </div>
                }
                {this.state.checkRef &&
                    <Container fluid="xl">
                        <TimesheetCreazione
                            codicePersona="04ed7cba-88ec-44b6-a325-d0fa34987516"
                            anno={this.state.anno}
                            mese={this.state.mese}></TimesheetCreazione>
                    </Container>
                }

            </React.Fragment>
        )
    }
}
export default Timesheet;