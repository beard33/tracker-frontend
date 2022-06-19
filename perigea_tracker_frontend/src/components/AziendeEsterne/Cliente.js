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
          updateProps={this.props.location.updateProps}
        >
        </Azienda>
      </React.Fragment>
    );
  }
}