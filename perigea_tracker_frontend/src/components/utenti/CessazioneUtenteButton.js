import * as React from 'react';
import AxiosInstance from '../../axios/AxiosInstance';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import BlockIcon from '@mui/icons-material/Block';
import Alert from '@mui/material/Alert'
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';



export default function CessazioneUtenteButton(props) {
    const [cessazioneDialog, setCessazioneDialog] = React.useState(false)
    

    const updateUserStatus = async (codicePersona, status) => {
        await AxiosInstance({
            method: "put",
            url: `${props.tipo}/cessazione/${codicePersona}`
        }).then((response) => {
            alert("Status dell'utente aggiornato")
            setCessazioneDialog(false)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <React.Fragment>

            <button title='cessazione utente'className='button-update' onClick={() => {setCessazioneDialog(true)}}>
                <BlockIcon style={{color: "black", width: "40px", height:"40px", marginLeft: "50%"}}></BlockIcon>
            </button>


            <Dialog open={cessazioneDialog} onClose={() => {setCessazioneDialog(false)}} className="password-dialog" >
                <DialogTitle className="title">Cessazione Utente</DialogTitle>
                <DialogContent className="content" >
                <Alert severity="warning">Confermando si cambierà lo stato di attività del seguente utente da ATTIVO a CESSATO. Sicuro di voler proseguire?</Alert>
                </DialogContent>
                <DialogActions className="actions">
                    <Button className="dialog-button" title="annulla" onClick={() => { setCessazioneDialog(false) }}><img className="cancel" src="./images/annulla.png"></img></Button>
                    <Button className="dialog-button" title="salva" onClick={() => { updateUserStatus(props.codicePersona) }}><img className="confirm" src="./images/conferma.png"></img></Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}