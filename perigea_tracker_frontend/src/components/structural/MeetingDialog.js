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
import { reminderTime } from '../enum/CalendarEnums';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Checkbox from 'material-ui/Checkbox';
import { MenuItem } from '@mui/material';


export default function MeetingDialog(props) {
    const [meeting, setMeeting] = React.useState({
        reminderTime: "",
        startDate: "",
        endDate: "",
        inPerson: false,
        meetingRoom: false,
        description: "",
        link: ""       
    })
    const [selectedFile, setSelectedFile] = React.useState("")


    const handleFileUpload = (e) => {
        console.log(e)
        setSelectedFile(e.target.files[0])

    }

    const handleChange = (e) => {
        setMeeting({ ...meeting, [e.target.name]: e.target.value })
    }

   
  

    const createMeeting = async () => {
        console.log(meeting)
        const json = JSON.stringify(meeting)
        const blob = new Blob([json], {type: 'application/json'})
        const formData = new FormData();
        formData.append('event', blob)
        formData.append('file', selectedFile);        
        await AxiosInstance({
            method: 'post',
            url: `/gruppi/create-meeting-by-group/${props.groupId}/${props.creator}`,
            data: formData,
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then((response) => {
            alert("meeting creato con successo")
            props.handleClose()
        }).catch((error) => {
            console.log("errore nella creazione del meeting")
        })
    }

    return (
        <React.Fragment>

            <Dialog open={props.open} onClose={props.handleClose} className="password-dialog" >
                <DialogTitle className="title">Creazione Meeting</DialogTitle>
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
                                            style={{ width: "75%", paddingBottom: "2%", paddingTop: "2%", marginLeft: "13%" }}
                                            label="Data di Inizio"
                                            name='startDate'
                                            type='datetime-local'
                                            value={meeting.startDate}
                                            onChange={handleChange}
                                        ></TextField>
                                        <TextField
                                            style={{ width: "75%", paddingBottom: "2%", paddingTop: "2%", marginLeft: "13%" }}
                                            label="Data di Fine"
                                            name='endDate'
                                            value={meeting.endDate}
                                            type='datetime-local'
                                            onChange={handleChange}
                                        ></TextField>
                                        <TextField
                                            style={{ width: "75%", paddingBottom: "2%", paddingTop: "2%", marginLeft: "13%" }}
                                            label="Descrizione"
                                            name='description'
                                            value={meeting.description}
                                            onChange={handleChange}
                                        ></TextField>
                                        <TextField
                                            style={{ width: "75%", paddingBottom: "2%", paddingTop: "2%", marginLeft: "13%" }}
                                            label="Link riunione"
                                            name='link'
                                            value={meeting.link}
                                            onChange={handleChange}
                                        ></TextField>
                                    </Form.Row>
                                    <Form.Row className='infoForm'>
                                        <TextField
                                            style={{ width: "75%", paddingBottom: "2%", paddingTop: "2%", marginLeft: "13%" }}
                                            id="select stato"
                                            select
                                            name='reminderTime'
                                            label="reminder Time"
                                            value={meeting.reminderTime}
                                            onChange={handleChange}
                                        >
                                            {reminderTime.map((option) => (
                                                <MenuItem value={option.value} >
                                                    {option.value}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Form.Row>
                                </Form>
                                <FormControl component="fieldset" variant="standard">
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Switch checked={meeting.inPerson} onChange={(e) => { setMeeting({ ...meeting, [e.target.name]: e.target.checked }) }} name="inPerson" inputProps={{ 'aria-label': 'controlled' }} />
                                            }
                                            label="In Presenza"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Switch checked={meeting.meetingRoom} onChange={(e) => { setMeeting({ ...meeting, [e.target.name]: e.target.checked }) }} name="meetingRoom" inputProps={{ 'aria-label': 'controlled' }} />
                                            }
                                            label="Sala Riunioni"
                                        />
                                    </FormGroup>
                                </FormControl>
                                <input
                                    className="fileInput"
                                    onChange={handleFileUpload}
                                    type="file"
                                    style={
                                        {
                                            width: "90%",
                                            marginLeft: "3%",
                                            marginTop: "3%"
                                        }}
                                />
                            </Grid>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions className="actions">
                    <Button className="dialog-button" title="annulla" onClick={props.handleClose}><img className="cancel" src="./images/annulla.png"></img></Button>
                    <Button className="dialog-button" title="salva" onClick={createMeeting} ><img className="confirm" src="./images/save.png"></img></Button>
                </DialogActions>
            </Dialog>



        </React.Fragment>
    )
}