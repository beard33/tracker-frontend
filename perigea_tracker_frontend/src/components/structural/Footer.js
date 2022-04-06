//componente a fine pagina che cambia in base alla sidebar aperta o chiusa

import React from 'react';
export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <footer className={`footer${this.props.isMenuOpen === true ? ' open' : ''}`}
      >
        <div class="custom-shape-divider-bottom-1649237888">
         
        </div>
        <h1 className="footer-text">{this.props.nomeCreatore}</h1>
      </footer>
    )
  }
}