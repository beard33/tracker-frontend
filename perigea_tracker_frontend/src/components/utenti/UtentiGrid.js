//componente che visualizza la griglia di card

import React from 'react';
import Card from '../structural/Card';
import AxiosInstance from "../../axios/AxiosInstance";
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@material-ui/core/TextField';
import Form from "react-bootstrap/Form";
import InputAdornment from '@material-ui/core/InputAdornment';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';


let endpoint;

export default class UtentiGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listCard: "",
      showDeleteModal: false,
      keyCode: "",
      searchValue: "",
      showSpecificSearches: false
    }
  }


  componentDidMount = () => {
    console.log("componentDidMount start")
    endpoint = this.checkPropsType()
    console.log(endpoint)
    AxiosInstance({
      url: endpoint + "/read-all"
    }).then((response) => {
      this.loadUtentiResponseIntoGrid(response);
    }).catch((error) => {
      console.log("Error into loadUtenti ", error)
    })
  }

  checkPropsType = () => {
    let endpoint;
    console.log(this.props.tipo)
    switch (this.props.tipo) {
      case "dipendenti":
        endpoint = "dipendenti"
        break;
      case "consulenti":
        endpoint = "consulenti"
        break;
    }
    return endpoint;

  }

  // carica gli utenti all'interno della griglia dalla response backend
  loadUtentiResponseIntoGrid = (response) => {
    let result = [];
    Object.values(response.data.data).map((element) => {
      result.push({
        codicePersona: element.codicePersona,
        nome: element.utente.nome,
        cognome: element.utente.cognome,
        mailAziendale: element.utente.mailAziendale,
        cellulare: element.utente.cellulare,
        username: element.utente.username,
      })
    });
    console.log("result : ", result)
    console.log(response)
    this.setState({ listCard: result.sort((cardA, cardB) => (cardA.nome > cardB.nome) ? 1 : -1) })
  }

  deleteDipendente = (codicePersona) => {
    console.log("delete start")
    endpoint = this.checkPropsType()
    console.log(endpoint)
    AxiosInstance({
      method: 'delete',
      url: `${endpoint}/delete/${codicePersona}`
    }).then((response) => {
      alert("utente eliminato con successo");
    }).catch((error) => {
      console.log("Error into removeDipendente ", error)
    })
  };

  openDeleteModal = (codicePersona) => {
    this.setState({
      showDeleteModal: true,
      keyCode: codicePersona
    })
  };

  closeDeleteModal = () => {
    this.setState({ showDeleteModal: false })
  }


  ADDEmployeButton = (buttonName) => {
    return (
      <div className="box-card">
        <Link to={{
          pathname: "/anagrafica-" + this.props.tipo,
          updateProps: { update: false }
        }}
          style={{ textDecoration: "none" }}>
          <button
            className="add-card-show-button"

          >
            {buttonName}
          </button>
        </Link>
      </div>
    )
  }


  //possibilità di fare un filtro dinamico 
  dynamicSearch = (e) => {
    if (this.state.listCard) {
      const keyword = e.target.value;
      if (keyword !== '') {
        const results = this.state.listCard.filter((dipendente) => {
          return dipendente.username.toLowerCase().includes(keyword.toLowerCase());
        });
        this.setState({ listCard: results })
      }
      this.setState({ searchValue: keyword })

    }
  }


  render() {
    return (
      <React.Fragment>
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
                  placeholder='nome.cognome'
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

          {/* bottone di aggiunta dipendenti */}
          {this.ADDEmployeButton("AGGIUNGI " + this.props.tipo.toUpperCase())}

          {/* stampa della lista dei dipendenti */}
          {

            Object.values(this.state.listCard).map((item) => {
              return (
                <React.Fragment>
                  <Card
                    tipo={endpoint}
                    item={item}
                    showDeleteModal={this.openDeleteModal}
                  ></Card>
                </React.Fragment>
              );
            })
          }

          <Modal className="modal-lg" isOpen={this.state.showDeleteModal} toggle={this.openDeleteModal} >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="myLargeModalLabel">Eliminazione utente</h5>
              <button onClick={this.closeDeleteModal} className="button-close" title='esci' >
                <img className="menu" src="./images/exit.png"></img>
              </button>
            </div>
            <ModalBody className="postPropsStyle">
              <Typography className='modalText' style={{ fontSize: "150%" }}>
                Desideri eliminare il seguente utente?
              </Typography>
            </ModalBody>
            <ModalFooter>
              <button className='modalBackButton' title='annulla' onClick={() => this.setState({ showDeleteModal: false })}>
                <img className="menu" src="./images/annulla.png"></img>
              </button>
              <button className='modalDeleteButton' title='conferma' onClick={() => { this.deleteDipendente(this.state.keyCode) }}>
                <img className="menu" src="./images/conferma.png"></img>
              </button>
            </ModalFooter>
          </Modal>

        </div>
      </React.Fragment>
    );
  }
}
