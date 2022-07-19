import * as React from 'react';
import AxiosInstance from '../../axios/AxiosInstance';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WelcomeHeader from '../structural/WelcomeHeader';
import TextField from '@material-ui/core/TextField';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { redirect, link } from '../../redux/Actions';
import Title from '../structural/Title';
import RuoliTable from './RuoliTable';
import LoadingSpinner from '../structural/LoadingSpinner';
import { authorizationControl } from '../utils/Utils';
import { connect } from 'react-redux';
import DownloadCurriculumButton from './DownloadCurriculumButton';


class DipendenteView extends React.Component {
  state = {
    utente: "",
    personale: {
      codicePersona: "",
      tipo: "",
      dataAssunzione: "",
      dataCessazione: "",
      codiceResponsabile: "",
      economics: "",
      src:""
    },
    usernameResponsabile: "",
    isLoading: false
  }

  componentDidMount = () => {
    if (!this.props.navBar) {
      this.props.dispatch(redirect(this.props.location))
    }
    console.log("DIPENDENTE-VIEW start")
    this.getImageProfile()
    this.readDipendenteById()
  }

  getImageProfile = async () => {
    await AxiosInstance({
      method: "get",
      url: `profile-image/read/${this.props.location.state.codicePersona}`,
    }).then((response) => {  
      this.setState({src:`data:image/jpg;base64,${response.data.data.image}`})
    }).catch((error) => {
      this.setState({src: "../images/default-profile-picture.png"})
    })
  }

  /**
   * metodo axios per la lettura del dipendente by codicePersona
   */
  readDipendenteById = async () => {
    this.setState({ isLoading: true })
    await AxiosInstance({
      method: "get",
      url: `dipendenti/read/${this.props.location.state.codicePersona}`,

    }).then((response) => {
      this.loadUtente(response);
    }).catch((error) => {
      console.log("Error into loadUtenti ", error)
      this.setState({ isLoading: false })
    })
  }
  loadUtente = (response) => {
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
    this.getUsernameResponsabile()
    this.setState({ isLoading: false })
  }

  /**
   * metodo per la lettura dello username del responsabile
   */
  getUsernameResponsabile = () => {
    AxiosInstance({
      method: "get",
      url: `dipendenti/read/${this.state.personale.codiceResponsabile}`
    }).then((response) => {
      this.loadUsernameResponsabile(response.data.data);
    }).catch((error) => {
      console.log("Error into loadUtenti ", error)
      this.setState({ isLoading: false })
    })
  }
  loadUsernameResponsabile = (response) => {
    this.setState({ usernameResponsabile: response.utente.username })
  }


  /**
   * metodo per la stesura dei dati nell'accordion di visualizzazione
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
          <React.Fragment>
            {this.props.user ?
              <div>
                <WelcomeHeader
                  img={this.state.src}
                  name={this.state.utente.nome + " " + this.state.utente.cognome}
                  admin={"Dipendente"}
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
                  <Accordion disabled={authorizationControl(this.props.user.scope)}>
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
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                    >
                      <Typography></Typography>
                    </AccordionSummary>
                    <AccordionDetails className='accordionDetails'>
                      <DownloadCurriculumButton
                        codicePersona={this.props.location.state.codicePersona}
                        username={this.state.utente.username}
                      />
                      <Link to={{
                        pathname: "/anagrafica-dipendenti",
                        state: {
                          update: true,
                          user: this.state
                        }
                      }} onClick={() => { this.props.dispatch(link()) }}>
                        <button className="button-update" title='modifica dipendente'
                          type="button" >
                          <img className="menu" src="./images/update.png"></img>
                        </button>
                      </Link>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
              : <Redirect to={{ pathname: "/" }} />}
          </React.Fragment>
        }
      </React.Fragment>
    )
  };
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

export default withRouter(connect(mapStateToProps)(DipendenteView));