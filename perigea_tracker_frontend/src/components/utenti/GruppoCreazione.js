import * as React from 'react';
import AxiosInstance from '../../axios/AxiosInstance';
import Form from "react-bootstrap/Form";
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import UtentiGruppoTable from './UtentiGruppoTable';
import { MenuItem } from '@mui/material';


export default function GruppoCreazione(props) {

    const [gruppo, setGruppo] = React.useState({
        id: 0,
        nome: "",
        descrizione: "",
        users: []
    })
    const [user, setUser] = React.useState("")
    const [utenti, setUtenti] = React.useState([])
    

    React.useEffect(() => {
        getUtenti()
    }, []);


    /**
    * metodi per la lettura e memorizzazione di tutti gli utenti
    */
    const getUtenti = async () => {
        await AxiosInstance({
            url: "utente/read-all-utenti"
        }).then((response) => {
            loadUtenti(response);
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
    }
    const loadUtenti = (arg) => {
        console.log(arg)
        // Object.values(arg.data.data).map((element) => {
        //     result.push({
        //         codicePersona: element.codicePersona,
        //         mailAziendale: element.mailAziendale,
        //         username: element.username
        //     })
        // });
        setUtenti(arg.data.data)

    }

 

    const handleChange = (e) => {
        setGruppo({ ...gruppo, [e.target.name]: e.target.value })
    }

    const handleSelect = (e) => {
        console.log(e.target.value)
        setUser(e.target.value)
    }

    const addUtente = (e) => {
        console.log(JSON.parse(user))
        setGruppo({ ...gruppo, users: gruppo.users.concat(JSON.parse(user)) })

    }

    const createGruppo = async () => {
        await AxiosInstance({
            method: 'post',
            url: "gruppi/create",
            data: {
                id: gruppo.id,
                nome: gruppo.nome,
                descrizione: gruppo.descrizione,
                contatti: gruppo.users
            }
        }).then(() => {
            props.handleClose()
            alert("Salvataggio del gruppo effettuato con successo")
            console.log("Salvataggio del gruppo effettuato con successo")
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
            alert("erroree nella creazione")
        })
    }

    const removeUser = (id) => {
        setGruppo({ ...gruppo, users: gruppo.users.filter((el) => el.username !== id) })
    }

    return (
        <React.Fragment>
            <Dialog open={props.open} onClose={props.handleClose} className="password-dialog" >
                <DialogTitle className="title">Creazione Gruppo</DialogTitle>
                <DialogContent className="content" >
                    <div className="fields" >
                        <div className="info">
                            <Grid className="infoGrid"
                                container
                                spacing={20}
                            >
                                <Form style={{ width: "100%" }}>
                                    <Form.Row className="infoForm">
                                        <TextField
                                            style={{ width: "75%", paddingBottom: "2%", marginLeft: "13%" }}
                                            label="Id"
                                            name='id'
                                            value={gruppo.id}
                                            onChange={handleChange}
                                        ></TextField>
                                        <TextField
                                            style={{ width: "75%", paddingBottom: "2%",  marginLeft: "13%" }}
                                            label="Nome Gruppo"
                                            name='nome'
                                            value={gruppo.nome}
                                            onChange={handleChange}
                                        ></TextField>
                                        <TextField
                                            style={{ width: "75%", paddingBottom: "2%",  marginLeft: "13%" }}
                                            label="Descrizione"
                                            name='descrizione'
                                            value={gruppo.descrizione}
                                            onChange={handleChange}
                                        ></TextField>
                                    </Form.Row>
                                    <Form.Row className='infoForm'>
                                        <TextField
                                            style={{ width: "75%", paddingBottom: "2%",  marginLeft: "13%" }}
                                            id="select stato"
                                            select
                                            name='codicePersona'
                                            label="utente"
                                            value={user}
                                            onChange={handleSelect}
                                        >
                                            {utenti.map((option) => (
                                                <MenuItem value={(JSON.stringify(option))} >
                                                    {option.username}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <Button className='add-button'
                                            onClick={addUtente}
                                            title="add Utente"
                                            style={{ marginLeft: "-1%", marginTop: "3%" }}>
                                            <img className="menu" src="./images/add.png"></img>
                                        </Button>
                                    </Form.Row>
                                    <UtentiGruppoTable utenti={gruppo.users} removeUser={removeUser} />
                                </Form>
                            </Grid>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions className="actions">
                    <Button className="dialog-button" title="annulla" onClick={props.handleClose}><img className="cancel" src="./images/annulla.png"></img></Button>
                    <Button className="dialog-button" title="salva" onClick={createGruppo}><img className="confirm" src="./images/save.png"></img></Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )


}

