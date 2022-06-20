import React from 'react';
import AxiosInstance from "../../axios/AxiosInstance";
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import Typography from '@mui/material/Typography';
import Field from '../structural/Field';
import SearchBar from '../structural/SearchBar';
import DeleteModal from '../structural/DeleteModal';



export default class CommesseGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listCard: "",
            showDeleteModal: false,
            showAddModal: false,
            keyCode: "",
            searchValue: "",
            showSpecificSearches: false,
            searchList: ""
        }
    }

    componentDidMount = () => {
        console.log("COMMESSA_GRID start")
        {
            this.props.cliente ?
                this.getCommesseByAzienda(this.props.codiceAzienda) :
                this.getAllCommesse()
        }
    }

    /**
     * chiamata axios per la lettura di tutte le commesse 
     */
    getAllCommesse = async () => {
        await AxiosInstance({
            url: "commesse/read-all-commesse"
        }).then((response) => {
            this.loadAllCommesse(response);
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }

    /**
   * metodo di controllo per distinguere il "CLIENTE PERIGEA" dai veri e propri clienti
   * @param {*} cliente 
   */
    getCommesseByAzienda = (cliente) => {
        if (cliente === "0c44f51f-60c6-425b-af85-77a91e703b8d") {
            this.getCommesseNonFatturabili()
        } else {
            this.getAllCommesseByCliente(cliente)
        }
    }

    /**
     * chiamata axios per la lettura delle commesse in base al cliente
     * @param {*} cliente 
     */
    getAllCommesseByCliente = async (cliente) => {
        await AxiosInstance({
            url: `commesse/read-commesse-by-cliente/${cliente}`
        }).then((response) => {
            this.loadCommesseCliente(response);
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }


    /**
     * chiamata axios per la lettura di tutte le commesse non fatturabili
     */
    getCommesseNonFatturabili = async () => {
        await AxiosInstance({
            url: "commesse/read-all-non-fatturabili"
        }).then((response) => {
            this.loadCommesseCliente(response);
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }



    /**
     * metodo per la memorizzazione dei dati principali delle commesse legate al cliente
     * @param {*} response 
     */
    loadCommesseCliente = (response) => {
        console.log("loadAllCommesse")
        let result = []
        Object.values(response.data.data).map((element) => {
            result.push({
                codiceCommessa: element.commessa.codiceCommessa,
                tipoCommessa: element.commessa.tipoCommessa,
                descrizioneCommessa: element.commessa.descrizioneCommessa
            })
        })
        this.setState({
            listCard: result.sort((cardA, cardB) => (cardA.tipoCommessa > cardB.tipoCommessa) ? 1 : -1),
            searchList: result.sort((cardA, cardB) => (cardA.tipoCommessa > cardB.tipoCommessa) ? 1 : -1)
        })
    }


    /**
     * metodo per la lettura dei principali dati di tutte le commesse (griglia proncipale)
     * @param {*} response 
     */
    loadAllCommesse = (response) => {
        console.log("loadAllCommesse")        
        let result = []
        Object.values(response.data.data).map((element) => {
            result.push({
                codiceCommessa: element.codiceCommessa,
                tipoCommessa: element.tipoCommessa,
                descrizioneCommessa: element.descrizioneCommessa
            })
        })       
        this.setState({
            listCard: result.sort((cardA, cardB) => (cardA.tipoCommessa > cardB.tipoCommessa) ? 1 : -1),
            searchList: result.sort((cardA, cardB) => (cardA.tipoCommessa > cardB.tipoCommessa) ? 1 : -1)
        })
    }


    /**
     * metodo di apertura del modale di creazione
     */
    openADDModal = () => {
        this.setState({
            showAddModal: true
        })
    }

    /**
     * bottoni del modale di creazione
     * @returns 
     */
    ADDCommessaButtons = () => {
        return (
            <React.Fragment>
                <div>
                    {(!this.props.cliente || this.props.codiceAzienda !== "0c44f51f-60c6-425b-af85-77a91e703b8d") &&
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


    /**
     * metodo per l'apertura del modale di eliminazione commessa
     * @param {*} codiceCommessa 
     * @param {*} tipoCommessa 
     */
    openDeleteModal = (codiceCommessa, tipoCommessa) => {
        this.setState({
            showDeleteModal: true,
            keyCode: {
                codiceCommessa: codiceCommessa,
                tipoCommessa: tipoCommessa
            }
        })
    };


    /**
     * metodo di chiusura del modale
     */
    closeModal = () => {
        this.setState({
            showDeleteModal: false,
            showAddModal: false,
        })
    }


    /**
     * chiamata axios per l'eliminazione di una commessa
     */
    deleteCommessa = async () => {
        console.log("delete commessa fatturabile start")
        await AxiosInstance({
            method: 'delete',
            url: this.state.keyCode.tipoCommessa === "F" ?
                `commesse/delete-commessa-fatturabile/${this.state.keyCode.codiceCommessa}` :
                `commesse/delete-commessa-non-fatturabile/${this.state.keyCode.codiceCommessa}`
        }).then((response) => {
            alert("commessa eliminata con successo");
        }).catch((error) => {
            alert("Error into remove commessa ", error)
            console.log("Error into remove commessa ", error)
        })
        this.setState({
            listCard: this.state.listCard.filter(el => el.codiceCommessa !== this.state.keyCode.codiceCommessa),
            searchList: this.state.searchList.filter(el => el.codiceCommessa !== this.state.keyCode.codiceCommessa)
        })
        this.closeModal()
    }


    /**
     * filtro di ricerca basato sulla descrizione della commessa
     * @param {*} e 
     */
    dynamicSearch = (e) => {
        if (this.state.listCard) {
            const keyword = e.target.value;
            if (keyword !== '') {
                const results = this.state.listCard.filter((commessa) => {
                    return commessa.descrizioneCommessa.toLowerCase().includes(keyword.toLowerCase());
                });
                this.setState({ searchList: results })
            } else {
                this.setState({ searchList: this.state.listCard })
            }
            this.setState({ searchValue: keyword })
        }
    }



    render() {
        return (
            <React.Fragment>
                <div className="card-grid">

                    {!this.props.cliente &&
                        <SearchBar
                            searchValue={this.state.searchValue}
                            dynamicSearch={this.dynamicSearch}
                            placeholder={"descrizione commessa"}
                        />
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
                        Object.values(this.state.searchList).map((item) => {
                            return (
                                <React.Fragment>
                                    <Field
                                        commessa={item}
                                        tipo={item.tipoCommessa}
                                        showDeleteModal={this.openDeleteModal}
                                        cliente={this.props.cliente ? true : false}
                                    ></Field>
                                </React.Fragment>
                            );
                        })
                    }


                    <DeleteModal
                        open={this.state.showDeleteModal}
                        toggle={this.openDeleteModal}
                        close={this.closeModal}
                        delete={this.deleteCommessa}
                        keyCode={this.state.keyCode}
                        typography={" Desideri eliminare la seguente commessa?"}
                    />


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