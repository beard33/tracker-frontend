import React from 'react';
import WelcomeHeader from "../structural/WelcomeHeader";
import TextButton from "../structural/TextButton";
import UploadFileButton from '../structural/UploadFileButton';
import Grid from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Form from "react-bootstrap/Form";
import { connect } from 'react-redux';
import Col from "react-bootstrap/Col";

function ProfilePersonal(props) {
  const admin = props.type;
  const userEmail = props.userEmail;

  return (
    <div className="profile-container">

      <WelcomeHeader img="../images/fotoProfiloGenerica.png" name={`${props.nome} ${props.cognome}`} admin={admin} userEmail={userEmail} />

    

      {/* <div className="common-input-label">Avatar</div>
      <TextButton text={"Upload"} />

      <div className="common-input-label">Curriculum</div>
      <TextButton text={"Upload"} />

      <UploadFileButton /> */}
    </div>
  )
}

const mapStateToProps = (state) => {  
  console.log(state)
  return {
   nome: state.user.name,
   cognome: state.user.lastname,
   userEmail: state.user.email,
   type: state.user.type,
   scope: state.user.scope
  }
}

export default connect(mapStateToProps)(ProfilePersonal);
