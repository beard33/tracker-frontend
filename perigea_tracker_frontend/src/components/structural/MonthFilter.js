import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";
import { Form } from 'react-bootstrap';
import { Button, Row, Container } from 'react-bootstrap';


export default function MonthFilter(props) {
    const [data, setData] = useState("")
    const [anno, setAnno] = useState(0)
    const [mese, setMese] = useState(0)


    const setRefs = (arg) => {
        setData(arg)
        const date = arg.split("-")
        const month = date[1].split("")
        setAnno(date[0])
        if (month[0] === "0") {
            setMese(month[1])
        } else {
            setMese(date[1])
        }

    }


    const setNewMonth = () => {
        props.setNewMonth(mese, anno)
    }


    return (
        <React.Fragment>
            <div className="postStyleProps" style={{ marginLeft: "1%", width: "98%" }} >
                <div className="info"
                    style={{
                        marginTop: "-1.1%",
                        marginLeft: "1%",
                        marginRight: "0%",
                        marginBottom: "2%",
                        paddingLeft: "0%",
                        paddingRight: "0%",
                        paddingTop: "0%",
                        paddingBottom: "0%",
                        width: "46%",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        boxShadow: "10px 10px 5px #939294",
                        border: "1px solid #333333",
                    }}>
                    <Grid className="infoGrid"
                        container
                        spacing={20}
                    >
                        <Form style={{ width: "100%" }}>
                            <Form.Row className="infoForm">
                                <TextField
                                    style={{ width: "60%" }}
                                    label="seleziona mese"
                                    type="month"
                                    value={data}
                                    onChange={(e) => { setRefs(e.target.value) }}
                                ></TextField>
                                <Button className='button-confirm' onClick={setNewMonth} title='conferma mese'>
                                    <img className="menu" src="./images/conferma.png"></img>
                                </Button>

                            </Form.Row>
                        </Form>
                    </Grid>
                </div>

            </div>
        </React.Fragment >
    )

}