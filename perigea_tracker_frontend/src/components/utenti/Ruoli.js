import * as React from 'react';
import { useState, useEffect } from 'react';
import { ruoli } from '../enum/RuoliEnum'
import TextField from '@material-ui/core/TextField';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { MenuItem } from '@mui/material';


export default function Ruoli(props) {
    const [ruolo, setRuolo] = useState("")

    const handleChange = (e) => {
        console.log(e.target.value)
        setRuolo(e.target.value)
    }

    const addRole = () => {
        console.log(ruolo)
        props.updateState(ruolo)
        setRuolo("")
    }

    return (
        <React.Fragment>
            <Form
                className='postStyleProps'

            >
                <h5 style={{ marginRight: "15%" }}>add Ruoli</h5>
                <div className='info' style={{
                    width: "70%", marginLeft: "15%", paddingTop: "1%", paddingBottom: "1%"
                }}>
                    <Form.Group style={{ width: "100%" }}>
                        <TextField
                            style={{ width: "70%", marginLeft: "13%" }}
                            id="select stato"
                            select
                            name='costoNotaSpese'
                            label="Ruolo"
                            value={ruolo}
                            onChange={handleChange}
                        >
                            {ruoli.map((option) => (
                                <MenuItem key={option.id} value={(JSON.stringify(option))} >
                                    {option.id + " " + option.descrizione}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button className='noteSpese-button'
                            onClick={addRole}
                            title="add Ruolo"
                            style={{ marginLeft: "2%", marginTop: "1%" }}                        >
                            <img className="menu" src="./images/add.png"></img>
                        </Button>
                    </Form.Group>
                </div>
            </Form>

        </React.Fragment>
    )

}