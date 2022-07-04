import React from 'react';
import WelcomeHeader from "../structural/WelcomeHeader";
import TextButton from "../structural/TextButton";
import UploadFileButton from '../structural/UploadFileButton';
import Grid from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Form from "react-bootstrap/Form";
import { connect } from 'react-redux';
import UserInfoTable from './UserInfoTable';
import Title from '../structural/Title';





function ProfilePersonal(props) {
  const admin = props.type;
  const userEmail = props.userEmail;

  return (
    <React.Fragment>
      <Title></Title>
      <div className="profile-container">

        <WelcomeHeader img="../images/fotoProfiloGenerica.png" name={`${props.nome} ${props.cognome}`} admin={""} userEmail={""} />

        <UserInfoTable
          username={props.username}
          scope={props.scope}
          type={props.type}
          mail={props.userEmail}
        />

        {props.location.state &&
          <React.Fragment>
            <div className="common-input-label">Avatar</div>
            <TextButton text={"Upload"} />

            <div className="common-input-label">Curriculum</div>
            <TextButton text={"Upload"} />

            <UploadFileButton />
          </React.Fragment>
        }
     
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    nome: state.user.name,
    cognome: state.user.lastname,
    userEmail: state.user.email,
    type: state.user.type,
    scope: state.user.scope,
    username: state.user.username
  }
}

export default connect(mapStateToProps)(ProfilePersonal);
