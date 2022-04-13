//componente generico che continene elementi card utente cliente dipendente..

import React from 'react';
import Box from './Box';
import CardDetails from './CardDetails';
import CardImage from './CardImage';
import { Link } from "react-router-dom";




const Card = (props) => {



  return (
    <Box className="card">

      {<CardImage className="image"
        cardImage="../images/fotoProfiloGenerica.png"
      />}

      <Link className='view-button' to={{ pathname: "/dipendente-view", codicePersona: props.dipendente.codicePersona }} >
        <img className="view" src="./images/show-details.png"
          style={{ width: "calc(8vw/3.5)", height: "calc(8vw/3.5)" }}
        ></img>
      </Link>
      <button className='delete-button' onClick={() => { props.showDeleteModal(props.dipendente.codicePersona)}}>
        <img className="bin" src="./images/bin.png"
          style={{ width: "calc(7vw/3.5)", height: "calc(7vw/3.5)" }}
        ></img>
      </button>

      <CardDetails
        name={props.dipendente.nome}
        lastName={props.dipendente.cognome}
        username={props.dipendente.username}
        mailAziendale={props.dipendente.mailAziendale}
        cellulare={props.dipendente.cellulare}
      />

    </Box>

  )
}
export default Card;