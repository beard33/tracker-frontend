//componente che visualizza la griglia di card

import React from 'react';
import Card from '../structural/Card';
import AxiosInstance from "../../axios/AxiosInstance";



export default class CardGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listCard: ""
    }
  }


  componentDidMount() {
    console.log("componentDidMount start")
    AxiosInstance({
      url: "dipendenti/read-all-dipendenti"
    }).then((response) => {
      this.loadUtentiResponseIntoGrid(response);
    }).catch((error) => {
      console.log("Error into loadUtenti ", error)
    })
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


  modalButton = (buttonName) => {
    return (
      <div className="box-card">
        <button
          className="add-card-show-button"
        >
          {buttonName}
        </button>
      </div>
    )
  }



  dynamicSearch = () => {
    console.log("dynamicSearch this.state.listCard", this.state.listCard)
    if (this.state.listCard) {
      return this.state.listCard;
    }
    else {
      return [];
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="card-grid">



          {this.modalButton("AGGIUNGI DIPENDENTE")}

          {
            this.dynamicSearch().map((item) => {
              return (
                <React.Fragment>                  
                  <Card
                    dipendente={item}
                  ></Card>
                </React.Fragment>
              );
            })
          }


        </div>
      </React.Fragment>
    );
  }
}