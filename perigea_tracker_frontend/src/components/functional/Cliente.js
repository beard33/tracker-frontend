import React from 'react';
import Azienda from './Azienda';
import Title from '../structural/Title'

export default class Cliente extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <Title></Title>
        <Azienda type="cliente">
        </Azienda>
      </React.Fragment>
    );
  }
}