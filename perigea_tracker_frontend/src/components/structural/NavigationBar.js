//barra di navigazione superiore che cambia in base alla sidebar aperta o chiusa

import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from "react-router-dom";
import CollapseMenu from './CollapseMenu';
import AxiosInstance from '../../axios/AxiosInstance';
import { withRouter } from 'react-router-dom'
import { goForward, goBack } from '../../redux/Actions';
import { link } from '../../redux/Actions';
import HistoryArrows from './HistoryArrows';
import { connect } from 'react-redux';



function NavigationBar(props) {
  const [location, setLocation] = useState("")
  const [arrowClick, setArrowClick] = useState(false)
  const [src, setSrc] = useState(false)

  useEffect(() => {
    getImageProfile(props.user.codicePersona)
  }, [])

  const getImageProfile = async (codicePersona) => {
    await AxiosInstance({
      method: "get",
      url: `profile-image/read/${codicePersona}`,
    }).then((response) => {
      setSrc(`data:image/jpg;base64,${response.data.data.image}`)
    }).catch((error) => {
      setSrc("../images/fotoProfiloGenerica.png")
    })
  }

  // const history = useHistory()

  const goforward = () => {
    props.dispatch(goForward())
    let historyItem = props.history.find((el => el.id === props.counter + 1))
    setLocation(historyItem.location)
    setArrowClick(true)
  }

  const goback = () => {
    props.dispatch(goBack())
    let historyItem = props.history.find((el => el.id === props.counter - 1))
    setLocation(historyItem.location)
    setArrowClick(true)
  }

  return (
    <React.Fragment>

      <header className={`navigation-bar${props.isMenuOpen === true ? ' open' : ''}`} /*style={{backgroundImage:`url("./images/SfondoLogin.jpg")`}}*/ >

        <div className={`logo-sidebar${props.isMenuOpen === true ? ' open' : ''}`} >
          {/* <HistoryArrows goBack={goback} goForward={goforward} history={props.history} counter={props.counter} /> */}
          <a href="/home" onClick={() => { props.dispatch(link()) }}><img className="img-logo" src={props.logo}></img></a>
        </div>

        <div className="navigation-bar-left" >
          <button type="button" className="sidebar-button" onClick={props.onMenuToggle}>
            <img className="menu" src="./images/menu-01.png"></img>
          </button>
          <Link to="/message" onClick={() => { props.dispatch(link()) }}><img className="message" src={props.message}></img></Link>
          <Link to="/inbox" onClick={() => { props.dispatch(link()) }}><img className="inbox" src={props.inbox6}></img></Link>
          <Link to="/grid2" onClick={() => { props.dispatch(link()) }}><img className="grid2" src={props.grid}></img></Link>
        </div>

        <div className="navigation-bar-right">
          <Link to="/search" onClick={() => { props.dispatch(link()) }}><img className="search" src={props.search}></img></Link>
          <Link to="/language" onClick={() => { props.dispatch(link()) }}><img className="language" src={props.language}></img></Link>
          <button className='sidebar-button' onClick={props.onPersonalMenuToggle}><img className="img-profile2" src={src}></img></button>
        </div>

      </header>
      {arrowClick && <Redirect to={{ pathname: location.pathname, state: location.state }} />}

    </React.Fragment>
  )
}



const mapStateToProps = (state) => {
 
  return {
    user: state.user,
    counter: state.counter,
    history: state.history,
    navBar: state.navBar
  }
}

export default withRouter(connect(mapStateToProps)(NavigationBar));

