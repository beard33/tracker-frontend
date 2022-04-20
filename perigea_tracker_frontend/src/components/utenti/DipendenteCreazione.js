import React, {Component} from 'react';

import Anagrafica from './Anagrafica';
import Title from '../structural/Title'

export default class DipendenteCreazione extends Component {  
  
  render() {
    return (
      <React.Fragment>
        <Title></Title>
        

        <Anagrafica personale= "dipendente" updateProps = {this.props.location.updateProps}>
        </Anagrafica>
      </React.Fragment>
    );
  }
}
