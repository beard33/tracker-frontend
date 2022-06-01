import * as React from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';


export default function EstensioniTable(props) {
    const codiceCommessa = props.codiceCommessa
    let estensioniCommessa = props.estensioni
    let listItems;

    const deleteEstensione = (codiceCommessa, dataEstensione) => {
        props.deleteEstensione(codiceCommessa, dataEstensione)
    }

    listItems = estensioniCommessa.map((val) =>
        <tr>
            <td>{val.dataEstensione}</td>
            <td>{val.dataFineEstensione}</td>
            <td>{val.importoInternoEstensione}</td>
            <td>
                <Button className='table-button' title='cancella estensione' onClick={() => { deleteEstensione(codiceCommessa, val.dataEstensione) }}>
                    <img className="menu" src="./images/clear-white.png"></img>
                </Button>
            </td>
        </tr>
    )

    return (
        <Table striped bordered hover variant="dark" style={{ marginTop: "20px" }}>
            <thead>
                <tr>
                    <th>Data Estensione</th>
                    <th>Data Fine Estensione </th>
                    <th>Importo Interno Estensione (€)</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {listItems}
            </tbody>
        </Table>
    )
}