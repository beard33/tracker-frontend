import * as React from 'react';
import AxiosInstance from '../../axios/AxiosInstance';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WelcomeHeader from '../structural/WelcomeHeader';
import TextField from '@material-ui/core/TextField';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { redirect, link } from '../../redux/Actions';
import Title from '../structural/Title';
import RuoliTable from './RuoliTable';
import UtentiGrid from './UtentiGrid';
import LoadingSpinner from '../structural/LoadingSpinner';
import { authorizationControl } from '../utils/Utils';
import { connect } from 'react-redux';




function GruppoView(props) {
    const [gruppo, setGruppo] = React.useState({
        id: "",
        nome: "",
        descrizione: "",
        user: []
    })
    const [isLoading, setIsLoading] = React.useState(false)
    const [sync, setSync] = React.useState(true)


    React.useEffect(() => {
        if (!props.navBar) {
            props.dispatch(redirect(props.location))
        }
        readGruppobyId()
    }, [])


    // React.useEffect(() => {
    //     readGruppobyId()
    // }, [sync])


    const readGruppobyId = async () => {
        setIsLoading(true)
        await AxiosInstance({
            method: "get",
            url: `gruppi/read/${props.location.state.gruppo.id}`,
        }).then((response) => {
            loadGruppo(response);
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
            setIsLoading(false)
        })
    }
    const loadGruppo = (response) => {
        setGruppo({
            id: response.data.data.id,
            nome: response.data.data.nome,
            descrizione: response.data.data.descrizione,
            utenti: response.data.data.contatti
        })
        setIsLoading(false)
    }

    return (
        <React.Fragment>
            <Title></Title>
            {isLoading ? <LoadingSpinner /> :
                <React.Fragment>
                    {
                        props.user ?
                            <div>
                                <WelcomeHeader
                                    img={"../images/gruppo.png"}
                                    name={""}
                                    admin={"Team"}
                                    userEmail={gruppo.nome}
                                    db={true}
                                />

                                <UtentiGrid gruppo={true} utenti={gruppo.utenti}/> 

                            </div>
                            : <Redirect to="/" />
                    }
                </React.Fragment>
            }
        </React.Fragment>
    )

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

export default withRouter(connect(mapStateToProps)(GruppoView));