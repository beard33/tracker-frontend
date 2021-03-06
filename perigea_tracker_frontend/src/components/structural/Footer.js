//componente a fine pagina che cambia in base alla sidebar aperta o chiusa

import React from 'react';
export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { }
  }
  
  render() {
    return (
      <footer className="footer" className={`footer${this.props.isMenuOpen === true ? ' open' : ''}`}>
        <h1 className="footer-text">{this.props.nomeCreatore}</h1>
      </footer>
    )
  }
}