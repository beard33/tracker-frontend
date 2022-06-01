import React from 'react';
import WelcomeHeader from "../structural/WelcomeHeader";
import TextButton from "../structural/TextButton";
import UploadFileButton from '../structural/UploadFileButton';
import Grid from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const admin = "dipendente";
const userEmail = "utenteMock@perigea.it";

const inputs = [
  {
    label: "Nome",
    value: "Nome Mock",
    type: "text",
    name: "nome",
  },
  {
    label: "Cognome",
    value: "Cognome Mock",
    type: "text",
    name: "cognome",
  },
  {
    label: "E-mail",
    value: userEmail,
    type: "email",
    name: "email",
  },
  {
    label: "Password",
    value: "123456789",
    type: "password",
    name: "nome",
  },
]

export default function ProfilePersonal({ }) {
  return (
    <div className="profile-container">
      <WelcomeHeader img="../images/fotoProfiloGenerica.png" name="Mario Rossi" admin={admin} userEmail={userEmail} />
      <table class="profile-form">
        {
          inputs.map((item, index) => {
            return (
              <div style={{ width: "100%" }}>

                <TextField
                  style={{
                    marginTop: "5px",
                    width: "100%"
                  }}
                  value={item.value}
                  label={item.type}
                ></TextField>

              </div>
            )
          })
        }
        <tr>
          <td>
            <div className="common-input-label">Avatar</div>
            <TextButton text={"Upload"} />

            <div className="common-input-label">Curriculum</div>
            <TextButton text={"Upload"} />

            <UploadFileButton />
          </td>
        </tr>
      </table>
    </div>
  )
}