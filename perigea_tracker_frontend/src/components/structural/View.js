//componente generico che contiene tutti gli elementi della pagina

import React from 'react';
import CentralBody from '../structural/CentralBody';
import Style from '../structural/Style';

export default class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  //set stato apertura barra laterale
  toggleMenu() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen })
  }

  render() {
    console.log("VIEW ENTRY");
    return (
      <Style>
        <CentralBody
          isMenuOpen={this.state.isMenuOpen}
          onMenuToggle={this.toggleMenu}
        />
      </Style>
    )
  }
}