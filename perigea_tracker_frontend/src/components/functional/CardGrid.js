//componente che visualizza la griglia di card

import React from 'react';
import Card from '../structural/Card';
import AddCardWindow from './AddCardWindow';
import SearchBar from '../structural/SearchBar';
import AxiosInstance from "../../axios/AxiosInstance";
import Modal from 'react-modal';
import Anagrafica from "./Anagrafica";
import UploadFileButton from "../structural/UploadFileButton";

let result = [];
export default class CardGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      showAddCard: false,
      showUpdateCard: false,
      listCard: "",
      searchTerm: '',
      keyShow: null,
      showAnagraficaModal: false
    }

    // bind methods
    this.loadUtenti = this.loadUtenti.bind(this);
    this.removeDipendente = this.removeDipendente.bind(this);
    this.saveDipendente = this.saveDipendente.bind(this);
    
  }
  

  componentDidMount() {
    console.log("componentDidMount start")
    AxiosInstance({
      url:"dipendenti/read-all-dipendenti"
    }).then((response) => {
      this.loadUtentiResponseIntoGrid(response);
    }).catch((error) => {
      console.log("Error into loadUtenti ", error)
    })
  }

  // carica gli utenti all'interno della griglia dalla response backend
  loadUtentiResponseIntoGrid = (response) => {
    let result = [];
    Object.keys(response.data).forEach((element) => {
      result.concat({
        codicePersona:element.codicePersona,
        nome: element.utente.nome,
        cognome: element.utente.cognome,
        mailAziendale: element.utente.mailAziendale,
        cellulare: element.utente.cellulare,
        tipo: element.tipo,
        searchTerm: ''
      })
    });
    // console.log(response)
    console.log("result : ", result)
    // this.setState({listCard: result.sort((cardA, cardB) => (cardA.name > cardB.name) ? 1 : -1)})
  }

  // chiamata axios carica utenti
  async loadUtenti() {
    console.log("load utenti start")
    AxiosInstance({
      url:"anagrafica-service/utente/getListUtenti"
    }).then((response) => {
      this.loadUtentiResponseIntoGrid(response);
    }).catch((error) => {
      console.log("Error into loadUtenti ", error)
    })
  };

  // chiamata axios rimozione utente by codice persona 
  async removeDipendente(codicePersona) {
    console.log("removeUtente start")
    AxiosInstance({
      method: 'post',
      url:`anagrafica-service/Dipendente/removeDipendente?codicePersona=${codicePersona}`
    }).then((response) => {    
      this.loadUtentiResponseIntoGrid(response);
    }).catch((error) => {
      console.log("Error into removeDipendente ", error)
    })
  };

  // chiamata aggiunta dipendenti
  async saveDipendente(
    codicePersonaInput, nomeInput, cognomeInput,
    codiceFiscaleInput, dataNascitaInput, luogoNascitaInput,
    forceCreateUserInput) { 
     
    AxiosInstance({
      method: 'post',
      url:`anagrafica-service/Dipendente/saveDipendente`,
      data: {
        codicePersona : codicePersonaInput,
        nome : nomeInput,
        cognome : cognomeInput,
        codiceFiscale : codiceFiscaleInput,
        dataNascita : dataNascitaInput,
        luogoNascita : luogoNascitaInput,
        createUser : forceCreateUserInput
      }
    }).then((response) => {  
      this.loadUtentiResponseIntoGrid(response);
    }).catch((error) => {
      console.log("Error into loadUtenti ", error)
    })
  };

  // mostra la di window dedicata all'aggiunta della carat
  showAddCardWindow = e => {
    console.log("showAddCardWindow")
    this.setState({
      showAddCard: !this.state.showAddCard,
    });
  };

  // mostra la window relativo all'update della card 2
  closeOrshowUpdateCardWindow = (codicePersona) => {
    console.log("closeOrshowUpdateCardWindow ", codicePersona)

    this.setState({
      showUpdateCard: !this.state.showUpdateCard,
    })

    if(codicePersona) {
      this.setState({
        showAnagraficaModal: true,
      })
    }
  };

  closeAnagraficaModel = () => {
    this.setState({
      showAnagraficaModal: false,
    })
  }

  // funzione aggiornamento card
  updateCard = (codicePersona, nome, cognome, codiceFiscale, dataNascita, luogoNascita) => {
    console.log('updateCard - ',codicePersona, nome, cognome, codiceFiscale, dataNascita, luogoNascita);
    this.saveDipendente(codicePersona, nome, cognome, codiceFiscale, dataNascita, luogoNascita, false)
  } 

  // mostra l'update modale di una card
  showModalUpdate = (keyCardUpdate, e) => {
    console.log("keyCardUpdate ", keyCardUpdate)
    this.setState({
      keyShow : keyCardUpdate,
      showUpdateCard : true
    })
    console.log("this.state.keyShow ", this.state.keyShow)
  }


  button = (key) => {
    return (e == key);
  }

  modalButton = (buttonName) => {
    return(
      <div className="box-card">
        <button 
        className="add-card-show-button" 
          //id="centered-toggle-button"
          onClick={e => { this.showAddCardWindow(e); }}> 
          {buttonName}
        </button>
      </div>
    )
  } 

  removeCard = (keyCard) => {
    this.removeDipendente(keyCard);
  }

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  }

  editSearchTerm = (e) => {
    this.setState({searchTerm: e.target.value});
  }

  dynamicSearch = () => {
    console.log("dynamicSearch this.state.listCard", this.state.listCard)
    if(this.state.listCard) {
      if(!this.state.searchTerm || this.state.searchTerm === "") {
        return this.state.listCard;
      }
      else {
        return this.state.listCard.filter(element => 
          (element.name.toUpperCase().includes(this.state.searchTerm.toUpperCase()))
          ||
          (element.lastName.toUpperCase().includes(this.state.searchTerm.toUpperCase())) 
        )
      }
    }
    else {
      return [];
    }
  }

  render() {
    return (
      <React.Fragment>
      <div className="card-grid">   

        <SearchBar value={this.state.listCard.searchTerm} onChange={this.editSearchTerm} /> 
  
        {this.modalButton("AGGIUNGI DIPENDENTE")}

        {
            this.dynamicSearch().map((item, key) => {
              return (
                <React.Fragment>
                <Card 
                  utente={item} 
                  disabilitaButton={this.button} 
                  showModal={e => {this.showModalUpdate(e)}}
                  deleteFunction={this.removeCard}
                  closeShowUpdateCardWindow={this.closeOrshowUpdateCardWindow} 
                  showUpdateCard={this.state.showUpdateCard}
                  updateCard={this.updateCard}
                  keyShow={this.state.keyShow}
                  profileButtonDelete="ELIMINA" 
                  profileButtonUpdate="VISUALIZZA"
                ></Card>
                </React.Fragment>
              ); 
          })         
        }
        
        <AddCardWindow 
          onClose={this.showAddCardWindow} 
          show={this.state.showAddCard} 
          addFunction={this.saveDipendente} 
        />
      </div>

      <Modal
        isOpen = {this.state.showAnagraficaModal}
        
        onRequestClose={this.closeAnagraficaModel}
        style = {{
          content:{backgroundColor:"rgb(216, 219, 219)"
        }}}
      >
        <Anagrafica 
          codicePersona={this.state.keyShow}>
        </Anagrafica>
      </Modal>

      </React.Fragment>
    );
  }
}