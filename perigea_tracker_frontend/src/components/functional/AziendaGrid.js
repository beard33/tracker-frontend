//componente che visualizza la griglia di card

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

let endpoint;
export default class AziendaGrid extends React.Component {
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
      url: endpoint+"/read-all"
    }).then((response) => {
      this.loadAziendaResponseIntoGrid(response);
    }).catch((error) => {
      console.log("Error into loadUtenti ", error)
    })
  }

  checkPropsType = () => {
    let endpoint;
    console.log(this.props.tipo)
    switch (this.props.tipo) {
      case "clienti":
        endpoint = "clienti"
        break;
      case "fornitori":
        endpoint = "fornitori"
        break;
    }
    return endpoint;
    
  }

  // carica gli utenti all'interno della griglia dalla response backend
  loadAziendaResponseIntoGrid = (response) => {
    let result = [];
    Object.values(response.data.data).map((element) => {
      result.push({
        codiceAzienda: element.codiceAzienda,
        ragioneSociale: element.ragioneSociale,
        partitaIva: element.partitaIva,
        acronimoCliente: element.acronimoCliente
      })
    });
    console.log("result : ", result)
    console.log(response)
    this.setState({ listCard: result.sort((cardA, cardB) => (cardA.nome > cardB.nome) ? 1 : -1) })
  }

  deleteAzienda = (codiceAzienda) => {
    console.log("delete start")
    endpoint = this.checkPropsType()    
    console.log(endpoint)
    AxiosInstance({
      method: 'delete',
      url: `${endpoint}/delete-by-id/${codiceAzienda}`
    }).then((response) => {
      alert("azienda eliminata con successo");
    }).catch((error) => {
      console.log("Error into removeAzienda ", error)
    })
  };

  openDeleteModal = (codiceAzienda) => {
    this.setState({
      showDeleteModal: true,
      keyCode: codiceAzienda      
    })
    console.log(this.state.keyCode)
  };

  closeDeleteModal = () => {
    this.setState({ showDeleteModal: false })
  }


  ADDEmployeButton = (buttonName) => {
    return (
      <div className="box-card">
        <Link to={{ pathname: "/add-"+this.props.tipo }}
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
          return dipendente.partitaIva.toLowerCase().startsWith(keyword.toLowerCase());
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
                  placeholder='ragione sociale'
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

          {/* bottone di aggiunta azienda */}
          {this.ADDEmployeButton("AGGIUNGI "+ this.props.tipo.toUpperCase())}

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

          {/* modale per la cancellazione di un dipendente */}
          <Modal
            className="modal"
            isOpen={this.state.showDeleteModal}
          >
            <Typography className='modalText'>
              Desideri eliminare il seguente utente?
            </Typography>
            <button className='modalBackButton' onClick={this.closeDeleteModal}>
              Indietro
            </button>
            <button className='modalDeleteButton' onClick={() => this.deleteAzienda(this.state.keyCode)}>
              ELIMINA
            </button>
          </Modal>

        </div>
      </React.Fragment>
    );
  }
}