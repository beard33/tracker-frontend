import React, { Component, useState } from "react";
import { connect } from "react-redux";



function UploadFileButton(props) {
  const [selectedFile, setSelectedFile] = useState("")


  const handleFileUpload = (e) => {
    console.log(e)
    setSelectedFile(e.target.files[0])

  }


    return (
      <React.Fragment>
        <input
          className="fileInput"
          onChange={handleFileUpload}
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
          onClick={() => props.upload(selectedFile)}>
          {props.text}
        </button>
      </React.Fragment>
    );
  }

const mapStateToProps = (state) => {

  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(UploadFileButton);