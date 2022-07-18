import * as React from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';


export default function UtentiGruppoTable(props) {
    let utenti = props.utenti
    let listItems = []

    const removeUser = (id) => {
        props.removeUser(id)
    }

    if (utenti) {
        listItems = utenti.map((val) =>
            <tr>
                <td>{val.username}</td>
                <td>{val.mailAziendale}</td>
                <td>
                    <Button className='table-button' title='rimuovi utente' onClick={() => { removeUser(val.username) }}
                        style={{ backgroundColor: "transparent", border:"transparent", marginLeft: "25%" }}>
                        <img className="menu" src="./images/clear-white.png"></img>
                    </Button>
                </td>
            </tr>)
    }

    return (
        <React.Fragment>
            <Table striped bordered hover variant="dark" style={{ marginTop: "4px", width: "100%", marginLeft: "0%" }}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Mail Aziendale</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {listItems}
                </tbody>
            </Table>
        </React.Fragment>
    )
}
