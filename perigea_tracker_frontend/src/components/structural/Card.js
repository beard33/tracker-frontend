//componente generico che continene elementi card utente cliente dipendente..

import React, { useState, useEffect } from 'react';
import AxiosInstance from "../../axios/AxiosInstance";
import Box from './Box';
import CardDetails from './CardDetails';
import CardImage from './CardImage';
import { link } from '../../redux/Actions';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';




const Card = (props) => {
  const [src, setSrc] = useState("")

  useEffect(() => {
    if (props.item.codicePersona) {
      getImageProfile()
    }
  }, []);

  const handleClick = () => {
    props.dispatch(link())
  }

  const getImageProfile = async () => {
    await AxiosInstance({
      method: "get",
      url: `profile-image/read/${props.item.codicePersona}`,
    }).then((response) => {
      setSrc(`data:image/jpg;base64,${response.data.data.image}`)
    }).catch((error) => {
      setSrc("../images/fotoProfiloGenerica.png")
    })
  }

  if (props.tipo === "dipendenti" || props.tipo === "consulenti") {
    return (
      <Box className="card">

        {<CardImage className="image"
          cardImage={src}
        />}

        {((
          props.user.scope.includes("ROLE_MANAGEMENT")
          || props.user.scope.includes("ROLE_ADMIN")
          || props.user.scope.includes("ROLE_AMMINISTRAZIONE")
          || props.user.scope.includes("ROLE_HR")
        ) || props.item.codicePersona === props.user.codicePersona) &&
          <Link className='view-button' onClick={handleClick} to={{ pathname: "/" + props.tipo + "-view", state: { codicePersona: props.item.codicePersona } }} >
            <img className="view-image" title="vedi dettagli" src="./images/show-details.png"
              style={{ width: "calc(8vw/3.5)", height: "calc(8vw/3.5)" }}
            ></img>
          </Link>
          //  :
          // <Link className='view-button' onClick={handleClick} to={{ pathname: "/unauthorized" }}>
          //   <img className="view-image" title="vedi dettagli" src="./images/show-details.png"
          //     style={{ width: "calc(8vw/3.5)", height: "calc(8vw/3.5)" }}
          //   ></img>
          // </Link>
        }
        {(
          props.user.scope.includes("ROLE_MANAGEMENT")
          || props.user.scope.includes("ROLE_ADMIN")
          || props.user.scope.includes("ROLE_AMMINISTRAZIONE")
          || props.user.scope.includes("ROLE_HR")
        ) &&
          <button className='delete-button' onClick={() => { props.showDeleteModal(props.item.codicePersona) }}>
            <img className="bin" src="./images/bin.png"
              style={{ width: "calc(7vw/3.5)", height: "calc(7vw/3.5)" }}
            ></img>
          </button>
        }
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
    return (
      <Box className="card">

        {props.item.codiceAzienda !== "0c44f51f-60c6-425b-af85-77a91e703b8d" ?
          <CardImage className="image" cardImage="../images/company.png" /> :
          <CardImage className="image" cardImage="../images/pianetaLogo.png" />}

        <Link className='view-button' onClick={handleClick} to={{ pathname: "/azienda-view", state: { codiceAzienda: props.item.codiceAzienda, tipo: props.tipo } }} >
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
const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Card);