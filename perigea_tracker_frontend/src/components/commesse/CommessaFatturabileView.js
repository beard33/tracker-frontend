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


export default class CommessaFatturabileView extends React.Component {
    state = {
        commessaFatturabile: ""
    }

    componentDidMount = () => {
        console.log("componentDidMount start")
        AxiosInstance({
            method: "get",
            url: `commesse/read-commessa-fatturabile/${this.props.location.codiceCommessa}`
        }).then((response) => {
            this.loadCommessa(response);
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }

    loadCommessa = (response) => {
        console.log(response.data.data)
        this.setState({
            commessaFatturabile: response.data.data
        })
        console.log(this.state.commessaFatturabile.commessa.codiceCommessa)
    }

    getDatiCommessa = (e) => {
        if (e) {
            return Object.keys(e).map((key) => {
                if (key === "commessa" ||
                    key === "dataInizioCommessa" ||
                    key === "dataFineCommessa" ||
                    key === "descrizioneCommessaCliente" ||
                    key === "responsabileCommerciale" ||
                    key === "tipoCommessaFatturabile"
                ) {
                    if (key === "commessa") {
                        return Object.keys(e[key]).map((item) => {
                            return (
                                <TextField
                                    label={item}
                                    value={(e[key])[item]}
                                ></TextField>
                            )
                        })
                    } else {
                        return (
                            <TextField
                                label={key}
                                value={e[key]}
                            ></TextField>
                        )
                    }
                }
            })
        };
    }

    getDatiNumerici = (e) => {
        if (e) {
            return Object.keys(e).map((key) => {
                if (key !== "commessa" &&
                    key !== "dataInizioCommessa" &&
                    key !== "dataFineCommessa" &&
                    key !== "descrizioneCommessaCliente" &&
                    key !== "responsabileCommerciale" &&
                    key !== "tipoCommessaFatturabile"
                ) {
                    return (
                        <TextField
                            label={key}
                            value={e[key]}
                        ></TextField>
                    )
                }
            })
        };
    }

    render() {
        return (
            <React.Fragment>
                <Title></Title>
                <div>
                    <WelcomeHeader
                        img="../images/comm-fatt.png"
                        name={""}
                        admin={"Commessa"}
                        userEmail={"Fatturabile"}
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
                                <Typography>Dati Commessa</Typography>
                            </AccordionSummary>
                            <AccordionDetails className='accordionDetails'>
                                {this.getDatiCommessa(this.state.commessaFatturabile)}
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                className='accordionSummary'
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Dati Numerici</Typography>
                            </AccordionSummary>
                            <AccordionDetails className='accordionDetails'>
                                {this.getDatiNumerici(this.state.commessaFatturabile)}
                            </AccordionDetails>
                        </Accordion>


                    </div>


                </div>
            </React.Fragment>
        )
    }

}