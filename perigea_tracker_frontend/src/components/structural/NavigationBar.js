//barra di navigazione superiore che cambia in base alla sidebar aperta o chiusa

import React from 'react';
import { Link } from "react-router-dom";

const img = "./images/galaxy.jpg"

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { }
  }
  
  render() {
    return (
      <header className={`navigation-bar${this.props.isMenuOpen === true ? ' open' : ''}`} /*style={{backgroundImage:`url("./images/SfondoLogin.jpg")`}}*/ >
        
        

        <div className={`logo-sidebar${this.props.isMenuOpen === true ? ' open' : ''}`} >
          <a href="/home"><img className="img-logo" src={this.props.logo}></img></a>
        </div>       
          
        <div className="navigation-bar-left" >
          <button type="button" className="sidebar-button" onClick={this.props.onMenuToggle}>
            <img className="menu" src="./images/menu-01.png"></img>
          </button>
          <Link to="/message"><img className="message" src={this.props.message}></img></Link>
          <Link to="/inbox"><img className="inbox" src={this.props.inbox6}></img></Link>
          <Link to="/grid2"><img className="grid2" src={this.props.grid}></img></Link>
        </div> 

        <div className="navigation-bar-right">
          <Link to="/search"><img className="search" src={this.props.search}></img></Link>
          <Link to="/language"><img className="language" src={this.props.language}></img></Link>
          <Link to="/your-profile"><img className="img-profile2" src={this.props.profile2}></img></Link>
        </div> 

      </header>
    )
  }
}