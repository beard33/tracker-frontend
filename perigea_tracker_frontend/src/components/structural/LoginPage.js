//pagina  di login

import { margin } from '@mui/system';
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
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({username: event.target.username});
    this.setState({password: event.target.username});
  }

  handleSubmit(event) {
    console.log('E\' stato inserito ' + this.state.username);
    event.preventDefault();
  }
   
  render() {
    console.log("LOGINPAGE ENTRY");
    return (
      <div className="div-login" style={{backgroundImage:`url("./images/SfondoLogin.jpg")`}}>
        <img className="logo-login" src="./images/scrittaPerigea.png"/>
        <form className="box-login" onSubmit={this.handleSubmit} >
          <br/><br/>
          <input 
            type="text" 
            value={this.state.username} 
            name="username" 
            placeholder="Username" 
            onChange={this.handleChange}
            className="username-input"
          />
          <br/><br/>
          <input 
            type="password" 
            value={this.state.password} 
            name="password" 
            placeholder="Password" 
            onChange={this.handleChange}
            className="password-input"
          />
          <br/><br/>    
          <div className="div-sub-login">            
            <Link to="/home" className="link-login" onSubmit={this.handleSubmit}>LOGIN</Link>   
            <br/><br/> 
            <Link to="/" className="recupero-credenziali">Recupero credenziali</Link>   
          </div>               
        </form>
      </div>
    )
  }     
}