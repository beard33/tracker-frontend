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
        this.setState({ data: arg })
        const date = arg.split("-")
        const month = date[1].split("")
        this.setState({ anno: date[0] })
        if (month[0] === "0") {
            this.setState({ mese: month[1] })
        } else {
            this.setState({ mese: date[1] })
        }
        console.log(this.state)
    }

    render() {
        return (
            <React.Fragment>
                <Title></Title>
                {!this.state.checkRef &&
                    <div className="postStyleProps" style={{ marginLeft: "1%", width: "98%" }} >
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
                            
                                <div>
                                    <Link to={{
                                        pathname: "/timesheet-view",
                                        state: {
                                            responsabile: false,
                                            mese: this.state.mese,
                                            anno: this.state.anno,
                                            codicePersona: "2978f40f-69a8-4360-954b-c27746199c01",
                                            username: "samuel.genta"
                                        }
                                    }}>
                                        <button className="button-visualizza"
                                            type="button" title='visualizza'>
                                            <img className="menu" src="./images/view.png"></img>
                                        </button>
                                    </Link>
                                    <Link to={{
                                        pathname: "/timesheet-create",
                                        state: {
                                            mese: this.state.mese,
                                            anno: this.state.anno,
                                            codicePersona: "2978f40f-69a8-4360-954b-c27746199c01",
                                            username: "samuel.genta"
                                        }
                                    }}>
                                        <button className='button-create' onClick={this.checkRefs} title='crea timesheet mensile'>
                                            <img className="menu" src="./images/add.png"></img>
                                        </button>
                                    </Link>
                                </div>
                            
                        </div>


                    </div>


                }

            </React.Fragment >
        )
    }
}
export default Timesheet;