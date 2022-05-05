import * as React from 'react';
import { add, format, set } from 'date-fns';
import { DayPicker } from 'react-day-picker';

import { useState, } from 'react';
import it from 'date-fns/locale/it';
import { Button, Col, Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DayPickerGrid(props) {
    const [days, setDays] = useState([]);
    const defaultMonth = new Date(props.anno, props.mese)


    const addDays = () => {
        props.addDays(days)
    }

    const footer = "seleziona 1 o più date";
    // const modifiedDates = [
        
    // ]

    // const bookedStyle = {
    //     border: '2px solid currentColor',
    //     backgroundColor: "black",
    //     color: "white"
    // };

    return (
        <React.Fragment>
            <Col xs={5} style={{marginTop: "2%"}}>
                <Form style={{marginLeft:"2%"}}>
                    <DayPicker

                        defaultMonth={defaultMonth}
                        disableNavigation
                        mode="multiple"
                        min={1}
                        selected={days}
                        onSelect={setDays}
                        locale={it}
                        footer={footer}
                        // modifiers={{ modified: modifiedDates }}
                        // modifiersStyles={{ modified: bookedStyle }}
                    />
                    <Button
                        className='buttonDates'
                        onClick={addDays}
                    >
                        Conferma Selezione Date
                    </Button>
                </Form>
            </Col>
        </React.Fragment>
    );
}