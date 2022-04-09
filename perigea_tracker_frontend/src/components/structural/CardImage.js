//componente generico per immagine delle card

import React from 'react';

export default function CardImage({ cardImage }) {
  return (
    <img className="card-image" src={cardImage}
      style={{
        height: "100%",
        width: "110%",
        bottom: 0,
        transform: "scale(0.50,0.35) translateX(-7%) translateY(-130%)",
        borderRadius: "50%",
        marginBottom: "0%"
      }}></img>
  )
}