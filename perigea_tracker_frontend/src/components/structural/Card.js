//componente generico che continene elementi card utente cliente dipendente..

import React from 'react';
import Box from './Box';
import CardDetails from './CardDetails';
import CardImage from './CardImage';
import { Link } from "react-router-dom";




const Card = (props) => {


  if (props.tipo === "dipendenti" || props.tipo === "consulenti") {
    return (
      <Box className="card">

        {<CardImage className="image"
          cardImage="../images/fotoProfiloGenerica.png"
        />}

        <Link className='view-button' to={{ pathname: "/" + props.tipo + "-view", codicePersona: props.item.codicePersona }} >
          <img className="view-image" title="vedi dettagli" src="./images/show-details.png"
            style={{ width: "calc(8vw/3.5)", height: "calc(8vw/3.5)" }}
          ></img>
        </Link>

        <button className='delete-button' onClick={() => { props.showDeleteModal(props.item.codicePersona) }}>
          <img className="bin" src="./images/bin.png"
            style={{ width: "calc(7vw/3.5)", height: "calc(7vw/3.5)" }}
          ></img>
        </button>

        <CardDetails
          tipo={props.tipo}
          name={props.item.nome}
          lastName={props.item.cognome}
          username={props.item.username}
          mailAziendale={props.item.mailAziendale}
          cellulare={props.item.cellulare}
        />

      </Box>

    )
  } else {
    console.log(props.item.codiceAzienda)
    return (
      <Box className="card">

        {props.item.codiceAzienda !== "0c44f51f-60c6-425b-af85-77a91e703b8d" ?
          <CardImage className="image" cardImage="../images/company.png" /> :
          <CardImage className="image" cardImage="../images/pianetaLogo.png" /> }

        <Link className='view-button' to={{ pathname: "/azienda-view", aziendaProps: { codiceAzienda: props.item.codiceAzienda, tipo: props.tipo } }} >
          <img className="view-image" src="./images/show-details.png"
            style={{ width: "calc(8vw/3.5)", height: "calc(8vw/3.5)" }}
          ></img>
        </Link>

        <button className='delete-button' onClick={() => { props.showDeleteModal(props.item.codiceAzienda) }}>
          <img className="bin" src="./images/bin.png"
            style={{ width: "calc(7vw/3.5)", height: "calc(7vw/3.5)" }}
          ></img>
        </button>

        <CardDetails
          tipo={props.tipo}
          ragioneSociale={props.item.ragioneSociale}
          partitaIva={props.item.partitaIva}
          acronimoCliente={props.item.acronimoCliente}
        />

      </Box>
    )
  }
}
export default Card;