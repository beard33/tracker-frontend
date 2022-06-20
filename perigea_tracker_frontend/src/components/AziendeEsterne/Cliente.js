import React from 'react';
import Azienda from './Azienda';
import Title from '../structural/Title'

export default class Cliente extends React.Component {

  render() {    
    return (
      <React.Fragment>
        <Title></Title>
        <Azienda
          type="cliente"
          updateProps={this.props.location.updateProps}
        >
        </Azienda>
      </React.Fragment>
    );
  }
}