import React, { Component } from "react";
import ReactDOM from "react-dom";


export default class UploadFileButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: ''
    }

    // bind methods
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileUpload = e => {
    console.log(e.target.files[0]);
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    console.log("e.target.result ", e.target.result)
    reader.onload = (e) => {
      this.setState({
        selectedFile: e.target.result,
      })
    }
  };

  render() {
    return (
      <React.Fragment>
        <input
          className="fileInput"
          onChange={this.handleFileUpload}
          type="file"
          style={
            {
              width:"90%",
              marginLeft: "3%",
              marginTop: "3%"
            }}
        />
        <button
          className="button-upload"
          onClick={() => this.refs.fileInput.click()}>
          Upload immagine profilo
        </button>
      </React.Fragment>
    );
  }
}
