import * as React from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';



export default function RuoliTable(props) {
    let ruoli = props.ruoli
    let listItems;

    const removeRole = (type) => {
        console.log(type)
        props.onRemove(type)
    }

    if (props.removePermission) {
        listItems = ruoli.map((val) =>
            <tr>
                <td>{val.id}</td>
                <td>{val.descrizione}</td>
                <td>
                    <Button className='table-button' title='rimuovi nota' onClick={() => { removeRole(val.id) }}>
                        <img className="menu" src="./images/clear-white.png"></img>
                    </Button>
                </td>
            </tr>)
    } else {
        listItems = ruoli.map((val) =>
            <tr>
                <td>{val.id}</td>
                <td>{val.descrizione}</td>
            </tr>)
    }

    return (
        <React.Fragment>
            {props.removePermission ?
                <Table striped bordered hover variant="dark" style={{ marginTop: "20px", width:"70%", marginLeft: "15%" }}>
                    <thead>
                        <tr>
                            <th>Tipo Ruolo</th>
                            <th>Descrizione</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItems}
                    </tbody>
                </Table> :
                <Table striped bordered hover variant="dark" style={{ marginTop: "20px", width:"70%", marginLeft: "15%" }}>
                    <thead>
                        <tr>
                            <th>Tipo Ruolo</th>
                            <th>Descrizione</th>
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