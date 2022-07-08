//barra di navigazione superiore che cambia in base alla sidebar aperta o chiusa

import React from 'react';
import { Link, useHistory } from "react-router-dom";
import CollapseMenu from './CollapseMenu';
import { withRouter } from 'react-router-dom';
import HistoryArrows from './HistoryArrows';


function NavigationBar(props) {

  const history = useHistory()

  const goForward =  () => {
    history.goForward()
  }

  const goBack = () => {
    history.goBack()
  }

  return (
    <React.Fragment>
      {console.log(props.location, props.history)}
      <header className={`navigation-bar${props.isMenuOpen === true ? ' open' : ''}`} /*style={{backgroundImage:`url("./images/SfondoLogin.jpg")`}}*/ >

        <div className={`logo-sidebar${props.isMenuOpen === true ? ' open' : ''}`} >
          <HistoryArrows goBack={goBack} goForward={goForward} location={props.location}/>
          <a href="/home"><img className="img-logo" src={props.logo}></img></a>
        </div>

        <div className="navigation-bar-left" >
          <button type="button" className="sidebar-button" onClick={props.onMenuToggle}>
            <img className="menu" src="./images/menu-01.png"></img>
          </button>
          <Link to="/message"><img className="message" src={props.message}></img></Link>
          <Link to="/inbox"><img className="inbox" src={props.inbox6}></img></Link>
          <Link to="/grid2"><img className="grid2" src={props.grid}></img></Link>
        </div>

        <div className="navigation-bar-right">
          <Link to="/search"><img className="search" src={props.search}></img></Link>
          <Link to="/language"><img className="language" src={props.language}></img></Link>
          <button className='sidebar-button' onClick={props.onPersonalMenuToggle}><img className="img-profile2" src={props.profile2}></img></button>
        </div>

      </header>
    </React.Fragment>
  )
}

export default withRouter(NavigationBar)
