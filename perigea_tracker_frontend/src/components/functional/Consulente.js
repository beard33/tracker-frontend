//pagina che visualizza la scelta consulenti

import React from 'react';
import Anagrafica from './Anagrafica';
import Title from '../structural/Title'

export default class Consulente extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <Title></Title>

        <Anagrafica personale="consulente">
        </Anagrafica>
      </React.Fragment>
    );
  }
}