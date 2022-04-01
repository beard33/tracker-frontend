//componente generico per immagine delle card

import React from 'react';

export default function CardImage({ cardImage }) {
  return(
    <img className="card-image" src={cardImage}></img>
  )
}