//componente generico per dettagli delle card

import React from 'react';
import TextField from '@material-ui/core/TextField';
import Form from "react-bootstrap/Form";

const CardDetails = (props) => {

  if (props.tipo === "dipendenti" || props.tipo === "consulenti") {
    return (
      <div className="card-details">
        <Form className='details-form'
          style={{
            backgroundColor: "trasparent",
            width: "calc(65vw/3.5)",
            height: "calc(57vw/3.6)",
            margin: "0% 0% 0% 5%",
            borderRadius: "10%",
            // border: "1px solid #333333"
          }}>
          {/* <p>{props.name + " " + props.lastName}</p> */}
          <TextField
            label="nome"
            value={props.name + " " + props.lastName}
            style={{
              width: "calc(57vw/3.5)",
              height: "calc(14vw/3.6)",
              fontWeight: "bolder"
            }}></TextField>
          {/* <p>{props.username}</p> */}
          <TextField
            label="username"
            value={props.username}
            style={{
              width: "calc(57vw/3.5)",
              height: "calc(14vw/3.6)",
              fontWeight: "bolder"
            }}></TextField>
          {/* <p>{props.mailAziendale}</p> */}
          <TextField
            label="mail Aziendale"
            value={props.mailAziendale}
            style={{
              width: "calc(58vw/3.5)",
              height: "calc(14vw/3.6)",
              fontWeight: "bolder"
            }}></TextField>
          {/* <p>{props.cellulare}</p> */}
          <TextField
            style={{
              marginBottom: "5%",
              width: "calc(57vw/3.5))",
              height: "calc(14vw/3.6)",
              fontWeight: "bolder"
            }}
            label="cellulare"
            value={props.cellulare}></TextField>
        </Form>
      </div>
    )
  } else {
    return (
      <div className="card-details">
        <Form className='details-form'
          style={{
            backgroundColor: "trasparent",
            width: "calc(65vw/3.5)",
            height: "calc(57vw/3.6)",
            margin: "0% 0% 0% 5%",
            borderRadius: "10%",
            // border: "1px solid #333333"
          }}>
          {/* <p>{props.name + " " + props.lastName}</p> */}
          <TextField
            label="ragione sociale"
            value={props.ragioneSociale}
            style={{
              width: "calc(57vw/3.5)",
              height: "calc(14vw/3.6)",
              fontWeight: "bolder"
            }}></TextField>
          {/* <p>{props.username}</p> */}
          <TextField
            label="partita iva"
            value={props.partitaIva}
            style={{
              width: "calc(57vw/3.5)",
              height: "calc(14vw/3.6)",
              fontWeight: "bolder"
            }}></TextField>
          {/* <p>{props.mailAziendale}</p> */}
          <TextField
            label="acronimo cliente"
            value={props.acronimoCliente}
            style={{
              width: "calc(58vw/3.5)",
              height: "calc(14vw/3.6)",
              fontWeight: "bolder"
            }}></TextField>
         
         
        </Form>
      </div>
    )
  }
}

export default CardDetails;
