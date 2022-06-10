import React from 'react';
import Card from '../structural/Card';
import AxiosInstance from "../../axios/AxiosInstance";
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Typography from '@mui/material/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Field from '../structural/Field';
import Title from '../structural/Title';
import { Container } from 'react-bootstrap';
import { Grid } from "@material-ui/core";
import { Button, Form, Row } from 'react-bootstrap';


const codiceResponsabile = "243a9d56-86a9-49a2-89c7-4e932685846f"
export default class TimesheetGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listCard: "",
            showDeleteModal: false,
            showAddModal: false,
            keyCode: "",
            searchValue: "",
            showSpecificSearches: false,
            data: "",
            anno: 0,
            mese: 0,
            checkRef: false,
            contattoResponsabile: ""
        }
    }

    componentDidMount() {
        this.getContattoResponsabile(codiceResponsabile)
    }

    getContattoResponsabile = async (userId) => {
        await AxiosInstance({
            method: "get",
            url: `utenti/contact-details/read-by-id/${userId}`,
        }).then((response) => {
            console.log(response)
            this.loadContattoResponsabile(response)
        }).catch((error) => {
            console.log("Error into load contattoResponsabile ", error)

        })
        // }
    }
    loadContattoResponsabile = (arg) => {
        this.setState({ contattoResponsabile: arg.data.data })
    }


    checkRefs = () => {
        this.setState({ checkRef: true })
        console.log(this.state)
        this.getTimesheetsSottoposti()

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


    getTimesheetsSottoposti = () => {
        console.log("componentDidMount start")
        AxiosInstance({
            url: `timesheet/read-all-by-responsabile/${this.state.anno}/${this.state.mese}/${codiceResponsabile}`
        }).then((response) => {
            console.log(response.data.data)
            this.loadTimesheets(response.data.data)
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }


    loadTimesheets = (response) => {
        console.log("loadTimesheets")
        console.log(response)
        let result = []
        Object.values(response).map((element) => {
            result.push({
                nome: element.nome,
                cognome: element.cognome,
                oreTotali: element.oreTotali,
                anno: element.anno,
                mese: element.mese,
                codicePersona: element.codicePersona,
                approvalStatus: element.statoRichiesta
            })
        })
        console.log(result)
        this.setState({ listCard: result.sort((cardA, cardB) => (cardA.tipoCommessa > cardB.tipoCommessa) ? 1 : -1) })
    }

    dynamicSearch = (e) => {
        if (this.state.listCard) {
            const keyword = e.target.value;
            if (keyword !== '') {
                const results = this.state.listCard.filter((timesheet) => {
                    return timesheet.cognome.toLowerCase().includes(keyword.toLowerCase());
                });
                this.setState({ listCard: results })
            }
            this.setState({ searchValue: keyword })

        }
    }

    render() {
        return (
            <React.Fragment>
                <Title></Title>
                {
                    !this.state.checkRef &&
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
                        </div>
                        <button className='button-confirm' onClick={this.checkRefs} title='conferma mese'>
                            <img className="menu" src="./images/conferma.png"></img>
                        </button>
                    </div>

                }
                {this.state.checkRef &&
                    <div className="card-grid">

                        {/*searchBar*/}
                        <div className="searchBar">
                            <Form style={{ width: "100%" }}>
                                <Form.Row className='searchForm'>
                                    <TextField
                                        style={{ width: "90%" }}
                                        type="search"
                                        value={this.state.searchValue}
                                        onChange={this.dynamicSearch}
                                        label="Filtro"
                                        placeholder='Cognome'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchRoundedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    >
                                    </TextField>
                                </Form.Row>
                            </Form>
                        </div>

                        {
                            Object.values(this.state.listCard).map((item) => {
                                return (
                                    <React.Fragment>
                                        <Field
                                            timesheet={item}
                                            tipo="T"
                                            contattoResponsabile={this.state.contattoResponsabile}
                                        ></Field>
                                    </React.Fragment>
                                );
                            })
                        }
                    </div>
                }
            </React.Fragment>
        )
    }
}