//componente body che visualizza le diverse scelte lasciando alterati gli altri componenti

import React from 'react';
import Card from '../structural/Card';

export default function Corpo({  }) {
  return(
  <div className="corpo">
    <Card />    
    <Card /> 
    <Card />
    <Card />
  </div>
  )
}