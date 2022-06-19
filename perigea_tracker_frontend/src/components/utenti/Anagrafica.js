import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import UploadFileButton from '../structural/UploadFileButton'
import { Link } from 'react-router-dom';
import Ruoli from './Ruoli';
import RuoliTable from './RuoliTable';
import { MenuItem } from '@mui/material';
import { utenteStatus, anagraficaType } from '../enum/AnagraficaEnums';



export default class Anagrafica extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codicePersona: '',
      nome: '',
      cognome: '',
      dataDiNascita: "",
      luogoDiNascita: "",
      codiceFiscale: "",
      cellulare: '',
      username: '',
      avatar: "",
      provinciaDiResidenza: "",
      comuneDiResidenza: "",
      indirizzoDiResidenza: "",
      provinciaDiDomicilio: "",
      comuneDiDomicilio: "",
      indirizzoDiDomicilio: "",
      mailPrivata: '',
      mailAziendale: '',
      nomeContattoEmergenza: '',
      cellulareContattoEmergenza: '',
      iban: '',
      stato: '',
      tipo: '',
      codiceAzienda: "",
      ruoli: [],
      accountNonLocked: false,
      accountNonExpired: false,
      credentialsNonExpired: false,
      password: ''
    };
  }


  componentDidMount = () => {
    console.log(this.props.updateProps)
    if (this.props.updateProps.update) {
      this.setState(this.props.updateProps.user.utente)
    }
  }


  /**
   * metodo per l'implementazione della tabella dei ruoli
   */
  handleAddRole = (ruolo) => {
    this.setState((prevState) => ({
      ruoli: prevState.ruoli.concat(JSON.parse(ruolo))
    }));
    console.log(ruolo)
    console.log(this.state.ruoli)
  };

  /**
   * metodo di rimozione di un ruolo dalla tabella dei ruoli
   * @param {*} ruoloType 
   */
  removeRole = (ruoloType) => {
    this.setState({ ruoli: this.state.ruoli.filter((ruolo) => ruolo.id !== ruoloType) })
  }

    /**
   * metodo per il controllo del tipo di utente (dipendente/consulente)
   * @returns 
   */
     checkPersonaleType = () => {
      let type
      console.log(this.props.personale)
      switch (this.props.personale) {
        case "dipendente":
          type = "/dipendente"
          break;
        case "consulente":
          type = "/consulente"
          break;
      }
      return type;
    }


  render() {
    return (
      <React.Fragment>
        <div className="postStyleProps" >
          <h3>Dati Personali</h3>
          <div className="info">
            <Grid className="infoGrid"
              container
              spacing={20}
            >
              <Form style={{ width: "100%" }}>
                <Form.Row className="infoForm">                 
                  <TextField
                    style={{ width: "40%" }}
                    label="nome"
                    value={this.state.nome}
                    onChange={(e) => { this.setState({ nome: e.target.value }) }}
                  ></TextField>
                  <TextField
                    style={{ width: "40%" }}
                    label="cognome"
                    value={this.state.cognome}
                    onChange={(e) => { this.setState({ cognome: e.target.value }) }}
                  ></TextField>
                </Form.Row>
                <Form.Row className="infoForm">
                  <TextField
                    style={{ width: "40%" }}
                    label="data di nascita"
                    type="date"
                    value={this.state.dataDiNascita}
                    onChange={(e) => { this.setState({ dataDiNascita: e.target.value }) }}
                  ></TextField>

                  <TextField
                    style={{ width: "40%" }}
                    label="luogo di nascita"
                    value={this.state.luogoDiNascita}
                    onChange={(e) => { this.setState({ luogoDiNascita: e.target.value }) }}
                  ></TextField>
                </Form.Row>
                <Form.Row className="infoForm">                 
                  <TextField
                    style={{ width: "40%" }}
                    label="codice fiscale"
                    value={this.state.codiceFiscale}
                    onChange={(e) => { this.setState({ codiceFiscale: e.target.value }) }}
                  ></TextField>
                  <TextField
                    style={{ width: "40%" }}
                    value={this.state.avatar}
                    onChange={(e) => { this.setState({ avatar: e.target.value }) }}
                    label="avatar"
                  ></TextField>
                </Form.Row>
              </Form>
            </Grid>
          </div>

          <h3>Indirizzo</h3>
          <div className="info">
            <Grid className="infoGrid"
              container
              spacing={20}
            >
              <Form style={{ width: "100%" }}>
                <Form.Row className="infoForm">
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.provinciaDiResidenza}
                    onChange={(e) => { this.setState({ provinciaDiResidenza: e.target.value }) }}
                    label="provincia residenza"
                  ></TextField>
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.comuneDiResidenza}
                    onChange={(e) => { this.setState({ comuneDiResidenza: e.target.value }) }}
                    label="comune residenza"
                  ></TextField>
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.indirizzoDiResidenza}
                    onChange={(e) => { this.setState({ indirizzoDiResidenza: e.target.value }) }}
                    label="indirizzo residenza"
                  ></TextField>
                </Form.Row>
                <Form.Row className="infoForm">
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.provinciaDiDomicilio}
                    onChange={(e) => { this.setState({ provinciaDiDomicilio: e.target.value }) }}
                    label="provincia domicilio"
                  ></TextField>

                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.comuneDiDomicilio}
                    onChange={(e) => { this.setState({ comuneDiDomicilio: e.target.value }) }}
                    label="comune domicilio"
                  ></TextField>

                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.indirizzoDiDomicilio}
                    onChange={(e) => { this.setState({ indirizzoDiDomicilio: e.target.value }) }}
                    label="indirizzo domicilio"
                  ></TextField>
                </Form.Row>
              </Form>
            </Grid>
          </div>

          <h3>Contatti</h3>
          <div className="info">
            <Grid className="infoGrid"
              container
              spacing={20}
            >
              <Form style={{ width: "100%" }}>
                <Form.Row className="infoForm">
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.mailAziendale}
                    onChange={(e) => { this.setState({ mailAziendale: e.target.value }) }}
                    label="mail aziendale"
                  ></TextField>
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.cellulare}
                    onChange={(e) => { this.setState({ cellulare: e.target.value }) }}
                    label="cellulare"
                  ></TextField>
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.mailPrivata}
                    onChange={(e) => { this.setState({ mailPrivata: e.target.value }) }}
                    label="mail privata"
                  ></TextField>
                </Form.Row>
              </Form>
            </Grid>
          </div>

          <h3>Emergenza</h3>
          <div className="info">
            <Grid className="infoGrid"
              container
              spacing={20}
            >
              <Form style={{ width: "100%" }}>
                <Form.Row className="infoForm">
                  <TextField
                    style={{ width: "40%" }}
                    value={this.state.nomeContattoEmergenza}
                    onChange={(e) => { this.setState({ nomeContattoEmergenza: e.target.value }) }}
                    label="nome contatto emergenza"
                  ></TextField>
                  <TextField
                    style={{ width: "40%" }}
                    value={this.state.cellulareContattoEmergenza}
                    onChange={(e) => { this.setState({ cellulareContattoEmergenza: e.target.value }) }}
                    label="cellulare contatto emergenza"
                  ></TextField>
                </Form.Row>
              </Form>
            </Grid>
          </div>

          <h3>Dati lavorativi</h3>
          <div className="info">
            <Grid className="infoGrid"
              container
              spacing={20}
            >
              <Form style={{ width: "100%" }}>
                <Form.Row className="infoForm">
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.iban}
                    onChange={(e) => { this.setState({ iban: e.target.value }) }}
                    label="iban"
                  ></TextField>
                  <TextField
                    style={{ width: "25%" }}
                    id="select Anagrafica Type"
                    select
                    label="tipo Anagrafica"
                    value={this.state.tipo}
                    onChange={(e) => { this.setState({ tipo: e.target.value }) }}

                  >
                    {anagraficaType.map((option) => (
                      <MenuItem key={option.chiave} value={option.chiave} >
                        {option.chiave + " - " + option.descrizione}
                      </MenuItem>
                    ))}

                  </TextField>
                  <TextField
                    style={{ width: "25%" }}
                    id="select stato"
                    select
                    label="stato utente"
                    value={this.state.stato}
                    onChange={(e) => { this.setState({ stato: e.target.value }) }}

                  >
                    {utenteStatus.map((option) => (
                      <MenuItem key={option.stato} value={option.stato} >
                        {option.stato + " - " + option.descrizione}
                      </MenuItem>
                    ))}
                  </TextField>
                </Form.Row>
                <Form.Row className="infoForm">
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.codiceAzienda}
                    onChange={(e) => { this.setState({ codiceAzienda: e.target.value }) }}
                    label="codice azienda"
                  ></TextField>
                </Form.Row>
              </Form>
            </Grid>
          </div>



          <h3>Ruoli</h3>
          <div className='info'>
            <Ruoli updateState={this.handleAddRole} />
            <RuoliTable
              ruoli={this.state.ruoli}
              removePermission={true}
              onRemove={this.removeRole}
            />
          </div>

          <Form>
            <div className="button-container">             
                <Link to={{
                  pathname: this.checkPersonaleType(),
                  state: {
                    utente: this.state,
                    update: this.props.updateProps

                  }
                }}>
                  <button className="button-avanti"
                    type="button" title='AVANTI' >
                    <img className="menu" src="./images/avanti.png"></img>
                  </button>
                </Link> 
            </div>
          </Form>

        </div>
      </React.Fragment >
    );
  }
}