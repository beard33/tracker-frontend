import * as React from 'react';
import AxiosInstance from '../../axios/AxiosInstance';
import Form from "react-bootstrap/Form";
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';



export default function EstensioneCommessaCreate(props) {
    const [estensioneCommessa, setEstensioneCommessa] = React.useState({
        codiceCommessa: "",
        dataEstensione: "",
        importoInternoEstensione: 0.0,
        dataFineEstensione: ""
    })

    React.useEffect(() => {
        setEstensioneCommessa({ ...estensioneCommessa, codiceCommessa: props.codiceCommessa })
    }, []);


    const handleChange = (e) => {
        setEstensioneCommessa({ ...estensioneCommessa, [e.target.name]: e.target.value })
    }


    /**
     * chiamata axios per il salvataggio di un'estensione commessa
     */
    const onSAVEButtonClick = async () => {
        await AxiosInstance({
            method: 'post',
            url: "commesse/create-estensione-commessa",
            data: estensioneCommessa
        }).then(() => {
            alert("Salvataggio dell'estensione effettuato con successo")
            console.log("Salvataggio dell'estensione effettuato con successo", this.data)
        }).catch((error) => {
            console.log("Error into loadUtenti ", error)
        })
        props.closeModal()
    }


    return (
        <React.Fragment>
            <div className="postStyleProps" >
                <h3>Info Estensione</h3>
                <div className="info">
                    <Grid className="infoGrid"
                        container
                        spacing={20}
                    >
                        <Form style={{ width: "100%" }}>
                            <Form.Row className="infoForm">
                                <TextField
                                    style={{ width: "100%" }}
                                    name="dataEstensione"
                                    label="Data Estensione Commessa"
                                    value={estensioneCommessa.dataEstensione}
                                    type='date'
                                    onChange={handleChange}
                                ></TextField>
                            </Form.Row>
                            <Form.Row className="infoForm">
                                <TextField
                                    style={{ width: "100%" }}
                                    name="importoInternoEstensione"
                                    label="Importo Interno Estensione"
                                    value={estensioneCommessa.importoInternoEstensione}
                                    onChange={handleChange}
                                ></TextField>
                            </Form.Row>
                            <Form.Row className="infoForm">
                                <TextField
                                    style={{ width: "100%" }}
                                    name="dataFineEstensione"
                                    label="Data Fine Estensione Commessa"
                                    value={estensioneCommessa.dataFineEstensione}
                                    type='date'
                                    onChange={handleChange}
                                ></TextField>
                            </Form.Row>
                        </Form>
                    </Grid>
                </div>

                <button className="ButtonSave" type="button" onClick={onSAVEButtonClick} title="SALVA">
                    <img className="menu" src="./images/save.png"></img>
                </button>

            </div>
        </React.Fragment>
    )
}
