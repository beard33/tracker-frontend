import React, { useState } from "react";
import AxiosInstance from "../../axios/AxiosInstance";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export default function RecoverPasswordDialog(props) {
  const [input, setInput] = useState({
    codice: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState({
    codice: '',
    password: '',
    confirmPassword: ''
  })

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
  }


  const validateInput = (e) => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };
      switch (name) {
        case "confirmPassword":
          if (input.password && value !== input.password) {
            stateObj[name] = "Le due password non coincidono.";
          }
          break;
        default:
          break;
      }
      return stateObj;
    });
  }


  const updatePassword = async () => {
    console.log(props.username, input.password)
    await AxiosInstance({
      method: 'put',
      url: `utente/update-user-password/${input.codice}`,
      params: {
        username: props.username,
        password: input.password
      }
    }).then(() => {
      alert("Update della password effettuato con successo")
    }).catch((error) => {
      console.log("Error into loadUtenti ", error)
      alert("codice inserito errato o scaduto")
    })
  }

  const updatePasswordwithOld = async () => {
    console.log(props.username, input.password)
    await AxiosInstance({
      method: 'put',
      url: `utente/update-user-password-with-old`,
      params: {
        username: props.username,
        oldPassword: input.codice,
        newPassword: input.password
      }
    }).then(() => {
      alert("Update della password effettuato con successo")
    }).catch((error) => {
      console.log("Error into loadUtenti ", error)
      alert("quella inserita non corrisponde alla vecchia password")
    })
  }



  const onConfirmClick = () => {
    if (!props.logged) {
      updatePassword()
    } else {
      updatePasswordwithOld()
    }
    setInput({
      codice: '',
      password: '',
      confirmPassword: ''
    })
    props.handleClose()
  }

  return (
    <React.Fragment>
      <div>
        <Dialog open={props.open} onClose={props.handleClose} className="password-dialog" style={{ backgroundImage: `url("./images/SfondoLogin.jpg")` }}>
          <DialogTitle className="title">Modifica della Password</DialogTitle>
          <DialogContent className="content">
            <DialogContentText className="content-text">
              {!props.logged ?
                "Ti è stata mandata una mail con il codice da inserire di seguito" :
                "Inserisci la vecchia password e quella nuova"}
            </DialogContentText >
            <TextField className="text-fields"
              autoFocus
              margin="dense"
              id="name"
              label={!props.logged ? "Control Code" : "Old Password"}
              type="text"
              value={input.codice}
              onChange={onInputChange}
              // fullWidth
              required
              variant="standard"
              name="codice"
              onBlur={validateInput}>
            </TextField>

            <TextField className="text-fields"
              autoFocus
              margin="dense"
              id="name"
              // fullWidth
              label="Password"
              type="password"
              value={input.password}
              onChange={onInputChange}
              required
              variant="standard"
              name="password"
              onBlur={validateInput}>
            </TextField>

            <TextField className="text-fields"
              autoFocus
              margin="dense"
              id="name"
              label="Conferma Password"
              type="password"
              required
              value={input.confirmPassword}
              onChange={onInputChange}
              // fullWidth
              variant="standard"
              name="confirmPassword"
              onBlur={validateInput}>
            </TextField>
            {error.confirmPassword && <span className='err'>{error.confirmPassword} <img className="err-img" src="./images/error.png"></img> </span>}
            {!error.confirmPassword && input.confirmPassword && <span className='err'><img className="correct-img" src="./images/correct.png"></img></span>}

          </DialogContent>
          <DialogActions className="actions">
            <Button className="dialog-button" title="annulla" onClick={props.handleClose}><img className="cancel" src="./images/annulla.png"></img></Button>
            <Button className="dialog-button" title="conferma" onClick={onConfirmClick}><img className="confirm" src="./images/conferma.png"></img></Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  );
}