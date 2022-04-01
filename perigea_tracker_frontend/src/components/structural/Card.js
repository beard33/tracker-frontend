//componente generico che continene elementi card utente cliente dipendente..

import React from 'react';
import Box from './Box';
import CardButtonUpdate from './CardButtonUpdate';
import CardButtonDelete from './CardButtonDelete';
import CardDetails from './CardDetails';
import CardImage from './CardImage';
import UpdateCardWindow from '../functional/UpdateCardWindow';

export default function Card( {
    utente,
    disabilitaButton, 
    showModal,
    deleteFunction,
    closeShowUpdateCardWindow, 
    showUpdateCard,
    updateCard,
    keyShow,
    profileButtonDelete,
    profileButtonUpdate,
  } ) {

    console.log("Card keyShow ", keyShow)
  return(
    <Box className="card">

      {<CardImage 
        cardImage="../images/fotoProfiloGenerica.png"
      />}

      <CardDetails
        name={utente.name}
        lastName={utente.lastName}
      />

      <CardButtonUpdate 
        profileButton={profileButtonUpdate}
        keyCardUpdate={utente.codicePersona} 
        keyCard={utente.codicePersona}
        visualizzaForm={showModal}
        disabilitaButton={disabilitaButton}
      />

      <CardButtonDelete 
        profileButton={profileButtonDelete}
        keyCard={utente.codicePersona} 
        deleteButton={deleteFunction}
      />   

      <UpdateCardWindow 
        onClose={closeShowUpdateCardWindow} 
        updateFunction={updateCard} 
        isToShow={showUpdateCard}
        utente={utente}
        keyToShow={keyShow}
      />

    </Box>
  )
}