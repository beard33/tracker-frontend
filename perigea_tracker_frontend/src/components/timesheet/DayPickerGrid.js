import * as React from 'react';
import { add, format, set } from 'date-fns';
import { Day, DayPicker } from 'react-day-picker';

import { useState, useEffect } from 'react';
import it from 'date-fns/locale/it';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { getWeekendDays } from '../utils/Utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import { red } from '@material-ui/core/colors';

export default function DayPickerGrid(props) {
    const [days, setDays] = useState([]);
    const defaultMonth = new Date(props.anno, props.mese)
    let modifiedDays = [];
    let weekendDays = [];
    let confirmedDates = [];
    let festivi = []

    const footer =
        days && days.length > 0 ? (
            <p>Conferma le date selezionate</p>
        ) : (
            <p>seleziona 1 o più date</p>
        );

    const confirmedDatesStyle = {
        backgroundColor: "#dd4125",
        color: "white",
        border: "solid 2px #333333"
    }

    const modifiedDaysStyle = {
        backgroundColor: "#f1b126",
        color: "black",
        fontWeight: "bold"
    };
    const weekendStyle = {
        color: "red"
    }
    
    
    
    const setWeekendDays = () => {
        weekendDays = getWeekendDays(props.mese, props.anno)
    }

    const addDays = () => {
        props.addDays(days)
        setDays([])        
    }

    /**
     * metodo per settare la lista dei giorni con i dati popolati
     */
    const setModified = () => {
        console.log("FESTIVI", props.festivi)
        modifiedDays = props.modifiedDays
        confirmedDates = props.confirmedDates
        festivi = props.festivi
        
        modifiedDays.map((day) => {
            if (confirmedDates.find(el => el.getDate() === day.getDate())) {
                confirmedDates = confirmedDates.filter(el => el.getDate() !== day.getDate())
            }
        })
    }

    /**
     * metodo per aprire la visualizzazione oppure selezionare più date
     * @param {*} day 
     * @param {*} modifiers 
     */
    const onDayClick = (day, modifiers) => {
        if (modifiedDays.find(d => d.getDate() === day.getDate())) {
            console.log("DATE MODIFICATE")
            props.entryView(day)
        } else {
            setDays((currentValue) => {
                const dates = [...currentValue];
                if (modifiers.selected) {
                    dates.splice(currentValue.indexOf(day), 1);
                } else {
                    dates.push(day)

                }
                return dates;
            });
        };
    }


    return (
        <React.Fragment>
            {setWeekendDays()}
            {setModified()}

            <Col xl={5} style={{ marginTop: "2%" }}>
                <Form style={{ marginLeft: "2%" }}>
                    <DayPicker

                        defaultMonth={defaultMonth}
                        disableNavigation                        
                        min={1}
                        selected={days}
                        onDayClick={onDayClick}

                        locale={it}
                        footer={footer}
                        modifiers={{
                            modifiedDays: modifiedDays,
                            weekend: weekendDays,
                            confirmedDates: confirmedDates,
                            festivi: festivi
                        }}
                        modifiersStyles={{
                            modifiedDays: modifiedDaysStyle,
                            weekend: weekendStyle,
                            confirmedDates: confirmedDatesStyle,
                            festivi: weekendStyle
                        }}
                    />
                    <Button
                        className='buttonDates'
                        onClick={addDays}
                        title='Coferma Date'
                    >
                         <img className="menu" src="./images/conferma.png"></img>
                    </Button>
                </Form>
            </Col>
        </React.Fragment>
    );
}