import { white } from 'material-ui/styles/colors';
import React from 'react';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (

      <React.Fragment>
        {this.props.user ?
          <div className={`sidebar-menu${this.props.isMenuOpen === true ? ' open' : ''}`}   >
            <div className="pro-menu" >
              <ProSidebar >
                <Menu>
                  <div className="img-profile-div" >
                    <img className="img-profile" src="./images/fotoProfiloGenerica.png" alt="user"></img>
                    <h5 style={{ color: white }}>{this.props.user.name + " " + this.props.user.lastname}</h5>
                  </div>
                  <MenuItem><a href="/home" onClick={this.props.onMenuToggle}>Home</a></MenuItem>


                  <SubMenu title="Aziende">
                    <MenuItem><a href="/fornitori" onClick={this.props.onMenuToggle}> Fornitori</a></MenuItem>
                    <MenuItem><a href="/clienti" onClick={this.props.onMenuToggle}> Clienti</a></MenuItem>
                  </SubMenu>

                  <SubMenu title="Utenti">
                    <MenuItem><a href="/dipendenti" onClick={this.props.onMenuToggle}> Dipendenti</a></MenuItem>
                    <MenuItem><a href="/consulenti" onClick={this.props.onMenuToggle}> Consulenti</a></MenuItem>
                  </SubMenu>

                  <SubMenu title="Commesse" onClick={this.props.onMenuToggle}>
                    <MenuItem><a href="/commesse" onClick={this.props.onMenuToggle}> Commesse</a></MenuItem>
                  </SubMenu>

                  <SubMenu title="Timesheet">
                    <MenuItem>
                      <Link to={{
                        pathname: "/timesheet-view",
                        state: {
                          responsabile: false,
                          codicePersona: this.props.user.codicePersona,
                          username: this.props.user.username,
                          anno: new Date().getFullYear(),
                          mese: new Date().getMonth()
                        }
                      }} onClick={this.props.onMenuToggle}>
                        Timesheet
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to={{
                        pathname: "/timesheet-grid",
                      }} onClick={this.props.onMenuToggle}>
                        Timesheet Sottoposti
                      </Link>
                    </MenuItem>
                  </SubMenu>


                </Menu>
              </ProSidebar>
            </div>
          </div>
          : <Redirect to={{ pathname: "/" }} />}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Sidebar);