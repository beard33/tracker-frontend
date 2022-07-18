//componente generico che contiene Title e Corpo

import React from 'react';
import AziendaGrid from '../AziendeEsterne/AziendaGrid';
import UtentiGrid from '../utenti/UtentiGrid';
import Title from '../structural/Title';

export default class CentralBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    console.log("CENTRALBODY ENTRY");
    let tipo;
    if (this.props.tipo === "clienti" || this.props.tipo === "fornitori") {
      tipo = this.props.tipo;
      console.log("TIPO  " +tipo)
      return (
        <div className={`centralbody${this.props.isMenuOpen === true ? ' open' : ''}`}>
          <Title />
          <AziendaGrid tipo={tipo} />
        </div>
      )
    } else {
      tipo = this.props.tipo;
      return (
        <div className={`centralbody${this.props.isMenuOpen ? ' open' : ''}`}>
          <Title />
          <UtentiGrid tipo={tipo} gruppo={false} />
        </div>
      )

    }
  }
}