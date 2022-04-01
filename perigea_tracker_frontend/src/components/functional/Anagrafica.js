import React, { Component } from 'react';
import Form from "react-bootstrap/Form";

import { Grid } from "@material-ui/core";
import AxiosInstance from "../../axios/AxiosInstance";
import TextField from '@material-ui/core/TextField';
import UploadFileButton from '../structural/UploadFileButton'
import { ruoli } from './Ruoli';
import { MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';



export default class Anagrafica extends Component {
  constructor(props) {
    super(props);

    this.state = {
      utente: {
        codicePersona: '',
        nome: '',
        cognome: '',
        dataNascita: '',
        luogoNascita: '',
        codiceFiscale: '',
        cellulare: '',
        username: '',
        avatar: '',

        provinciaResidenza: '',
        comuneResidenza: '',
        indirizzoResidenza: '',
        provinciaDomicilio: '',
        comuneDomicilio: '',
        indirizzoDomicilio: '',

        mailPrivata: '',
        mailAziendale: '',

        nomeContattoEmergenza: '',
        cellulareContattoEmergenza: '',

        iban: '',
        stato: '',
        tipo: '',
        codiceAzienda: '',

        ruoli: [
          {
            id: "M",
            descrizione: "manager"
          }
        ],

        accountNonLocked: false,
        accountNonExpired: false,
        credentialsNonExpired: false,
        password: "vfdvd"
      }
    };


  }



  render() {
    return (
      <React.Fragment>
        <div className="anagraficadipendente" >
          <h3>Dati Personali</h3>
          <div className="anagraficainfo">
            <Grid className="anagraficacard"
              container
              spacing={20}
            >
              <Form style={{ width: "100%" }}>
                <Form.Row className="anagraficaform">
                  <TextField
                    style={{ width: "25%" }}
                    label="codice Persona"
                    value={this.state.codicePersona}
                    onChange={(e) => { this.setState({ utente: { codicePersona: e.target.value } }) }}
                  ></TextField>
                  <TextField
                    style={{ width: "25%" }}
                    label="nome"
                    value={this.state.nome}
                    onChange={(e) => { this.setState({ utente: { nome: e.target.value } }) }}
                  ></TextField>
                  <TextField
                    style={{ width: "25%" }}
                    label="cognome"
                    value={this.state.cognome}
                    onChange={(e) => { this.setState({ utente: { cognome: e.target.value } }) }}
                  ></TextField>
                </Form.Row>
                <Form.Row className="anagraficaform">
                  <TextField
                    style={{ width: "25%" }}
                    label="data di nascita"
                    placeholder="yyyy-mm-dd"
                    value={this.state.dataNascita}
                    onChange={(e) => { this.setState({ utente: { dataNascita: e.target.value } }) }}
                  ></TextField>

                  <TextField
                    style={{ width: "25%" }}
                    label="luogo di nascita"
                    value={this.state.luogoNascita}
                    onChange={(e) => { this.setState({ utente: { luogoNascita: e.target.value } }) }}
                  ></TextField>

                  <TextField
                    style={{ width: "25%" }}
                    label="codice fiscale"
                    value={this.state.codiceFiscale}
                    onChange={(e) => { this.setState({ utente: { codiceFiscale: e.target.value } }) }}
                  ></TextField>
                </Form.Row>
                <Form.Row className="anagraficaform">
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.username}
                    onChange={(e) => { this.setState({ utente: { username: e.target.value } }) }}
                    label="username"
                  ></TextField>
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.avatar}
                    onChange={(e) => { this.setState({ utente: { avatar: e.target.value } }) }}
                    label="avatar"
                  ></TextField>
                </Form.Row>
              </Form>
            </Grid>
          </div>

          <h3>Indirizzo</h3>
          <div className="anagraficainfo">
            <Grid className="anagraficacard"
              container
              spacing={20}
            >
              <Form style={{ width: "100%" }}>
                <Form.Row className="anagraficaform">
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.provinciaResidenza}
                    onChange={(e) => { this.setState({ utente: { provinciaResidenza: e.target.value } }) }}
                    label="provincia residenza"
                  ></TextField>
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.comuneResidenza}
                    onChange={(e) => { this.setState({ utente: { comuneResidenza: e.target.value } }) }}
                    label="comune residenza"
                  ></TextField>
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.indirizzoResidenza}
                    onChange={(e) => { this.setState({ utente: { indirizzoResidenza: e.target.value } }) }}
                    label="indirizzo residenza"
                  ></TextField>
                </Form.Row>
                <Form.Row className="anagraficaform">
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.provinciaDomicilio}
                    onChange={(e) => { this.setState({ utente: { provinciaDomicilio: e.target.value } }) }}
                    label="provincia domicilio"
                  ></TextField>

                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.comuneDomicilio}
                    onChange={(e) => { this.setState({ utente: { comuneDomicilio: e.target.value } }) }}
                    label="comune domicilio"
                  ></TextField>

                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.indirizzoDomicilio}
                    onChange={(e) => { this.setState({ utente: { indirizzoDomicilio: e.target.value } }) }}
                    label="indirizzo domicilio"
                  ></TextField>
                </Form.Row>
              </Form>
            </Grid>
          </div>

          <h3>Contatti</h3>
          <div className="anagraficainfo">
            <Grid className="anagraficacard"
              container
              spacing={20}
            >
              <Form style={{ width: "100%" }}>
                <Form.Row className="anagraficaform">
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.mailAziendale}
                    onChange={(e) => { this.setState({ utente: { mailAziendale: e.target.value } }) }}
                    label="mail aziendale"
                  ></TextField>
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.cellulare}
                    onChange={(e) => { this.setState({ utente: { cellulare: e.target.value } }) }}
                    label="cellulare"
                  ></TextField>
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.mailPrivata}
                    onChange={(e) => { this.setState({ utente: { mailPrivata: e.target.value } }) }}
                    label="mail privata"
                  ></TextField>
                </Form.Row>
              </Form>
            </Grid>
          </div>

          <h3>Emergenza</h3>
          <div className="anagraficainfo">
            <Grid className="anagraficacard"
              container
              spacing={20}
            >
              <Form style={{ width: "100%" }}>
                <Form.Row className="anagraficaform">
                  <TextField
                    style={{ width: "40%" }}
                    value={this.state.nomeContattoEmergenza}
                    onChange={(e) => { this.setState({ utente: { nomeContattoEmergenza: e.target.value } }) }}
                    label="nome contatto emergenza"
                  ></TextField>
                  <TextField
                    style={{ width: "40%" }}
                    value={this.state.cellulareContattoEmergenza}
                    onChange={(e) => { this.setState({ utente: { cellulareContattoEmergenza: e.target.value } }) }}
                    label="cellulare contatto emergenza"
                  ></TextField>
                </Form.Row>
              </Form>
            </Grid>
          </div>

          <h3>Dati lavorativi</h3>
          <div className="anagraficainfo">
            <Grid className="anagraficacard"
              container
              spacing={20}
            >
              <Form style={{ width: "100%" }}>
                <Form.Row className="anagraficaform">
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.iban}
                    onChange={(e) => { this.setState({ utente: { iban: e.target.value } }) }}
                    label="iban"
                  ></TextField>
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.tipo}
                    onChange={(e) => { this.setState({ utente: { tipo: e.target.value } }) }}
                    label="tipo"
                  ></TextField>
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.stato}
                    onChange={(e) => { this.setState({ utente: { stato: e.target.value } }) }}
                    label="stato"
                  ></TextField>
                </Form.Row>
                <Form.Row className="anagraficaform">
                  <TextField
                    style={{ width: "25%" }}
                    value={this.state.codiceAzienda}
                    onChange={(e) => { this.setState({ utente: { codiceAzienda: e.target.value } }) }}
                    label="codice azienda"
                  ></TextField>
                </Form.Row>
              </Form>
            </Grid>
          </div>

          {/* <h3>Ruoli</h3>
          <div className="anagraficainfo">

            <Form style={{ width: "40%" }}>
              <TextField
                style={{
                  margin: "0px 0px 0px 400px",
                  width: "100%"
                }}
                id="select ruoli"
                select
                label="Ruolo"
                value={this.state.ruoli}
                onChange={(e) => { this.setState({ utente: { ruoli: e.target.value } }) }}
                helperText="select ruolo"
              >
                {ruoli.map((option) => (
                  <MenuItem key={option.ruoloType} value={option.descrizione}>
                    {option.ruoloType + " " + option.descrizione}
                  </MenuItem>
                ))}
              </TextField>
            </Form>
          </div> */}



          <UploadFileButton >
          </UploadFileButton>

          <Form>
            <div className="button-container">
              {this.props.personale == "dipendente" ?
                <Link to={{ pathname: "/dipendente", state: { utente: this.state.utente } }}>
                  <button className="button-avanti"
                    type="button" >
                    AVANTI
                  </button>
                </Link> :
                <Link to={{ pathname: "/consulenti", state: { utente: this.state.utente } }}>
                  <button className="button-avanti"
                    type="button" >
                    AVANTI
                  </button>
                </Link>
              }
              <Link to={{ pathname: "/dipendente", state: { utente: this.state.utente } }}>
                <button className="button-avanti"
                  type="button" 
                  onClick={console.log(this.state.utente)}>
                  AVANTI
                </button>
              </Link>

            </div>
          </Form>

        </div>
      </React.Fragment >
    );
  }
}