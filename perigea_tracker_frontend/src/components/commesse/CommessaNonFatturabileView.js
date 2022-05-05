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

        AxiosInstance({
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

    getData = (e) => {
        if (e) {
            return Object.keys(e).map((key) => {
                if (key === "commessa") {
                    return Object.keys(e[key]).map((item) => {
                        return (
                            <TextField
                                label={item}
                                value={(e[key])[item]}
                            ></TextField>
                        )
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
                                <Typography>Dati Commessa</Typography>
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