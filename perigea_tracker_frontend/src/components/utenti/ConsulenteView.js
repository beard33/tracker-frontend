import * as React from 'react';
import AxiosInstance from '../../axios/AxiosInstance';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WelcomeHeader from '../structural/WelcomeHeader';
import TextField from '@material-ui/core/TextField';
import RuoliTable from './RuoliTable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authorizationControl } from '../utils/Utils';
import LoadingSpinner from '../structural/LoadingSpinner';
import Title from '../structural/Title';

class ConsulenteView extends React.Component {
  state = {
    utente: "",
    codicePersona: "",
    tipo: "",
    dataAssunzione: "",
    dataCessazione: "",
    codiceResponsabile: "",
    partitaIva: '',
    costo: "",
    economics: "",
    usernameResponsabile: "",
    isLoading: false
  }

  componentDidMount = () => {
    console.log("CONSULENTE-VIEW start")
    this.readUtenteById()
  }

  /**
   * chiamata axios per la lettura di un consulente by codicePersona
   */
  readUtenteById = async () => {
    this.setState({ isLoading: true })
    await AxiosInstance({
      method: "get",
      url: `consulenti/read/${this.props.location.codicePersona}`
    }).then((response) => {
      this.loadUtente(response);
    }).catch((error) => {
      console.log("Error into loadUtenti ", error)
      this.setState({ isLoading: false })
    })
  }

  /**
   * metodo di memorizzazione della risposta della chiamata axios
   * @param {*} response 
   */
  loadUtente = (response) => {
    this.setState({
      utente: response.data.data.utente,
      codicePersona: response.data.data.codicePersona,
      tipo: response.data.data.tipo,
      dataAssunzione: response.data.data.dataAssunzione,
      dataCessazione: response.data.data.dataCessazione,
      codiceResponsabile: response.data.data.codiceResponsabile,
      partitaIva: response.data.data.partitaIva,
      costo: response.data.data.costo,
      economics: response.data.data.economics
    })
    this.getUsernameResponsabile()
    this.setState({ isLoading: false })
  }

  /**
   * metodi per ricavare lo username del responsabile 
   */
  getUsernameResponsabile = () => {
    AxiosInstance({
      method: "get",
      url: `dipendenti/read/${this.state.codiceResponsabile}`
    }).then((response) => {
      this.loadUsernameResponsabile(response.data.data);
    }).catch((error) => {
      console.log("Error into loadUtenti ", error)
    })
  }
  loadUsernameResponsabile = (response) => {
    this.setState({ usernameResponsabile: response.utente.username })
  }

 
  /**
   * metodo per la stesura dei dati all'interno dell'accordion di visualizzazione
   * @param {*} e 
   * @returns 
   */
  getData = (e) => {
    if (e) {
      return Object.keys(e).map((key) => {
        if (key !== "password" &&
          key !== "createTimestamp" &&
          key !== "createUser" &&
          key !== "lastUpdateTimestamp" &&
          key !== "lastUpdateUser") {
          if (key === "ruoli") {
            return (
              <div className='muiList'>
                <RuoliTable ruoli={this.state.utente.ruoli} removePermission={false} />
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
        {this.state.isLoading ? <LoadingSpinner /> :
          <div>
            <WelcomeHeader
              img="../images/default-profile-picture.png"
              name={this.state.utente.nome + " " + this.state.utente.cognome}
              admin={"Consulente"}
              userEmail={this.state.utente.username}
              db={true}
            />
            <div className='userAccordion'>
              <Accordion expanded>
                <AccordionSummary
                  className='accordionSummary'
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className='accordion-text'>Anagrafica</Typography>
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
                  <Typography className='accordion-text'>Dati Aziendali</Typography>
                </AccordionSummary>
                <AccordionDetails className='accordionDetails'>
                  <div>
                    <TextField
                      label={"Tipo Personale"}
                      value={this.state.tipo}
                    ></TextField>
                    <TextField
                      label={"Data Assunzione"}
                      value={this.state.dataAssunzione}
                    ></TextField>
                    <TextField
                      label={"Data Cessazione"}
                      value={this.state.dataCessazione}
                    ></TextField>
                    <TextField
                      label={"Responsabile"}
                      value={this.state.usernameResponsabile}
                    ></TextField>
                    <TextField
                      label={"Partita Iva"}
                      value={this.state.partitaIva}
                    ></TextField>
                    <TextField
                      label={"Costo"}
                      value={this.state.costo}
                    ></TextField>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion disabled={authorizationControl(this.props.user.scope)}>
                <AccordionSummary
                  className='accordionSummary'
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography className='accordion-text'>Dati Economici</Typography>
                </AccordionSummary>
                <AccordionDetails className='accordionDetails'>
                  {this.getData(this.state.economics)}
                </AccordionDetails>
              </Accordion>
              <Accordion expanded>
                <AccordionSummary
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography></Typography>
                </AccordionSummary>
                <AccordionDetails className='accordionDetails'>
                  <Link to={{
                    pathname: "/anagrafica-consulenti",
                    updateProps: {
                      update: true,
                      user: this.state
                    }
                  }}>
                    <button className="button-update"
                      type="button" >
                      <img className="menu" src="./images/update.png"></img>
                    </button>
                  </Link>
                </AccordionDetails>
              </Accordion>
            </div>

          </div>
        }
      </React.Fragment>
    )
  };
}
const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(ConsulenteView);