//pagina  di login


import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import AxiosInstance from '../../axios/AxiosInstance';
import Button from 'react-bootstrap/esm/Button';
import { connect } from 'react-redux';
import axios from 'axios';
import { login } from '../../redux/Actions'

function LoginPage(props) {

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [redirect, setRedirect] = useState(false)




  const handleLogin = () => {
    console.log(credentials)
    const { dispatch, history } = props
    dispatch(login(credentials.username[0], credentials.password[0]))
      .then(() => {
        setRedirect(true)
      }).catch(() => {
        console.log("BAD CREDENTIALS")
      })
  }

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: [event.target.value] })
  }




  return (
    <div className="div-login" style={{ backgroundImage: `url("./images/SfondoLogin.jpg")` }}>
      <img className="logo-login" src="./images/scrittaPerigea.png" />
      <div class="form-box">

        <form id="login" className="input-group" >
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
          <Link to="/" className="recupero-credenziali">Recupero credenziali</Link>
          <br /><br />

          <button type="button"
            className="submit-button"
            onClick={handleLogin}
            style={{ textDecoration: "none", borderRadius: "6px" }}
          >
            Login
          </button>

        </form>
      </div>
      
      {redirect && <Redirect to={{ pathname: "/home" }} />}

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    stato: state
  }
}

export default connect(mapStateToProps)(LoginPage);