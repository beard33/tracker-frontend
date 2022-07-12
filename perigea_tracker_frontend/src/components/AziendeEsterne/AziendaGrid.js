import React from 'react';
import Card from '../structural/Card';
import AxiosInstance from "../../axios/AxiosInstance";
import DeleteModal from '../structural/DeleteModal'
import AddButton from '../structural/AddButton'
import SearchBar from '../structural/SearchBar';
import { withRouter } from 'react-router-dom';
import { redirect } from '../../redux/Actions';
import { connect } from 'react-redux';


let endpoint;
class AziendaGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listCard: "",
      searchList: "",
      showDeleteModal: false,
      keyCode: "",
      searchValue: "",
      showSpecificSearches: false
    }
  }


  componentDidMount = () => {
    if (!this.props.navBar) {
      this.props.dispatch(redirect(this.props.location))
    }
    console.log("AZIENDA-GRID start")
    endpoint = this.checkAziendaType()
    this.readAllAziende(endpoint)
  }


  /**
   * chiamata rest per la ricerca di tutte le aziende presenti nel db
   * @param {*} endpoint 
   */
  readAllAziende = async (endpoint) => {
    await AxiosInstance({
      url: endpoint + "/read-all"
    }).then((response) => {
      this.loadAziendaResponseIntoGrid(response);
    }).catch((error) => {
      console.log("Error into loadUtenti ", error)
    })
  }


  /**
   * funzione di controllo del tipo di azienda (fornitori/clienti)
   * @returns 
   */
  checkAziendaType = () => {
    let endpoint;
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


  /**
   * funzione per ottenere i dati da inserire nei campi delle cards
   * @param {*} response 
   */
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
    this.setState({
      listCard: result.sort((cardA, cardB) => (cardA.nome > cardB.nome) ? 1 : -1),
      searchList: result.sort((cardA, cardB) => (cardA.nome > cardB.nome) ? 1 : -1)
    })
  }

  /**
   * chiamata rest di eliminazione di un' azienda
   * @param {*} codiceAzienda 
   */
  deleteAzienda = async (codiceAzienda) => {
    console.log("delete start")
    endpoint = this.checkAziendaType()
    await AxiosInstance({
      method: 'delete',
      url: `${endpoint}/delete-by-id/${codiceAzienda}`
    }).then((response) => {
      alert("azienda eliminata con successo");
    }).catch((error) => {
      console.log("Error into removeAzienda ", error)
    })
    this.setState({
      listCard: this.state.listCard.filter(el => el.codiceAzienda !== codiceAzienda),
      searchList: this.state.searchList.filter(el => el.codiceAzienda !== codiceAzienda)
    })
    this.closeDeleteModal()
  };


  /**
   * funzioni per l'apertura e chiusura del modale di eliminazione
   * 
   */
  openDeleteModal = (codiceAzienda) => {
    this.setState({
      showDeleteModal: true,
      keyCode: codiceAzienda
    })
  };

  closeDeleteModal = () => {
    this.setState({ showDeleteModal: false })
  }


  /**
   * funzione di ricerca per il filtro basato sulla ragione sociale
   * @param {*} e 
   */
  dynamicSearch = (e) => {
    if (this.state.listCard) {
      const keyword = e.target.value;
      if (keyword !== '') {
        const results = this.state.listCard.filter((azienda) => {
          return azienda.ragioneSociale.toLowerCase().includes(keyword.toLowerCase());
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

          <SearchBar
            searchValue={this.state.searchValue}
            dynamicSearch={this.dynamicSearch}
            placeholder={"ragione sociale"}
          />

          <AddButton
            pathname={"/add-" + this.props.tipo}
            buttonName={"AGGIUNGI " + this.props.tipo.toUpperCase()}
          />

          {
            Object.values(this.state.searchList).map((item) => {
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

          <DeleteModal
            open={this.state.showDeleteModal}
            toggle={this.openDeleteModal}
            close={this.closeDeleteModal}
            delete={this.deleteAzienda}
            keyCode={this.state.keyCode}
            typography={"Desideri eliminare la seguente azienda?"}
          />

        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.user,
    counter: state.counter,
    history: state.history,
    navBar: state.navBar
  }
}

export default withRouter(connect(mapStateToProps)(AziendaGrid));