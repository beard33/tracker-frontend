import React, { useEffect, useState } from 'react';
import WelcomeHeader from "../structural/WelcomeHeader";
import TextButton from "../structural/TextButton";
import UploadFileButton from '../structural/UploadFileButton';
import AxiosInstance from "../../axios/AxiosInstance";
import LoadingSpinner from '../structural/LoadingSpinner';
import { connect } from 'react-redux';
import UserInfoTable from './UserInfoTable';
import { redirect } from '../../redux/Actions';
import Title from '../structural/Title';
import RecoverPasswordDialog from '../structural/RecoverPasswordDialog';
import { Redirect, withRouter } from 'react-router-dom';
import { set } from 'lodash';





function ProfilePersonal(props) {
  const profileView = props.location.state ? true : false
  const [src, setSrc] = useState("")
  const [recoverDialogOpen, setRecoverDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!props.navBar) {
      props.dispatch(redirect(props.location))
    }
    getImageProfile()
  }, []);

  const handleClose = () => {
    setRecoverDialogOpen(false)
  }

  const getImageProfile = async () => {
    setIsLoading(true)
    await AxiosInstance({
      method: "get",
      url: `profile-image/read/${props.user.codicePersona}`,
    }).then((response) => {
      setSrc(`data:image/jpg;base64,${response.data.data.image}`)
      setIsLoading(false)
    }).catch((error) => {
      setSrc("../images/fotoProfiloGenerica.png")
      setIsLoading(false)
    })
  }

  const uploadCurriculum = async (selectedFile) => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    console.log(formData)
    await AxiosInstance({
      method: 'post',
      url: `curriculum/${props.user.codicePersona}`,
      data: formData,
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).then(() => {
      alert("Upload del curriculum effettuato con successo")
    }).catch((error) => {
      console.log("Upload non riuscito", error)
    })
  }

  const uploadProfileImage = async (selectedFile) => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    await AxiosInstance({
      method: 'post',
      url: `profile-image/${props.user.codicePersona}`,
      data: formData,
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).then(() => {
      alert("Upload del curriculum effettuato con successo")
    }).catch((error) => {
      console.log("Upload non riuscito ", error)
    })
  }

  return (
    <React.Fragment>
      <Title></Title>

      {props.user ?
        <React.Fragment>
          {isLoading ? <LoadingSpinner /> :
            <div className="profile-container">

              <WelcomeHeader img={src} name={`${props.user.name} ${props.user.lastname}`} admin={""} userEmail={""} db={profileView} />

              <UserInfoTable
                username={props.user.username}
                scope={props.user.scope}
                type={props.user.type}
                mail={props.user.email}
              />

              {props.location.state &&
                <React.Fragment>
                  <button className='button-upload' onClick={() => setRecoverDialogOpen(true)}>Modifica Password</button>

                  <UploadFileButton text={"Upload Immagine Profilo"} upload={uploadProfileImage} />

                  <UploadFileButton text={"Upload Curriculum"} upload={uploadCurriculum} />
                </React.Fragment>
              }

            </div>
          }
        </React.Fragment>
        : <Redirect to={{ pathname: "/" }} />}

      <RecoverPasswordDialog user={props.user} handleClose={handleClose} open={recoverDialogOpen} logged={true} />
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
