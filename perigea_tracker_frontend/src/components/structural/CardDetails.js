//componente generico per dettagli delle card

import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Form from "react-bootstrap/Form";

const CardDetails = (props) => {

  return (
    
      <div className="card-details">
        <Form style={{
          backgroundColor: "#fafafa",
          width: "90%",
          margin: "0% 0% 0% 5%",
          borderRadius: "10%",
          // border: "1px solid #333333"
        }}>
          <TextField
            label="nome"
            value={props.name + " " + props.lastName}></TextField>
          <TextField
            label="username"
            value={props.username}></TextField>
          <TextField
            label="mail Aziendale"
            value={props.mailAziendale}></TextField>
          <TextField
            style={{ marginBottom: "5%" }}
            label="cellulare"
            value={props.cellulare}></TextField>

        </Form>

      
    </div>
  )
}

export default CardDetails;

// CardDetails.propTypes = {
//   name: PropTypes.string.isRequired,
//   lastName: PropTypes.string.isRequired,
// }