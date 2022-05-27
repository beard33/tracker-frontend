import * as React from 'react';
import { add, format, set } from 'date-fns';
import { Day, DayPicker } from 'react-day-picker';

import { useState, useEffect } from 'react';
import it from 'date-fns/locale/it';
import { Button, Col, Form, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DayPickerGrid(props) {
    const [days, setDays] = useState([]);
    const defaultMonth = new Date(props.anno, props.mese)
    let modifiedDays = [];
    let weekendDays = [];
    let confirmedDates = [];

    const monthsWithThirtyDays = [4, 6, 9, 11]
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


    const getWeekendDays = () => {
        let endDay;
        if (props.mese === 2) {
            props.anno % 4 === 0 ? endDay = 29 : endDay = 28;
        } else {
            if (monthsWithThirtyDays.find(el => el === props.mese)) {
                endDay = 30;
            } else {
                endDay = 31;
            }
        }
        for (let i = 1; i <= endDay; i++) {
            let date = new Date(props.anno, props.mese, i)
            if (date.getDay() == 0 || date.getDay() == 6) {
                weekendDays.push(date)
            }
        }

    }




    const addDays = () => {
        props.addDays(days)
        setDays([])        
    }

    const setModified = () => {
        modifiedDays = props.modifiedDays
        confirmedDates = props.confirmedDates
        console.log(confirmedDates)
        modifiedDays.map((day) => {
            if (confirmedDates.find(el => el.getDate() === day.getDate())) {
                confirmedDates = confirmedDates.filter(el => el.getDate() !== day.getDate())
            }
        })
    }

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
            {getWeekendDays()}
            {setModified()}

            <Col xl={5} style={{ marginTop: "2%" }}>
                <Form style={{ marginLeft: "2%" }}>
                    <DayPicker

                        defaultMonth={defaultMonth}
                        disableNavigation
                        // mode="multiple"
                        min={1}
                        selected={days}
                        onDayClick={onDayClick}

                        locale={it}
                        footer={footer}
                        modifiers={{
                            modifiedDays: modifiedDays,
                            weekend: weekendDays,
                            confirmedDates: confirmedDates
                        }}
                        modifiersStyles={{
                            modifiedDays: modifiedDaysStyle,
                            weekend: weekendStyle,
                            confirmedDates: confirmedDatesStyle
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