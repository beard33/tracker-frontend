import * as React from 'react';
import AxiosInstance from '../../axios/AxiosInstance';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WelcomeHeader from '../structural/WelcomeHeader';
import TextField from '@material-ui/core/TextField';
import Title from '../structural/Title';
import EstensioniTable from './EstensioniTable';
import EstensioneCommessaCreate from './EstensioneCommessaCreazione';
import AssegnazioneCommessa from './AssegnazioneCommessa';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import UtentiAssegnati from './UtentiAssegnatiCommessa';


export default class CommessaFatturabileView extends React.Component {
    state = {
        commessaFatturabile: "",
        estensioniCommessa: [],
        estensioneModal: false,
        assegnazioniCommessa: [],
        assegnazioneModal: false,
        utentiAssegnati: [],
        infoUtentiCommessa: [],
        sync: true
    }

    componentDidMount = () => {
        console.log("COMMESSA_FATTURABILE-VIEW start")
        this.getCommessa()
        this.getEstensioniCommessa()
        this.getUtentiAssegnati()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.sync !== this.state.sync) {
            this.getCommessa()
            this.getEstensioniCommessa()
            this.getUtentiAssegnati()
        }
    }


    /**
     * metodi per la lettura della commessa tramite il codice commessa
     */
    getCommessa = async () => {
        await AxiosInstance({
            method: "get",
            url: `commesse/read-commessa-fatturabile/${this.props.location.codiceCommessa}`
        }).then((response) => {
            this.loadCommessa(response);
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }
    loadCommessa = (response) => {       
        this.setState({
            commessaFatturabile: response.data.data,
        })
        console.log(this.state.commessaFatturabile.commessa.codiceCommessa)
    }


    /**
     * metodi per la lettura dei dati anagrafici principali degli utenti assegnati alla commessa
     */
    getUtentiAssegnati = async () => {
        await AxiosInstance({
            method: "get",
            url: `assegnazione-commesse/read-utenti-assegnati-by-commessa/${this.props.location.codiceCommessa}`
        }).then((response) => {
            this.loadUtentiAssegnati(response);
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
        this.getAssegnazioniByCommessa()
    }
    loadUtentiAssegnati = (arg) => {
        let result = [];
        Object.values(arg.data.data).map((element) => {
            result.push({
                codicePersona: element.codicePersona,
                mailAziendale: element.mailAziendale,
                username: element.username,
            })
        });       
        this.setState({ utentiAssegnati: result.sort((cardA, cardB) => (cardA.nome > cardB.nome) ? 1 : -1) })
    }


    /**
     * metodi per la lettura dei dati relativi a tutte le assegnazioni alla commessa
     */
    getAssegnazioniByCommessa = async () => {
        await AxiosInstance({
            method: "get",
            url: `assegnazione-commesse/read-all-assegnazioni-by-commessa/${this.props.location.codiceCommessa}`
        }).then((response) => {
            this.loadAssegnazioni(response);
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }
    loadAssegnazioni = (arg) => {
        this.setState({ assegnazioniCommessa: arg.data.data })
        this.setInfoUtentiCommessa()
    }


    /**
     * popolamento lista delle informazioni da inserire nella tabella assegnazioni
     */
    setInfoUtentiCommessa = () => {
        let utenteCommessa;
        let result = []
        this.state.assegnazioniCommessa.map((assegnazione) => {
            let utente = this.state.utentiAssegnati.find(el => el.codicePersona === assegnazione.codicePersona)
            utenteCommessa = {
                codicePersona: assegnazione.codicePersona,
                username: utente.username,
                mailAziendale: utente.mailAziendale,
                dataInizioAllocazione: assegnazione.dataInizioAllocazione,
                tariffa: assegnazione.tariffa,
                giorniPrevisti: assegnazione.giorniPrevisti
            }
            result.push(utenteCommessa)
        })
        this.setState({ infoUtentiCommessa: result.sort((cardA, cardB) => (cardA.nome > cardB.nome) ? 1 : -1) })
    }


    /**
     * metodi per la lettura dei dati relativi alle estensioni commessa
     */
    getEstensioniCommessa = async () => {
        await AxiosInstance({
            method: "get",
            url: `commesse/read-estensione-commessa/${this.props.location.codiceCommessa}`
        }).then((response) => {
            this.loadEstensioni(response)
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }
    loadEstensioni = (response) => {        
        let result = []
        Object.values(response.data.data).map((element) => {
            result.push({
                dataEstensione: element.dataEstensione,
                importoInternoEstensione: element.importoInternoEstensione,
                dataFineEstensione: element.dataFineEstensione
            })
        })        
        this.setState({ estensioniCommessa: result.sort((cardA, cardB) => (cardA.tipoCommessa > cardB.tipoCommessa) ? 1 : -1) })
    }


    /**
     * metodo per l'eliminazione di un'estensione della commessa
     * @param {*} codiceCommessa 
     * @param {*} dataEstensione 
     */
    deleteEstensioneCommessa = async (codiceCommessa, dataEstensione) => {
        await AxiosInstance({
            method: "delete",
            url: `commesse/delete-estensione-commessa/${codiceCommessa}/${dataEstensione}`
        }).then((response) => {
            console.log("estensione eliminata con successo")
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
            alert("errore nella cancellazione", error)
        })
        this.setState({ estensioniCommessa: this.state.estensioniCommessa.filter((el) => el.dataEstensione !== dataEstensione) })
    }


    /**
     * rimozione di utente dalla lista degli utenti assegnati alla commessa
     * @param {*} codicePersona 
     */
    removeAssegnazioneCommessa = async (codicePersona) => {
        await AxiosInstance({
            method: "delete",
            url: `assegnazione-commesse/delete/commessa/${this.props.location.codiceCommessa}/dipendente/${codicePersona}`
        }).then((response) => {
            console.log("utente rimosso dagli utenti assegnati alla commessa")
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
            alert("errore nella rimozione", error)
        })
        this.setState({
            infoUtentiCommessa: this.state.infoUtentiCommessa.filter((el) => el.codicePersona !== codicePersona),
            utentiAssegnati: this.state.utentiAssegnati.filter((el) => el.codicePersona !== codicePersona)
        })

    }

    /**
     * metodi di apertura dei modali di estensione ed assegnazione  commessa
     */
    openModalEstensioni = () => {
        this.setState({ estensioneModal: true })
    }
    openModalAssegnazioni = () => {
        this.setState({ assegnazioneModal: true })
    }


    /**
    * metodo chiusura dei modali di estensione e assegnazione commessa
    */
    closeModal = () => {
        this.setState({
            estensioneModal: false,
            assegnazioneModal: false,
            sync: !this.state.sync
        })
    }


    /**
     * metodo per la stesura dei dati commessa nell'accordion di visualizzazione
     * @param {*} e 
     * @returns 
     */
    getDatiCommessa = (e) => {
        if (e) {
            return Object.keys(e).map((key) => {
                if (key === "commessa" ||
                    key === "dataInizioCommessa" ||
                    key === "dataFineCommessa" ||
                    key === "descrizioneCommessaCliente" ||
                    key === "responsabileCommerciale" ||
                    key === "tipoCommessaFatturabile"
                ) {
                    if (key === "commessa") {
                        return Object.keys(e[key]).map((item) => {
                            if (item !== "createTimestamp" &&
                                item !== "createUser" &&
                                item !== "lastUpdateTimestamp" &&
                                item !== "lastUpdateUser") {
                                return (
                                    <TextField
                                        label={item}
                                        value={(e[key])[item]}
                                    ></TextField>
                                )
                            }
                        })
                    } else {
                        return (
                            <TextField
                                label={key}
                                value={e[key]}
                            ></TextField>
                        )
                    }
                }
            })
        };
    }

    /**
     * metodo di stesura dei dati numerici (commessa fatturabile)
     * nell'accordion di visualizzazione
     * @param {*} e 
     * @returns 
     */
    getDatiNumerici = (e) => {
        if (e) {
            return Object.keys(e).map((key) => {
                if (key !== "commessa" &&
                    key !== "dataInizioCommessa" &&
                    key !== "dataFineCommessa" &&
                    key !== "descrizioneCommessaCliente" &&
                    key !== "responsabileCommerciale" &&
                    key !== "tipoCommessaFatturabile" &&
                    key !== "createTimestamp" &&
                    key !== "createUser" &&
                    key !== "lastUpdateTimestamp" &&
                    key !== "lastUpdateUser"
                ) {
                    return (
                        <TextField
                            label={key}
                            value={e[key]}
                        ></TextField>
                    )
                }
            })
        };
    }


    render() {
        return (
            <React.Fragment>
                <Title></Title>
                <div>
                    <WelcomeHeader
                        img="../images/comm-fatt.png"
                        name={""}
                        admin={"Commessa"}
                        userEmail={"Fatturabile"}
                        db={true}
                    />
                    <div className='userAccordion'>
                        <Accordion expanded>
                            <AccordionSummary
                                className='accordionSummary'
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className='accordion-text'>Dati Commessa</Typography>
                            </AccordionSummary>
                            <AccordionDetails className='accordionDetails'>
                                {this.getDatiCommessa(this.state.commessaFatturabile)}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                className='accordionSummary'
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className='accordion-text'>Dati Numerici</Typography>
                            </AccordionSummary>
                            <AccordionDetails className='accordionDetails'>
                                {this.getDatiNumerici(this.state.commessaFatturabile)}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                className='accordionSummary'
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className='accordion-text'>Estensioni Commessa</Typography>
                            </AccordionSummary>
                            <AccordionDetails className='accordionDetails'>
                                <EstensioniTable
                                    estensioni={this.state.estensioniCommessa}
                                    codiceCommessa={this.props.location.codiceCommessa}
                                    deleteEstensione={this.deleteEstensioneCommessa}
                                />
                                <button className="button-update"
                                    title='estendi commessa'
                                    type="button"
                                    onClick={this.openModalEstensioni}
                                >
                                    <img className="menu" src="./images/estensione.png"></img>
                                </button>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                className='accordionSummary'
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className='accordion-text'>Utenti Assegnati</Typography>
                            </AccordionSummary>
                            <AccordionDetails className='accordionDetails'>
                                <UtentiAssegnati
                                    utentiAssegnati={this.state.infoUtentiCommessa}
                                    removeAssegnazioneCommessa={this.removeAssegnazioneCommessa}
                                />
                                <button className='button-update' title='assegna commessa' type='button'
                                    onClick={this.openModalAssegnazioni}
                                    style={{ marginRight: "2%" }}
                                >
                                    <img className="menu" src="./images/assegnazione.png"></img>
                                </button>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded>
                            <AccordionSummary
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography></Typography>
                            </AccordionSummary>
                            <AccordionDetails className='accordionDetails'>
                                <Link to={{
                                    pathname: "/commessa-fatturabile",
                                    state: {
                                        update: true,
                                        commessa: this.state.commessaFatturabile
                                    }
                                }} >
                                    <button className="button-update" title='modifica commessa'
                                        type="button" >
                                        <img className="menu" src="./images/update.png"></img>
                                    </button>
                                </Link>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>


                <Modal className="modal-lg" isOpen={this.state.estensioneModal} >
                    <div className="modal-header">
                        <h5 className="modal-title mt-0" id="myLargeModalLabel">Creazione Estensione Commessa</h5>
                        <button title='esci' onClick={this.closeModal} type="button" className="button-close" data-dismiss="modal" aria-label="Close">
                            <img className="menu" src="./images/exit.png"></img>
                        </button>
                    </div>
                    <ModalBody className="postPropsStyle">
                        <EstensioneCommessaCreate codiceCommessa={this.props.location.codiceCommessa} closeModal={this.closeModal} />
                    </ModalBody>
                </Modal>

                <Modal className="modal-lg" isOpen={this.state.assegnazioneModal} >
                    <div className="modal-header">
                        <h5 className="modal-title mt-0" id="myLargeModalLabel">Assegnazione Commessa</h5>
                        <button title='esci' onClick={this.closeModal} type="button" className="button-close" data-dismiss="modal" aria-label="Close">
                            <img className="menu" src="./images/exit.png"></img>
                        </button>
                    </div>
                    <ModalBody className="postPropsStyle">
                        <AssegnazioneCommessa codiceCommessa={this.props.location.codiceCommessa} update={false} closeModal={this.closeModal} />
                    </ModalBody>
                </Modal>

            </React.Fragment>
        )
    }

}