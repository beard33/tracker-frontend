import React from 'react';
import Card from '../structural/Card';
import AxiosInstance from "../../axios/AxiosInstance";
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Typography from '@mui/material/Typography';
import TextField from '@material-ui/core/TextField';
import Form from "react-bootstrap/Form";
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Field from '../structural/Field';
import Title from '../structural/Title';



export default class CommesseGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listCard: "",
            showDeleteModal: false,
            showAddModal: false,
            keyCode: "",
            searchValue: "",
            showSpecificSearches: false
        }
    }

    componentDidMount = () => {
        console.log("componentDidMount start")
        AxiosInstance({
            url: "commesse/read-all-commesse"
        }).then((response) => {
            this.loadAllCommesse(response);
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }


    loadAllCommesse = (response) => {
        console.log("loadAllCommesse")
        console.log(response)
        let result = []
        Object.values(response.data.data).map((element) => {
            result.push({
                codiceCommessa: element.codiceCommessa,
                tipoCommessa: element.tipoCommessa,
                descrizioneCommessa: element.descrizioneCommessa
            })
        })
        console.log(result)
        this.setState({ listCard: result.sort((cardA, cardB) => (cardA.tipoCommessa > cardB.tipoCommessa) ? 1 : -1) })
    }

    openADDModal = () => {
        this.setState({
            showAddModal: true
        })
    }

    ADDCommessaButtons = () => {
        return (
            <React.Fragment>
                <div>
                    <button className='modalFatturabileButton'>
                        <a className='buttonLink' href='/commessa-fatturabile'>FATTURABILE</a>
                    </button>
                    <button className='modalNoFatturabileButton'>
                        <a className='buttonLink' href='/commessa-non-fatturabile'> NON FATTURABILE </a>
                    </button>
                </div>
            </React.Fragment>
        )
    }

    openDeleteModal = (codiceCommessa, tipoCommessa) => {
        this.setState({
            showDeleteModal: true,
            keyCode: {
                codiceCommessa: codiceCommessa,
                tipoCommessa: tipoCommessa
            }
        })
    };

    closeModal = () => {
        this.setState({
            showDeleteModal: false,
            showAddModal: false
        })
    }

    deleteCommessa = () => {
        if (this.state.keyCode.tipoCommessa === "F") {
            console.log("delete commessa fatturabile start")
            AxiosInstance({
                method: 'delete',
                url: `commesse/delete-commessa-fatturabile/${this.state.keyCode.codiceCommessa}`
            }).then((response) => {
                alert("commessa fatturabile eliminata con successo");
            }).catch((error) => {
                alert("Error into remove commessa fatturabile ", error)
                console.log("Error into remove commessa fatturabile ", error)
            })
        } else {
            console.log("delete commessa non fatturabile start")
            AxiosInstance({
                method: 'delete',
                url: `commesse/delete-commessa-non-fatturabile/${this.state.keyCode.codiceCommessa}`
            }).then((response) => {
                alert("commessa non fatturabile eliminata con successo");
            }).catch((error) => {
                alert("Error into remove commessa non fatturabile ", error)
                console.log("Error into remove commessa non fatturabile ", error)
            })
        }
    }

    dynamicSearch = (e) => {
        if (this.state.listCard) {
            const keyword = e.target.value;
            if (keyword !== '') {
                const results = this.state.listCard.filter((commessa) => {
                    return commessa.tipoCommessa.toLowerCase().includes(keyword.toLowerCase());
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
                                    placeholder='tipo commessa'
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

                    {/* bottone creazione commessa */}
                    <button
                        className="add-field-show-button"
                        onClick={this.openADDModal}
                    >
                        AGGIUNGI COMMESSA
                    </button>

                    {
                        Object.values(this.state.listCard).map((item) => {
                            if (item.tipoCommessa === "S") {
                                return (
                                    <React.Fragment>
                                        <Field
                                            commessa={item}
                                            tipo="S"
                                            showDeleteModal={this.openDeleteModal}
                                        ></Field>
                                    </React.Fragment>
                                );
                            } else {
                                return (
                                    <React.Fragment>
                                        <Field
                                            commessa={item}
                                            tipo="F"
                                            showDeleteModal={this.openDeleteModal}
                                        ></Field>
                                    </React.Fragment>
                                );
                            }
                        })
                    }

                    <Modal
                        className="modal"
                        isOpen={this.state.showDeleteModal}
                    >
                        <Typography className='modalText'>
                            Desideri eliminare la seguente commessa?
                        </Typography>
                        <button className='modalBackButton' onClick={this.closeModal}>
                            Indietro
                        </button>
                        <button className='modalDeleteButton' onClick={() => this.deleteCommessa(this.state.keyCode)}>
                            ELIMINA
                        </button>
                    </Modal>

                    <Modal
                        className="modal"
                        isOpen={this.state.showAddModal}
                        onRequestClose={this.closeModal}
                    >
                        <Typography className='modalText'>
                            Che tipo di commessa desideri aggiungere?
                        </Typography>

                        {this.ADDCommessaButtons()}

                    </Modal>

                </div>
            </React.Fragment>
        )
    }
}