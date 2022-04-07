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

              <SubMenu title="Clienti">
                <MenuItem><a href="/add-cliente">Add Cliente</a></MenuItem>
                <MenuItem><a href="/clienti">Lista Clienti</a></MenuItem>
              </SubMenu>

              <SubMenu title="Consulenti">
                <MenuItem><a href="/anagrafica-consulenti">Add Consulente</a></MenuItem>
                <MenuItem><a href="/consulenti">Lista Consulenti</a></MenuItem>
              </SubMenu>

              <SubMenu title="Dipendenti">
                <MenuItem><a href="/anagrafica-dipendenti">Add Dipendente</a></MenuItem>
                <MenuItem><a href="/dipendenti">Lista Dipendenti</a></MenuItem>
              </SubMenu>

              <SubMenu title="Fornitori">
                <MenuItem><a href="/add-fornitore">Add Fornitore</a></MenuItem>
                <MenuItem><a href="/fornitori">Lista Fornitori</a></MenuItem>
              </SubMenu>
            </Menu>
          </ProSidebar>
        </div>
      </div>

    )
  }
}