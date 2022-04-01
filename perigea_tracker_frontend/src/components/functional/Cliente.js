//pagina che visualizza la scelta clienti

import React from 'react';
import CentralBody from '../structural/CentralBody';
import Footer from '../structural/Footer';
import NavigationBar from '../structural/NavigationBar';
import Sidebar from '../structural/Sidebar';
import Style from '../structural/Style';

export default class Cliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }
  
  //set stato apertura barra laterale
  toggleMenu() {
    this.setState({isMenuOpen: !this.state.isMenuOpen})
  }

  render() {
    return (
      <Style>
      
          <NavigationBar
            logo="./images/scrittaPerigea.png"
            message="./images/message.png"
            inbox6="./images/inbox6.png"
            grid="./images/grid.png"
            search="./images/search.png"
            language="./images/language.png"
            profile2="./images/fotoProfiloGenerica.png"
            isMenuOpen={this.state.isMenuOpen}
            onMenuToggle={this.toggleMenu}
          />

          <Sidebar
            isMenuOpen={this.state.isMenuOpen}
            onMenuToggle={this.toggleMenu}
          />
    
          <CentralBody
            isMenuOpen={this.state.isMenuOpen}
            onMenuToggle={this.toggleMenu}
          />

          <Footer
            nomeCreatore="© 2020 Perigea Website by Chiara"
            isMenuOpen={this.state.isMenuOpen}
            onMenuToggle={this.toggleMenu}
          />

      </Style>
    )
  }
}