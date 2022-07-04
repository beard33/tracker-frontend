import { white } from 'material-ui/styles/colors';
import React from 'react';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { connect } from 'react-redux';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (

      <div className={`sidebar-menu${this.props.isMenuOpen === true ? ' open' : ''}`}   >
        <div className="pro-menu" >
          <ProSidebar >
            <Menu>
              <div className="img-profile-div" >
                <img className="img-profile" src="./images/fotoProfiloGenerica.png" alt="user"></img>
                <h5 style={{ color: white }}>Mario Rossi</h5>
              </div>
              <MenuItem><a href="/home">Home</a></MenuItem>


              <SubMenu title="Aziende">
                <MenuItem><a href="/fornitori"> Fornitori</a></MenuItem>
                <MenuItem><a href="/clienti"> Clienti</a></MenuItem>
              </SubMenu>

              <SubMenu title="Utenti">
                <MenuItem><a href="/dipendenti"> Dipendenti</a></MenuItem>
                <MenuItem><a href="/consulenti"> Consulenti</a></MenuItem>
              </SubMenu>

              <SubMenu title="Commesse">
                <MenuItem><a href="/commesse"> Commesse</a></MenuItem>
              </SubMenu>

              <SubMenu title="Timesheet">
                <MenuItem>
                  <Link to={{
                    pathname: "/timesheet-view",
                    state: {
                      responsabile: false,
                      codicePersona: this.props.codicePersona,
                      username: this.props.username,
                      anno: new Date().getFullYear(),
                      mese: new Date().getMonth()
                    }
                  }}>
                    Timesheet
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to={{
                    pathname: "/timesheet-grid",
                  }}>
                    Timesheet Sottoposti
                  </Link>
                </MenuItem>
              </SubMenu>


            </Menu>
          </ProSidebar>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {    
    userEmail: state.user.email,    
    username: state.user.username,
    codicePersona: state.user.codicePersona
  }
}

export default connect(mapStateToProps)(Sidebar);