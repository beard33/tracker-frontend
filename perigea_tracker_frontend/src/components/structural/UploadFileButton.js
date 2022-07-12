import React, { Component } from "react";
import AxiosInstance from "../../axios/AxiosInstance";
import { connect } from "react-redux";
import ReactDOM from "react-dom";


class UploadFileButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: ''
    }


  }


  uploadCurriculum = async () => {
    const formData = new FormData();
    formData.append('file', this.state.selectedFile);
    console.log(formData)
    await AxiosInstance({
      method: 'post',
      url: `curriculum/${this.props.user.codicePersona}`,
      data: formData,
      headers: {
        'content-type': 'multipart/form-data'
      }
    }).then(() => {
      alert("Upload del curriculum effettuato con successo")
    }).catch((error) => {
      console.log("Error into loadUtenti ", error)
    })
  }


  handleFileUpload = (e) => {
    console.log(e)
    this.setState({
      selectedFile: e.target.files[0],
    })
  }


  render() {
    return (
      <React.Fragment>
        <input
          className="fileInput"
          onChange={this.handleFileUpload}
          type="file"
          style={
            {
              width: "90%",
              marginLeft: "3%",
              marginTop: "3%"
            }}
        />
        <button
          className="button-upload"
          onClick={() => this.uploadCurriculum()}>
          Upload Curriculum
        </button>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {

  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(UploadFileButton);