//componente generico sidebar - ogni utente diverso visualizzerà elenchi diversi

import { color } from '@mui/system';
import { white } from 'material-ui/styles/colors';
import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

export default class Sidebar extends React.Component {
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


              <SubMenu title="Esterni">
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


            </Menu>
          </ProSidebar>
        </div>
      </div>

    )
  }
}