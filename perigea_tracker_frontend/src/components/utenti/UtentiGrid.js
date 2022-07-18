import React from 'react';
import Card from '../structural/Card';
import AxiosInstance from "../../axios/AxiosInstance";
import AddButton from '../structural/AddButton';
import DeleteModal from '../structural/DeleteModal';
import SearchBar from '../structural/SearchBar';
import { redirect } from '../../redux/Actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Title from '../structural/Title';

let endpoint;

class UtentiGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listCard: "",
      showDeleteModal: false,
      keyCode: "",
      searchValue: "",
      showSpecificSearches: false,
      searchList: ""
    }
  }


  componentDidMount = () => {
    if (!this.props.navBar) {
      this.props.dispatch(redirect(this.props.location))
    }
    console.log("componentDidMount start")
    if (this.props.gruppo) {
      endpoint = "utenti"
      this.setState({
        listCard: this.props.utenti,
        searchList: this.props.utenti
      })
    } else {
      endpoint = this.checkPersonaleType()
      this.readAllUtenti(endpoint)
    }
  }


  /**
   * metodo per il controllo del tipo di utente (dipendente/consulente)
   * @returns 
   */
  checkPersonaleType = () => {
    let endpoint;
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


  /**
   * chiamata rest lettura di tutti gli utenti prensenti in db
   * @param {*} endpoint 
   */
  readAllUtenti = async (endpoint) => {
    await AxiosInstance({
      url: endpoint + "/read-all"
    }).then((response) => {
      this.loadUtentiResponseIntoGrid(response);
    }).catch((error) => {
      console.log("Error into loadUtenti ", error)
    })
  }


  /**
   * carica gli utenti all'interno della griglia dalla response backend
   * @param {*} response 
   */
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
        tipo: element.utente.tipo
      })
    });
    this.setState({
      listCard: result.sort((cardA, cardB) => (cardA.nome > cardB.nome) ? 1 : -1),
      searchList: result.sort((cardA, cardB) => (cardA.nome > cardB.nome) ? 1 : -1)
    })
  }


  /**
   * chiamata rest per l'eliminazione di un utente
   */
  deleteDipendente = (codicePersona) => {
    console.log("delete start")
    endpoint = this.checkPersonaleType()
    AxiosInstance({
      method: 'delete',
      url: `${endpoint}/delete/${codicePersona}`
    }).then((response) => {
      alert("utente eliminato con successo");
    }).catch((error) => {
      console.log("Error into removeDipendente ", error)
    })
    this.setState({
      listCard: this.state.listCard.filter(el => el.codicePersona !== codicePersona),
      searchList: this.state.searchList.filter(el => el.codicePersona !== codicePersona)
    })
    this.closeDeleteModal()
  };


  /**
   * metodi per l'apertura e chiusura del modale di eliminazione
   * 
   */
  openDeleteModal = (codicePersona) => {
    this.setState({
      showDeleteModal: true,
      keyCode: codicePersona
    })
  };
  closeDeleteModal = () => {
    this.setState({
      showDeleteModal: false,
    })
  }


  /**
   * filtro dinamico basato sullo username 
   * @param {*} e 
   */
  dynamicSearch = (e) => {
    if (this.state.listCard) {
      const keyword = e.target.value;
      if (keyword !== '') {
        const results = this.state.listCard.filter((dipendente) => {
          return dipendente.username.toLowerCase().includes(keyword.toLowerCase());
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
        {this.props.gruppo ? null : <Title></Title>}
        <div className="card-grid">

          <SearchBar
            searchValue={this.state.searchValue}
            dynamicSearch={this.dynamicSearch}
            placeholder={"username"}
          />

          {((
            this.props.user.scope.includes("ROLE_MANAGEMENT")
            || this.props.user.scope.includes("ROLE_ADMIN")
            || this.props.user.scope.includes("ROLE_AMMINISTRAZIONE")
            || this.props.user.scope.includes("ROLE_HR")
          ) && !this.props.gruppo) &&
            <AddButton
              buttonName={"AGGIUNGI " + this.props.tipo.toUpperCase()}
              pathname={"/anagrafica-" + this.props.tipo}
            />}

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
            delete={this.deleteDipendente}
            keyCode={this.state.keyCode}
            typography={" Desideri eliminare il seguente utente?"}
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

export default withRouter(connect(mapStateToProps)(UtentiGrid));
