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
import { Redirect } from 'react-router-dom';





function ProfilePersonal(props) {
  const admin = props.user ? props.user.type : "";
  const userEmail = props.user ? props.user.userEmail : "";


  return (
    <React.Fragment>
      <Title></Title>
      {props.user ?

        <div className="profile-container">

          <WelcomeHeader img="../images/fotoProfiloGenerica.png" name={`${props.user.name} ${props.user.lastname}`} admin={""} userEmail={""} />

          <UserInfoTable
            username={props.user.username}
            scope={props.user.scope}
            type={props.user.type}
            mail={props.user.email}
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
        : <Redirect to={{ pathname: "/" }} />}
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(ProfilePersonal);
