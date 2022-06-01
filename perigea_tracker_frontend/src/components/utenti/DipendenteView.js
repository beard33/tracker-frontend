import * as React from 'react';
import AxiosInstance from '../../axios/AxiosInstance';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WelcomeHeader from '../structural/WelcomeHeader';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Link } from 'react-router-dom';
import Title from '../structural/Title';
import RuoliTable from './RuoliTable';


export default class DipendenteView extends React.Component {
  state = {
    utente: "",
    personale: {
      codicePersona: "",
      tipo: "",
      dataAssunzione: "",
      dataCessazione: "",
      codiceResponsabile: "",
      economics: ""
    },
    usernameResponsabile: ""
  }

  componentDidMount = () => {
    console.log("componentDidMount start")

    AxiosInstance({
      method: "get",
      url: `dipendenti/read/${this.props.location.codicePersona}`
    }).then((response) => {
      this.loadUtente(response);
    }).catch((error) => {
      console.log("Error into loadUtenti ", error)
    })
  }
  loadUtente = (response) => {
    console.log(response)
    this.setState({
      utente: response.data.data.utente,
      personale: {
        codicePersona: response.data.data.codicePersona,
        tipo: response.data.data.tipo,
        dataAssunzione: response.data.data.dataAssunzione,
        dataCessazione: response.data.data.dataCessazione,
        codiceResponsabile: response.data.data.codiceResponsabile,
        economics: response.data.data.economics
      }
    })
    console.log(this.state)
    this.getUsernameResponsabile()
  }

  

  getUsernameResponsabile = () => {    
    AxiosInstance({
      method: "get",
      url: `dipendenti/read/${this.state.personale.codiceResponsabile}`
    }).then((response) => {
      console.log(response)
      this.loadUsernameResponsabile(response.data.data);

    }).catch((error) => {
      console.log("Error into loadUtenti ", error)
    })
  }
  loadUsernameResponsabile = (response) => {
    this.setState({ usernameResponsabile: response.utente.username })
    console.log(this.state.usernameResponsabile)
  }




  getData = (e) => {
    if (e) {
      return Object.keys(e).map((key) => {
        // console.log(key+ "=>" +e[key])
        if (key !== "password") {
          if (key === "ruoli") {
            return (
              <div className='muiList'>
                <List subheader={
                  <ListSubheader>Ruoli</ListSubheader>
                }>
                  {
                    Object.values(e[key]).map((ruolo) => {
                      console.log(ruolo)
                      return (
                        <RuoliTable ruoli={this.state.utente.ruoli} removePermission={false} />
                      )
                    })
                  }
                </List>
              </div>
            )
          } else {
            return (
              <TextField
                label={key}
                value={e[key]}
              ></TextField>
            );

          }
        }
      });
    };
  }

  render() {
    return (
      <React.Fragment>
        <Title></Title>
        <div>
          <WelcomeHeader
            img="../images/default-profile-picture.png"
            name={this.state.utente.nome + " " + this.state.utente.cognome}
            admin={"Dipendente"}
            userEmail={this.state.utente.username}
            db={true}
          />
          <div className='userAccordion'>
            <Accordion>
              <AccordionSummary
                className='accordionSummary'
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Anagrafica</Typography>
              </AccordionSummary>
              <AccordionDetails className='accordionDetails'>
                {this.getData(this.state.utente)}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                className='accordionSummary'
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Dati Aziendali</Typography>
              </AccordionSummary>
              <AccordionDetails className='accordionDetails'>
                <div>
                  <TextField
                    label={"Tipo Personale"}
                    value={this.state.personale.tipo}
                  ></TextField>
                  <TextField
                    label={"Data Assunzione"}
                    value={this.state.personale.dataAssunzione}
                  ></TextField>
                  <TextField
                    label={"Data Cessazione"}
                    value={this.state.personale.dataCessazione}
                  ></TextField>
                  <TextField
                    label={"Responsabile"}
                    value={this.state.usernameResponsabile}
                  ></TextField>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                className='accordionSummary'
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Dati Economici</Typography>
              </AccordionSummary>
              <AccordionDetails className='accordionDetails'>
                {this.getData(this.state.personale.economics)}
              </AccordionDetails>
            </Accordion>
            <Accordion expanded >
              <AccordionSummary
                // className='accordionSummary'
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography></Typography>
              </AccordionSummary>
              <AccordionDetails className='accordionDetails'>
                <Link to={{
                  pathname: "/anagrafica-dipendenti",
                  updateProps: {
                    update: true,
                    user:this.state
                  }
                }}>
                  <button className="button-update" title='modifica dipendente'
                    type="button" >
                    <img className="menu" src="./images/update.png"></img>
                  </button>
                </Link>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </React.Fragment>
    )
  };
}