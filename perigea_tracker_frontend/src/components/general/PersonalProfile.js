import React, { useEffect } from 'react';
import WelcomeHeader from "../structural/WelcomeHeader";
import TextButton from "../structural/TextButton";
import UploadFileButton from '../structural/UploadFileButton';
import { connect } from 'react-redux';
import UserInfoTable from './UserInfoTable';
import { redirect } from '../../redux/Actions';
import Title from '../structural/Title';
import { Redirect, withRouter } from 'react-router-dom';





function ProfilePersonal(props) {
  const admin = props.user ? props.user.type : "";
  const userEmail = props.user ? props.user.userEmail : "";

  useEffect(() => {
    if (!props.navBar) {
      props.dispatch(redirect(props.location))
    }
  }, []);

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
    user: state.user,
    counter: state.counter,
    history: state.history,
    navBar: state.navBar
  }
}
export default withRouter(connect(mapStateToProps)(ProfilePersonal));
