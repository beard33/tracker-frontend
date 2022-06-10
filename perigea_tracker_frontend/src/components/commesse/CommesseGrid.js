import React from 'react';
import Card from '../structural/Card';
import AxiosInstance from "../../axios/AxiosInstance";
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
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
        {
            this.props.cliente ?
                this.getCommesseByAzienda(this.props.codiceAzienda) :
                this.getAllCommesse()
        }
    }

    getAllCommesse = async () => {
        await AxiosInstance({
            url: "commesse/read-all-commesse"
        }).then((response) => {
            this.loadAllCommesse(response);
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }

    getCommesseNonFatturabili = () => {
        AxiosInstance({
            url: "commesse/read-all-non-fatturabili"
        }).then((response) => {
            console.log(response)
            this.loadCommesseNonFatturabili(response);
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }

    getCommesseByAzienda = (cliente) => {
        if (cliente === "0c44f51f-60c6-425b-af85-77a91e703b8d") {
            this.getCommesseNonFatturabili()
        } else {
            this.getAllCommesseByCliente(cliente)
        }
    }

    getAllCommesseByCliente = (cliente) => {
        AxiosInstance({
            url: `commesse/read-commesse-by-cliente/${cliente}`
        }).then((response) => {
            this.loadCommesseCliente(response);
            console.log(response.data.data)
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }
    loadCommesseCliente = (response) => {
        console.log("loadAllCommesse")
        console.log(response)
        let result = []
        Object.values(response.data.data).map((element) => {
            result.push({
                codiceCommessa: element.commessa.codiceCommessa,
                tipoCommessa: element.commessa.tipoCommessa,
                descrizioneCommessa: element.commessa.descrizioneCommessa
            })
        })
        console.log(result)
        this.setState({ listCard: result.sort((cardA, cardB) => (cardA.tipoCommessa > cardB.tipoCommessa) ? 1 : -1) })
    }

    loadCommesseNonFatturabili = (response) => {
        let result = []
        Object.values(response.data.data).map((element) => {
            result.push({
                codiceCommessa: element.commessa.codiceCommessa,
                tipoCommessa: element.commessa.tipoCommessa,
                descrizioneCommessa: element.commessa.descrizioneCommessa
            })
        })
        console.log(result)
        this.setState({ listCard: result.sort((cardA, cardB) => (cardA.tipoCommessa > cardB.tipoCommessa) ? 1 : -1) })
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
                    { (!this.props.cliente || this.props.codiceAzienda !== "0c44f51f-60c6-425b-af85-77a91e703b8d") &&
                        <button className='modalFatturabileButton'>
                            <a className='buttonLink' href='/ordine-commessa' update={false}>FATTURABILE</a>
                        </button>
                    }
                    {(!this.props.cliente || this.props.codiceAzienda === "0c44f51f-60c6-425b-af85-77a91e703b8d") && 
                        <button className='modalNoFatturabileButton'>
                            <a className='buttonLink' href='/commessa-non-fatturabile'> NON FATTURABILE </a>
                        </button>
                    }
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
            showAddModal: false,
        })
        this.forceUpdate()
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
        this.closeModal()
        this.forceUpdate()
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
                {/* <Title></Title> */}
                <div className="card-grid">

                    {/* searchBar */}
                    {this.props.cliente ? null :
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
                    }

                    {/* bottone creazione commessa */}
                    <button
                        className="add-field-show-button"
                        onClick={this.openADDModal}
                        title="crea una commessa"
                    >
                        <img className="menu" src="./images/add.png"></img>
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
                                            cliente={this.props.cliente ? true : false}
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
                                            cliente={this.props.cliente ? true : false}
                                        ></Field>
                                    </React.Fragment>
                                );
                            }
                        })
                    }

                    <Modal className="modal-lg" isOpen={this.state.showDeleteModal} toggle={this.openDeleteModal} >
                        <div className="modal-header">
                            {/* <h5 className="modal-title mt-0" id="myLargeModalLabel">Dati Giornalieri</h5> */}
                            <button onClick={() => this.setState({ showDeleteModal: false })} className="button-close" title='esci' >
                                <img className="menu" src="./images/exit.png"></img>
                            </button>
                        </div>
                        <ModalBody className="postPropsStyle">
                            <Typography className='modalText' style={{ fontSize: "150%" }}>
                                Desideri eliminare la seguente commessa?
                            </Typography>
                        </ModalBody>
                        <ModalFooter>
                            <button className='modalBackButton' title='annulla' onClick={this.closeModal}>
                                <img className="menu" src="./images/annulla.png"></img>
                            </button>
                            <button className='modalDeleteButton' title='conferma' onClick={() => { this.deleteCommessa(this.state.keyCode) }}>
                                <img className="menu" src="./images/conferma.png"></img>
                            </button>
                        </ModalFooter>
                    </Modal>
                    <Modal className="modal-lg" isOpen={this.state.showAddModal}>
                        <div className="modal-header">
                            <h5 className="modal-title mt-0" id="myLargeModalLabel">Creazione Commessa</h5>
                            <button onClick={() => this.setState({ showAddModal: false })} type="button" className="button-close" data-dismiss="modal" aria-label="Close">
                                <img className="menu" src="./images/exit.png"></img>
                            </button>
                        </div>
                        <ModalBody className="postPropsStyle">
                            <Typography className='modalText' style={{ fontSize: "150%" }}>
                                Che tipo di commessa desideri aggiungere?
                            </Typography>

                        </ModalBody>
                        <ModalFooter>
                            {this.ADDCommessaButtons()}
                        </ModalFooter>
                    </Modal>

                </div>
            </React.Fragment>
        )
    }
}