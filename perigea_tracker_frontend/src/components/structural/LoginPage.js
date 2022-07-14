//pagina  di login


import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import AxiosInstance from '../../axios/AxiosInstance';
import { login } from '../../redux/Actions'
import RecoverPasswordDialog from './RecoverPasswordDialog';
import LoadingSpinner from './LoadingSpinner';


function LoginPage(props) {

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [redirect, setRedirect] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [recoverDialogOpen, setRecoverDialogOpen] = useState(false)

     
  const handleClose = () => {
    setRecoverDialogOpen(false);
  };


  const handleLogin = () => {
    setIsLoading(true)
    console.log(credentials)
    const { dispatch, history } = props
    dispatch(login(credentials.username[0], credentials.password[0]))
      .then(() => {        
        setRedirect(true)
        setIsLoading(false)
      }).catch(() => {
        console.log("BAD CREDENTIALS")
        setIsLoading(false)
      })
  }

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: [event.target.value] })
  }

  const sendRecoverPasswordRequest = async () => {
    await AxiosInstance({
      method: "get",
      url: `utente/recover-password-request/${credentials.username}`
    }).then((response) => {
      setRecoverDialogOpen(true)
    }).catch((error) => {
      alert("inserisci prima lo username nell'apposito campo")
    })
  }




  return (
    <React.Fragment>      
      <div className="div-login" style={{ backgroundImage: `url("./images/SfondoLogin.jpg")` }}>
        <img className="logo-login" src="./images/scrittaPerigea.png" />
        <div class="form-box">

          <form id="login" className="input-group" >
            {isLoading ? <LoadingSpinner style={{ marginLeft: "25%" }}></LoadingSpinner> : <div>
              <input
                type="text"
                class="input-field"
                placeholder="Username"
                required
                name="username"
                value={credentials.username}
                onChange={handleChange}
              />
              <input
                type="password"
                class="input-field"
                placeholder="Password"
                required
                name="password"
                value={credentials.password}
                onChange={handleChange}
              />
              <Link onClick={sendRecoverPasswordRequest} to="/" className="recupero-credenziali">Recupero credenziali</Link>
              <br /><br />

              <button type="button"
                className="submit-button"
                onClick={handleLogin}
                style={{ textDecoration: "none", borderRadius: "6px" }}
              >
                Login
              </button>
            </div>
            }
          </form>
        </div>

        {redirect && <Redirect to={{ pathname: "/home" }} />}

      </div>
      
      <RecoverPasswordDialog username={credentials.username[0]} handleClose={handleClose} open={recoverDialogOpen} logged={false}/>

    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    stato: state
  }
}

export default connect(mapStateToProps)(LoginPage);