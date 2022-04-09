//componente generico che continene elementi card utente cliente dipendente..

import React from 'react';
import Box from './Box';
import CardDetails from './CardDetails';
import CardImage from './CardImage';
import Form from "react-bootstrap/Form";



export default function Card({
  dipendente
}) {


  return (
    <Box className="card">

      {<CardImage className="image"
        cardImage="../images/default-profile-picture.png"
      />}

      <CardDetails
        name={dipendente.nome}
        lastName={dipendente.cognome}
        username={dipendente.username}
        mailAziendale={dipendente.mailAziendale}
        cellulare={dipendente.cellulare}
      />

      <Form>
        <button className='view-button' onClick={console.log("ciao")}>VIEW</button>
        <button className='delete-button'>DELETE</button>
      </Form>
      
    </Box>

  )
}