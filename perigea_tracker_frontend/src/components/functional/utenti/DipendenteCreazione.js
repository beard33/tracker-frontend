import React, {Component} from 'react';

import Anagrafica from './Anagrafica';
import Title from '../../structural/Title'

export default class DipendenteCreazione extends Component {  
  
  render() {
    return (
      <React.Fragment>
        <Title></Title>
        

        <Anagrafica personale= "dipendente">
        </Anagrafica>
      </React.Fragment>
    );
  }
}
