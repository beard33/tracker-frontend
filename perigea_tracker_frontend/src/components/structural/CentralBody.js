//componente generico che contiene Title e Corpo

import React from 'react';
import CardGrid from '../functional/CardGrid';
import Title from '../structural/Title';

export default class CentralBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  render() {
    console.log("CENTRALBODY ENTRY");
    return (
      <div className={`centralbody${this.props.isMenuOpen === true ? ' open' : ''}`}>
        <Title />
        <CardGrid />
      </div>
    )
  }
}