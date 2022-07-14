import React, { useEffect, useState } from 'react';
import WelcomeHeader from "../structural/WelcomeHeader";
import TextButton from "../structural/TextButton";
import UploadFileButton from '../structural/UploadFileButton';
import { connect } from 'react-redux';
import UserInfoTable from './UserInfoTable';
import { redirect } from '../../redux/Actions';
import Title from '../structural/Title';
import RecoverPasswordDialog from '../structural/RecoverPasswordDialog';
import { Redirect, withRouter } from 'react-router-dom';





function ProfilePersonal(props) {
  const admin = props.user ? props.user.type : "";
  const userEmail = props.user ? props.user.userEmail : "";
  const [recoverDialogOpen, setRecoverDialogOpen] = useState(false)

  useEffect(() => {
    if (!props.navBar) {
      props.dispatch(redirect(props.location))
    }
  }, []);

  const handleClose = () => {
    setRecoverDialogOpen(false)
  }

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
             <button className='button-upload' onClick={() => setRecoverDialogOpen(true)}>Modifica Password</button>

              <UploadFileButton />
            </React.Fragment>
          }

        </div>
        : <Redirect to={{ pathname: "/" }} />}

        <RecoverPasswordDialog username={props.user.username} handleClose={handleClose} open={recoverDialogOpen} logged={true} />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  
  return {
    user: state.user,
    counter: state.counter,
    history: state.history,
    navBar: state.navBar
  }
}
export default withRouter(connect(mapStateToProps)(ProfilePersonal));
