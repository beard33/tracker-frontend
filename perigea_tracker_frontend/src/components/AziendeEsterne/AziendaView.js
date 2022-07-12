import * as React from 'react';
import AxiosInstance from '../../axios/AxiosInstance';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WelcomeHeader from '../structural/WelcomeHeader';
import TextField from '@material-ui/core/TextField';
import { Link, withRouter } from 'react-router-dom';
import CommesseGrid from '../commesse/CommesseGrid'
import { redirect, link } from '../../redux/Actions';
import { authorizationControl } from '../utils/Utils';
import LoadingSpinner from '../structural/LoadingSpinner';
import { connect } from 'react-redux';


let type;

class AziendaView extends React.Component {
    state = {
        azienda: "",
        isLoading: false
    }

    componentDidMount = () => {
        if (!this.props.navBar) {
            this.props.dispatch(redirect(this.props.location))
        }
        console.log("AZIENDA-VIEW start")
        type = this.checkAziendaType()
        this.readAziendaById()
    }


    /**
     * lettura dell'azienda by codice azienda
     */
    readAziendaById = async () => {
        this.setState({ isLoading: true })
        await AxiosInstance({
            method: "get",
            url: `${this.props.location.state.tipo}/read-by-id/${this.props.location.state.codiceAzienda}`
        }).then((response) => {
            this.loadAzienda(response);
        }).catch((error) => {
            this.setState({ isLoading: false })
            console.log("Error into loadAzienda ", error)
        })
    }


    /**
     * metodo di memorizzazione della risposta della chiamata axios
     * @param {*} response 
     */
    loadAzienda = (response) => {
        this.setState({
            azienda: response.data.data,
            isLoading: false
        })
    }


    /**
     * metodo per il popolamento dei dati nell'accordion 
     * @param {*} e 
     * @returns 
     */
    getData = (e) => {
        if (e) {
            return Object.keys(e).map((key) => {
                if (
                    key !== "createTimestamp" &&
                    key !== "createUser" &&
                    key !== "lastUpdateTimestamp" &&
                    key !== "lastUpdateUser") {
                    return (
                        <TextField
                            label={key}
                            value={e[key]}
                        ></TextField>
                    )
                }
            });
        };
    }


    /**
     * controllo del tipo di azienda (cliente/fornitore)
     * @returns 
     */
    checkAziendaType = () => {
        let tipo;
        switch (this.props.location.state.tipo) {
            case "clienti":
                tipo = "Cliente"
                break;
            case "fornitori":
                tipo = "Fornitore"
                break;
        }
        return tipo;
    }



    render() {
        return (
            <React.Fragment>

                {this.state.isLoading ? <LoadingSpinner /> :
                    <div>

                        <WelcomeHeader
                            img="../images/company.png"
                            name={this.state.azienda.ragioneSociale}
                            admin={type}
                            userEmail={this.state.azienda.partitaIva}
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
                                    <Typography className='accordion-text'>Dati Azienda</Typography>
                                </AccordionSummary>
                                <AccordionDetails className='accordionDetails'>
                                    {this.getData(this.state.azienda)}
                                </AccordionDetails>
                            </Accordion>
                            {type === "Cliente" &&
                                <Accordion>
                                    <AccordionSummary
                                        className='accordionSummary'
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className='accordion-text'>Commesse Relative</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className='accordionDetails'>
                                        <CommesseGrid
                                            cliente={true}
                                            codiceAzienda={this.props.location.state.codiceAzienda}
                                        />
                                    </AccordionDetails>
                                </Accordion>
                            }
                            <Accordion expanded >
                                <AccordionSummary
                                    aria-controls="panel3a-content"
                                    id="panel3a-header"
                                >
                                    <Typography></Typography>
                                </AccordionSummary>
                                <AccordionDetails className='accordionDetails'>
                                    <Link to={{
                                        pathname: `add-${this.props.location.state.tipo}`,
                                        state: {
                                            update: true,
                                            azienda: this.state
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
                }
            </React.Fragment >
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

export default withRouter(connect(mapStateToProps)(AziendaView));