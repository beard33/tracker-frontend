import * as React from 'react';
import { Container } from 'react-bootstrap';
import Title from '../structural/Title';
import TimesheetCreazione from './TimesheetCreazione';
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { Button, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Timesheet extends React.Component {
    state = {
        data: "",
        anno: 0,
        mese: 0,
        checkRef: false
    }

    checkRefs = () => {
        this.setState({ checkRef: true })
        console.log(this.state)

    }

    setRefs = (arg) => {
        console.log(arg)
        this.setState({data: arg})
        const date = arg.split("-")
        const month = date[1].split("")
        this.setState({anno: date[0]})
        if(month[0]==="0") {
            this.setState({mese: month[1]})
        } else {
            this.setState({mese: date[1]})
        }
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
                                            style={{ width: "60%" }}
                                            label="mese"
                                            type="month"
                                            value={this.state.data}
                                            onChange={(e) => { this.setRefs(e.target.value) }}
                                        ></TextField>
                                    </Form.Row>
                                </Form>
                            </Grid>
                        </div>

                        <Link to={{
                            pathname: "/timesheet-view",
                            state: {
                                mese:this.state.mese,
                                anno:this.state.anno,
                                codicePersona: "04ed7cba-88ec-44b6-a325-d0fa34987516",
                                username: "sampei.genta"
                            }
                        }}>
                            <button className="button-visualizza"
                                type="button" >
                                VISUALIZZA
                            </button>
                        </Link>
                        <button className='button-avanti' onClick={this.checkRefs}>CREA</button>
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