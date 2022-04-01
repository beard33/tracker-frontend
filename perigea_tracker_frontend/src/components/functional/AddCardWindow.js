//componente che mostra la finestra per aggiungere una card  

import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';


export default class AddCardWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      codiceFiscale: '',
      nome: '',
      cognome: '',
      dataNascita: '',
      luogoNascita: '',
      forceCreateUser: false,
      valid: false
    }
  }

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
    this.cleanFields();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addDipendente(
      '', // codice persona
      this.state.nome, 
      this.state.cognome, 
      this.state.codiceFiscale, 
      this.state.dataNascita, 
      this.state.luogoNascita,
      this.state.forceCreateUser
      );
  }

  handleCodiceFiscaleChange = (e) => {
    this.setState({codiceFiscale: e.target.value});
  }

  handleNomeChange = (e) => {
    this.setState({nome: e.target.value});
  }

  handleCognomeChange = (e) => {
    this.setState({cognome: e.target.value});
  }

  handleDataNascitaChange = (e) => {
    this.setState({dataNascita: e.target.value});
  }

  handleLuogoNascitaChange = (e) => {
    this.setState({luogoNascita: e.target.value});
  }

  handleForceUserChange = (e) => {
    this.setState({forceCreateUser: !this.state.forceCreateUser});
  }

  addKeyCard() {
    this.props.addFunction(
      '',
      this.state.nome, 
      this.state.cognome, 
      this.state.codiceFiscale, 
      this.state.dataNascita, 
      this.state.luogoNascita,
      this.state.forceCreateUser);
    this.setState({ 
      codiceFiscale: '',
      nome: '',
      cognome: '',
      dataNascita: '',
      luogoNascita: '',
      forceCreateUser: ''
    });
    this.props.onClose();
  }

  isDisabled(nome, cognome, codiceFiscale, dataNascita, luogoNascita) {  
    if 
      (
        (!codiceFiscale || codiceFiscale.length === 0) || 
        (!nome || nome.length === 0) || 
        (!cognome || cognome.length === 0 )||
        (!dataNascita || dataNascita.length === 0) ||
        (!luogoNascita || luogoNascita.length === 0)
      )
      {
        return true;
      }
  }

  placeholderUpdate(id) {  
    return id;
  }

  render() {
    if(!this.props.show){
      return null;
    }
    return (
        <div className="modal" id="modal">
          <div className="content">
            <div className="text-content">          
              {this.props.children}
                AGGIUNGI DIPENDENTE
            </div>
          </div>

          <br/>

          <div className="form-content">
            <form className="form-content-input" onSubmit={this.handleSubmit}>
              <TextField 
                style={{ 
                  marginTop:"5px",
                  width:"100%"
                }}
                error={this.state.nome === ""}
                value={this.state.nome} 
                onChange={this.handleNomeChange}
                label="nome"
                inputProps={{ maxLength: 16 }}
              ></TextField>
              <TextField 
                style={{ 
                  marginTop:"5px",
                  width:"100%"
                }}
                value={this.state.cognome} 
                error={this.state.cognome === ""}
                onChange={this.handleCognomeChange}
                label="cognome"
              ></TextField>
              <TextField 
                style={{ 
                  marginTop:"5px",
                  width:"100%"
                }}
                value={this.state.codiceFiscale}
                error={this.state.codiceFiscale === ""} 
                onChange={this.handleCodiceFiscaleChange}
                label="codice fiscale"
              ></TextField>
              <TextField 
                style={{ 
                  marginTop:"5px",
                  width:"100%"
                }}
                value={this.state.dataNascita}
                error={this.state.dataNascita === ""} 
                onChange={this.handleDataNascitaChange}
                placeholder="yyyy-mm-dd"
                label="data di nascita"
              ></TextField>
              <TextField
                style={{ 
                  marginTop:"5px",
                  width:"100%"
                }}
                value={this.state.luogoNascita}
                error={this.state.luogoNascita === ""} 
                onChange={this.handleLuogoNascitaChange}
                label="luogo di nascita"
              ></TextField>

              <FormControlLabel
                style={{
                  width:"100%",
                  height:"40px",
                  display:"flex",
                  alignItems:"baseline"}}
                control={
                  <Checkbox 
                    style={{ 
                      marginTop:"15px",
                      width:"10%"
                    }}
                    name="Forza creazione utente"
                    label="Forza creazione utente"
                    onChange={this.handleForceUserChange}
                  /> 
                }            
                label={<Typography variant="h6" color="textSecondary">Forza creazione utente</Typography>}
              />

              <div className="form-content-submit">
                <button 
                className="card-button-add" 
                type="submit" 
                defaultValue="Reset" 
                disabled={
                  this.isDisabled(
                    this.state.codiceFiscale,
                    this.state.nome,
                    this.state.cognome,
                    this.state.dataNascita,
                    this.state.luogoNascita)
                  } 
                  onClick={this.addKeyCard.bind(this)
                }> 
                  AGGIUNGI
                </button> 
                <button className="close-button-add" 
                defaultValue="Reset" 
                onClick={e => { 
                  this.onClose(e);
                 }}>
                  CLOSE
                </button>
              </div>
            </form>
          </div> 
        </div>
    );
  }
}
