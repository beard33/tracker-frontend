//pagina  di login


import React from 'react';
import { Link } from "react-router-dom";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      loginButton: false,
    }

  }

  handleChange = (event) => {
    this.setState({ username: event.target.username });
    this.setState({ password: event.target.username });
  }

  handleSubmit = (event) => {
    console.log('E\' stato inserito ' + this.state.username);
    event.preventDefault();
  }



  render() {
    console.log("LOGINPAGE ENTRY");
    return (
      <div className="div-login" style={{ backgroundImage: `url("./images/SfondoLogin.jpg")` }}>
        <img className="logo-login" src="./images/scrittaPerigea.png" />
        <div class="form-box">

          <form id="login" class="input-group" >
            <input
              type="text"
              class="input-field"
              placeholder="Username"
              required
              value={this.state.username}
              name="username"
              onChange={this.handleChange}
            />
            <input
              type="password"
              class="input-field"
              placeholder="Password"
              required
              value={this.state.password}
              name="password"
              onChange={this.handleChange}
            />
            <Link to="/" className="recupero-credenziali">Recupero credenziali</Link>
            <br /><br />
            <Link to="/home" style={{ textDecoration: "none" }} onSubmit={this.handleSubmit}>
              <button type="submit" class="submit-button">Login</button>
            </Link>
          </form>

        </div>

      </div>
    )
  }
}