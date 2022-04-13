//componente generico che contiene Title e Corpo

import React from 'react';
import AziendaGrid from '../functional/AziendaGrid';
import UtentiGrid from '../functional/utenti/UtentiGrid';
import Title from '../structural/Title';

export default class CentralBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  render() {
    console.log("CENTRALBODY ENTRY");
    console.log(this.props.tipo)
    let tipo;
    if(this.props.tipo === "dipendenti"|| this.props.tipo === "consulenti"){
    tipo = this.props.tipo;
    console.log(tipo)
      return (   
      <div className={`centralbody${this.props.isMenuOpen === true ? ' open' : ''}`}>
        <Title />
        <UtentiGrid tipo={tipo} />
      </div>
    )
    } else {
      tipo = this.props.tipo;
      console.log(tipo)
      return (   
        <div className={`centralbody${this.props.isMenuOpen === true ? ' open' : ''}`}>
          <Title />
          <AziendaGrid tipo={tipo} />
        </div>
      )
    }
  }
}