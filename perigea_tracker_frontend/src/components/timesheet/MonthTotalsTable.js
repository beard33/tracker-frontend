import * as React from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import AxiosInstance from '../../axios/AxiosInstance';

export default function MonthTotalsTable(props) {
    let commesse = props.commesse
    let giorni = props.oreTotali/8

    

    let tableItems = commesse.map((val) =>

        <tr>
            <td>{val.tipoCommessa === "F" ? val.ragioneSociale : val.descrizioneCommessa}</td>
            <td>{val.oreTotali}</td>
        </tr>
    )


    return (
        <React.Fragment>
            <Table striped bordered hover variant="dark" style={{ marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>Commessa/Cliente</th>
                        <th>Ore Totali </th>
                    </tr>
                </thead>
                <tbody>
                    {tableItems}
                </tbody>
            </Table>
            <Table striped bordered hover variant="dark" style={{ marginTop: "20px" }}>
                <thead>
                    <tr></tr>                    
                </thead>
                <tbody>
                    <tr>
                        <td>Ore Totali</td>
                        <td>{props.oreTotali}</td>
                    </tr>
                    <tr>
                        <td>Giorni Totali</td>
                        <td>{giorni}</td>
                    </tr>
                    <tr>
                        <td>Stato Approvazione</td>
                        <td>{props.approvalStatus}</td>
                    </tr>
                </tbody>
            </Table>
        </React.Fragment>
    )
}