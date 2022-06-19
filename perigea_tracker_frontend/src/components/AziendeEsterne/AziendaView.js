import * as React from 'react';
import AxiosInstance from '../../axios/AxiosInstance';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WelcomeHeader from '../structural/WelcomeHeader';
import TextField from '@material-ui/core/TextField';
import Title from '../structural/Title';
import { Link } from 'react-router-dom';
import { Button, Form, Row, Container } from 'react-bootstrap';
import CommesseGrid from '../commesse/CommesseGrid'

let type;

export default class AziendaView extends React.Component {
    state = {
        azienda: ""
    }

    componentDidMount = () => {
        console.log("componentDidMount start")
        type = this.checkAziendaType()
        this.readAziendaById()
    }


    /**
     * lettura dell'azienda by codice azienda
     */
    readAziendaById = async () => {
        await AxiosInstance({
            method: "get",
            url: `${this.props.location.aziendaProps.tipo}/read-by-id/${this.props.location.aziendaProps.codiceAzienda}`
        }).then((response) => {
            this.loadAzienda(response);
        }).catch((error) => {
            console.log("Error into loadAzienda ", error)
        })
    }


    /**
     * metodo di memorizzazione della risposta della chiamata axios
     * @param {*} response 
     */
    loadAzienda = (response) => {
        console.log(response)
        this.setState({
            azienda: response.data.data
        })
        console.log(this.state)
    }


    /**
     * metodo per il popolamento dei dati nell'accordion 
     * @param {*} e 
     * @returns 
     */
    getData = (e) => {
        if (e) {
            return Object.keys(e).map((key) => {
                return (
                    <TextField
                        label={key}
                        value={e[key]}
                    ></TextField>
                )
            });
        };
    }


    /**
     * controllo del tipo di azienda (cliente/fornitore)
     * @returns 
     */
    checkAziendaType = () => {
        let tipo;
        console.log(this.props.location.aziendaProps.tipo)
        switch (this.props.location.aziendaProps.tipo) {
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
                                        codiceAzienda={this.props.location.aziendaProps.codiceAzienda}
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
                                    pathname: `add-${this.props.location.aziendaProps.tipo}`,
                                    state: {
                                        update: true,
                                        azienda: this.state
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
            </React.Fragment >
        )
    };
}