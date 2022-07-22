import { white } from 'material-ui/styles/colors';
import React from 'react';
import { Link } from 'react-router-dom';
import AxiosInstance from '../../axios/AxiosInstance';
import { link } from '../../redux/Actions';
import { withRouter } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


function Sidebar(props) {
  const [src, setSrc] = React.useState("")

  React.useEffect(() => {
    getImageProfile(props.user.codicePersona)
  }, [])

  const handleClick = () => {
    props.dispatch(link())
    props.onMenuToggle()
  }

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

  return (

    <React.Fragment>
      {props.user ?
        <div className={`sidebar-menu${props.isMenuOpen === true ? ' open' : ''}`}   >
          <div className="pro-menu" >
            <ProSidebar >
              <Menu>
                <div className="img-profile-div" >
                  <img className="img-profile" src={src} alt="user"></img>
                  <h5 style={{ color: white }}>{props.user.name + " " + props.user.lastname}</h5>
                </div>
                <MenuItem><Link to="/home" onClick={handleClick}>Home</Link></MenuItem>

                {(props.user.scope.includes("ROLE_MANAGEMENT") ||
                  props.user.scope.includes("ROLE_AMMINISTRAZIONE") ||
                  props.user.scope.includes("ROLE_SALES")) ?
                  <React.Fragment>
                    <SubMenu title="Aziende">
                      <MenuItem><Link to="/fornitori" onClick={handleClick}> Fornitori</Link></MenuItem>
                      <MenuItem><Link to="/clienti" onClick={handleClick}> Clienti</Link></MenuItem>
                    </SubMenu>
                  </React.Fragment> :
                  <div></div>
                }

                <SubMenu title="Utenti">
                  <MenuItem><Link to="/dipendenti" onClick={handleClick}> Dipendenti</Link></MenuItem>
                  <MenuItem><Link to="/consulenti" onClick={handleClick}> Consulenti</Link></MenuItem>
                  <MenuItem><Link to="gruppi-grid" onClick={handleClick}> Gruppi</Link></MenuItem>
                </SubMenu>

                {(props.user.scope.includes("ROLE_MANAGEMENT") ||
                  props.user.scope.includes("ROLE_AMMINISTRAZIONE") ||
                  props.user.scope.includes("ROLE_HR") || props.user.scope.includes("ROLE_SALES")) ?
                  <React.Fragment>
                    <SubMenu title="Commesse" onClick={handleClick}>
                      <MenuItem><Link to="/commesse" onClick={handleClick}> Commesse</Link></MenuItem>
                    </SubMenu>
                  </React.Fragment> :
                  <div></div>
                }

                <SubMenu title="Timesheet">
                  <MenuItem>
                    <Link to={{
                      pathname: "/timesheet-view",
                      state: {
                        responsabile: false,
                        codicePersona: props.user.codicePersona,
                        username: props.user.username,
                        anno: new Date().getFullYear(),
                        mese: new Date().getMonth()
                      }
                    }} onClick={handleClick}>
                      Timesheet
                    </Link>
                  </MenuItem>
                  {props.user.scope.includes("ROLE_REFERENTE") ?
                    <MenuItem>
                      <Link to={{
                        pathname: "/timesheet-grid",
                        state: "referente"
                      }} onClick={handleClick}>
                        Timesheet Sottoposti
                      </Link>
                    </MenuItem> :
                    <div></div>
                  }
                  {(props.user.scope.includes("ROLE_MANAGEMENT") ||
                    props.user.scope.includes("ROLE_AMMINISTRAZIONE") ||
                    props.user.scope.includes("ROLE_HR")) ?
                    <MenuItem>
                      <Link to={{
                        pathname: "/timesheet-grid",
                        state: "admin"
                      }} onClick={handleClick}>
                        Timesheet Dipendenti
                      </Link>
                    </MenuItem> :
                    <div></div>
                  }

                </SubMenu>


              </Menu>
            </ProSidebar>
          </div>
        </div>
        : <Redirect to={{ pathname: "/" }} />}
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

export default withRouter(connect(mapStateToProps)(Sidebar));