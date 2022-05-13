import * as React from 'react';
import { Container } from 'react-bootstrap';
import Title from '../structural/Title';
import TimesheetCreazione from './TimesheetCreazione';

const Timesheet = () => {
    return (
        <React.Fragment>
             <Title></Title>
            <Container fluid="xl">                
                <TimesheetCreazione
                    codicePersona="04ed7cba-88ec-44b6-a325-d0fa34987516"
                    anno={2022}
                    mese={5}></TimesheetCreazione>
            </Container>

        </React.Fragment>
    )
}
export default Timesheet;