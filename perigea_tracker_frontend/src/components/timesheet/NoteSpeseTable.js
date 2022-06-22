import * as React from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';


export default function NoteSpeseTable(props) {
    let noteSpesa = props.noteSpese   
    let listItems;

    const removeNota = (type) => {
        console.log(type)
        props.onRemove(type)
    }

    if (props.removePermission) {
        listItems = noteSpesa.map((val) =>
            <tr>
                <td>{val.costoNotaSpese}</td>
                <td>{val.importo}</td>
                <td>
                    <Button className='table-button' title='rimuovi nota' onClick={() => { removeNota(val.costoNotaSpese) }}>
                        <img className="menu" src="./images/clear-white.png"></img>
                    </Button>
                </td>
            </tr>)



    } else {
        listItems = noteSpesa.map((val) =>
            <tr>
                <td>{val.costoNotaSpese}</td>
                <td>{val.importo}</td>

            </tr>)
    }
    return (
        <React.Fragment>
            {props.removePermission ?
                <Table striped bordered hover variant="dark" style={{ marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th>Tipo Spesa</th>
                            <th>Importo (€)</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItems}
                    </tbody>
                </Table> :
                <Table striped bordered hover variant="dark" style={{ marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th>Tipo Spesa</th>
                            <th>Importo (€)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItems}
                    </tbody>
                </Table>
            }
        </React.Fragment>
    )
}