import React from 'react';
import Azienda from './Azienda';
import Title from '../structural/Title'

export default class Cliente extends React.Component {

  render() {
    console.log(this.props.location.commessaProps)
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