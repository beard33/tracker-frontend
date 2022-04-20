//pagina che visualizza la scelta fornitori

import React from 'react';
import Azienda from './Azienda';
import Title from '../structural/Title'

export default class Fornitore extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Title></Title>
        <Azienda
          type="cliente"
          commessaProps={{
            commessa: this.props.location.commessaProps.commessa,
            commessaFatturabile: this.props.location.commessaProps.commessaFatturabile
          }}>
        </Azienda>
      </React.Fragment>
    );
  }
}