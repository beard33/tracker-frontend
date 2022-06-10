import * as React from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import AxiosInstance from '../../axios/AxiosInstance';


export default function UtentiAssegnati(props) {
   console.log(props.utentiAssegnati)
    let listItems = props.utentiAssegnati.map((val) =>
        <tr>
            <td>{val.username}</td>
            <td>{val.mailAziendale}</td>
            <td>{val.dataInizioAllocazione}</td>
            <td>{val.giorniPrevisti}</td>
            <td>{val.tariffa}</td>
            <td></td>
            {/* <td>
                <Button className='table-button' title='cancella estensione' onClick={() => { deleteEstensione(codiceCommessa, val.dataEstensione) }}>
                    <img className="menu" src="./images/clear-white.png"></img>
                </Button>
            </td> */}
        </tr>
    )
   
        return (
            <React.Fragment>
                <Table striped bordered hover variant="dark" style={{ marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Mail Aziendale</th>
                            <th>Data Allocazione</th>
                            <th>Giorni Previsti</th>
                            <th>Tariffa</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItems}
                    </tbody>
                </Table>
            </React.Fragment>
        )
    
}