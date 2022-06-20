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



export default class CommessaNonFatturabileView extends React.Component {
    state = {
        commessaNonFatturabile: ""
    }

    componentDidMount = () => {
        console.log("componentDidMount start")
        this.readCommessaNonFatturabile()
    }

    /**
     * metodi per la lettura della commessa non fatturabile
     */
    readCommessaNonFatturabile = async () => {
        await AxiosInstance({
            method: "get",
            url: `commesse/read-commessa-non-fatturabile/${this.props.location.codiceCommessa}`
        }).then((response) => {
            this.loadCommessa(response);
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }
    loadCommessa = (response) => {
        console.log(response)
        this.setState({
            commessaNonFatturabile: response.data.data
        })
        console.log(this.state.commessaNonFatturabile.commessa.codiceCommessa)
    }


    /**
     * metodo per la stesura dei dati nell'accordion di visualizzazione
     */
    getData = (e) => {
        if (e) {
            return Object.keys(e).map((key) => {
                if (key === "commessa") {

                    return Object.keys(e[key]).map((item) => {
                        if (item !== "createTimestamp" &&
                            item !== "createUser" &&
                            item !== "lastUpdateTimestamp" &&
                            item !== "lastUpdateUser") {
                            return (
                                <TextField
                                    style={{marginLeft: "2.5%", width: "30%"}}
                                    label={item}
                                    value={(e[key])[item]}
                                ></TextField>
                            )
                        }
                    })
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
                        img="../images/comm-noFatt.png"
                        name={""}
                        admin={"Commessa Non Fatturabile"}
                        userEmail={""}
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
                                <Typography className='accordion-text'>Dati Commessa</Typography>
                            </AccordionSummary>
                            <AccordionDetails className='accordionDetails'>
                                {this.getData(this.state.commessaNonFatturabile)}
                            </AccordionDetails>
                        </Accordion>


                    </div>
                </div>
            </React.Fragment>
        )
    }



}