//componente che mostra la finestra per aggiungere una card  

import React from "react";
import TextField from "@material-ui/core/TextField";

export default class UpdateCardWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      codicePersona: this.props.utente.codicePersona,
      codiceFiscale: this.props.utente.codiceFiscale,
      nome: this.props.utente.name,
      cognome: this.props.utente.lastName,
      dataNascita: this.props.utente.dataNascita,
      luogoNascita: this.props.utente.luogoNascita,
      valid: false
    }
  }

  showModal = () => {
    this.onClose(this.state.codicePersona);
  };

  onClose = (codicePersona) => {
    console.log("showModalAnagrafica codicePersona ", codicePersona);
    this.props.onClose(codicePersona);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Hai aggiornato una card');
    this.showModal();
  }

  handleCodiceFiscaleChange = (e) => {
    this.setState({codiceFiscale: e.target.value});
  }

  handleDataNascitaChange = (e) => {
    this.setState({dataNascita: e.target.value});
  }

  handleLuogoNascitaChange = (e) => {
    this.setState({luogoNascita: e.target.value});
  }

  updateKeyCard() {
    this.showModal();
  }

  isDisabled(codiceFiscale, dataNascita, luogoNascita) {  
    if 
      (
        (!codiceFiscale || codiceFiscale.length === 0 )||
        (!dataNascita || dataNascita.length === 0) ||
        (!luogoNascita || luogoNascita.length === 0)
      )
      {
        return true;
      }
  }

  render() {
    if(!this.props.isToShow){
      return null;
    } else  {

      if (this.props.utente.codicePersona == this.props.keyToShow){
        console.log("this.props.utente.codicePersona ", this.props.utente.codicePersona)
        console.log("this.props.utente.keyToShow ", this.props.keyToShow)

        return (
          
          <div className="modal" id="modal">
            <div className="content">
              <div className="text-content">  
                {this.props.utente.name} {this.props.utente.lastName} 
                {this.props.children}
              </div>
            </div>

            <br/>

            <div className="form-content">
              <form className="form-content-input" onSubmit={this.handleSubmit}>
              <TextField 
              style={{
                width:"100%"
              }}
              value={this.props.utente.codicePersona} 
              label="codice Persona"
              disabled={true}
            ></TextField>
              <TextField 
              style={{ 
                width:"100%"
              }}
              value={this.props.utente.name}
              label="nome"
              disabled={true}
            ></TextField>
            <TextField 
              style={{ 
                width:"100%"
              }}
              value={this.props.utente.lastName}
              label="cognome"
              disabled={true}
            ></TextField>
            <TextField 
              style={{ 
                width:"100%"
              }}
              value={this.props.utente.codiceFiscale}
              error={this.state.codiceFiscale === ""} 
              onChange={this.handleCodiceFiscaleChange}
              disabled={true}
              label="codice fiscale"
              inputProps={{ maxLength: 16 }}
            ></TextField>
            <TextField 
              style={{ 
                width:"100%"
              }}
              value={this.props.utente.dataNascita}
              error={this.state.dataNascita === ""} 
              onChange={this.handleDataNascitaChange}
              disabled={true}
              placeholder="yyyy-mm-dd"
              label="data di nascita"
            ></TextField>
            <TextField
              style={{ 
                width:"100%"
              }}
              value={this.props.utente.luogoNascita}
              error={this.state.luogoNascita === ""} 
              onChange={this.handleLuogoNascitaChange}
              disabled={true}
              label="luogo di nascita"
            ></TextField>

              <div className="form-content-submit">  
                <button className="card-button-add" 
                type="submit" 
                defaultValue="submit"  
                disabled={
                  this.isDisabled(
                    this.state.codiceFiscale,
                    this.state.nome,
                    this.state.cognome,
                    this.state.dataNascita,
                    this.state.luogoNascita)
                  } 
                onClick={this.showModal}> 
                  MODIFICA
                </button> 

                <button className="close-button-add"
                 defaultValue="Reset" 
                 onClick={e => { this.onClose('') }}>
                  CLOSE
                </button>
              </div> 
            </form>
          </div>  
        </div>
        );

      } else {
        return null;
      }
      
    }

  }
}