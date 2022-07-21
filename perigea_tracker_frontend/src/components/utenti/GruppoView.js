import * as React from 'react';
import AxiosInstance from '../../axios/AxiosInstance';
import WelcomeHeader from '../structural/WelcomeHeader';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import { redirect, link } from '../../redux/Actions';
import Title from '../structural/Title';
import EditIcon from '@mui/icons-material/Edit';
import UtentiGrid from './UtentiGrid';
import LoadingSpinner from '../structural/LoadingSpinner';
import GruppoCreazione from './GruppoCreazione';
import MeetingDialog from '../structural/MeetingDialog';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import GroupsIcon from '@mui/icons-material/Groups';





function GruppoView(props) {
    const [gruppo, setGruppo] = React.useState({
        id: "",
        nome: "",
        descrizione: "",
        utenti: []
    })
    const [isLoading, setIsLoading] = React.useState(false)
    const [sync, setSync] = React.useState(true)
    const [showModal, setShowModal] = React.useState(false)
    const [meetingDialogOpen, setMeetingDialogOpen] = React.useState(false)
    

    React.useEffect(() => {
        if (!props.navBar) {
            props.dispatch(redirect(props.location))
        }
        readGruppobyId()
    }, [])


    React.useEffect(() => {
        readGruppobyId()
    }, [sync])

    const handleClose = () => {
        setShowModal(false)
        setMeetingDialogOpen(false)
        setSync(!sync)
    }


    const readGruppobyId = async (id) => {
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

                                <div className='buttons-bar'>
                                    <Form>
                                        <Form.Row className="buttons-bar-form">
                                            <Button variant='light' title='update gruppo' className='update' onClick={() => { setShowModal(true) }}>
                                                <EditIcon className='img'></EditIcon>                                                
                                            </Button>
                                            <Button variant='light' title='crea meeting' className='update' onClick={() => {setMeetingDialogOpen(true)}}>
                                                <GroupsIcon className='img'></GroupsIcon>                                                
                                            </Button>
                                        </Form.Row>
                                    </Form>
                                </div>

                                <UtentiGrid gruppo={true} utenti={gruppo.utenti} />

                                <GruppoCreazione handleClose={handleClose} open={showModal} update={gruppo} />

                                <MeetingDialog handleClose={handleClose} open={meetingDialogOpen} groupId={gruppo.id} creator={props.user.codicePersona} />
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