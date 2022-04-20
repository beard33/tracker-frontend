import * as React from 'react';
import AxiosInstance from '../../axios/AxiosInstance';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WelcomeHeader from '../structural/WelcomeHeader';
import TextField from '@material-ui/core/TextField';

let type = "";
export default class AziendaView extends React.Component {
    state = {
        azienda: ""
    }

    componentDidMount = () => {
        console.log("componentDidMount start")
        type = this.checkPropsType()
        AxiosInstance({
            method: "get",
            url: `${this.props.location.aziendaProps.tipo}/read-by-id/${this.props.location.aziendaProps.codiceAzienda}`
        }).then((response) => {
            this.loadAzienda(response);
        }).catch((error) => {
            console.log("Error into loadAzienda ", error)
        })
    }

    loadAzienda = (response) => {
        console.log(response)
        this.setState({
            azienda: response.data.data
        })
        console.log(this.state)
    }

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

    checkPropsType = () => {
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

            <div>
                
                <WelcomeHeader
                    img="../images/company.png"
                    name={this.state.azienda.ragioneSociale}
                    admin={type}
                    userEmail={this.state.azienda.partitaIva}
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
                            <Typography>Dati Azienda</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='accordionDetails'>
                            {this.getData(this.state.azienda)}
                        </AccordionDetails>
                    </Accordion>


                </div>
            </div>
        )
    };
}