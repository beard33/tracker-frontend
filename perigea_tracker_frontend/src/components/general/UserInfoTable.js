import * as React from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';


export default function UserInfoTable(props) {

    const getAuthorithiesList = (scope) => {
        const list = scope.split(" ")
        return list
    }




    return (
        <React.Fragment>

            <Table striped bordered hover variant="dark" style={{ marginTop: "20px", width: "50%", marginLeft: "25%" }} >
               
                <tbody style={{textAlign: "center"}}>
                    <tr>
                        <td>{"USERNAME"}</td>
                        <td>{props.username}</td>
                    </tr>
                    <tr>
                        <td>{"EMAIL"}</td>
                        <td>{props.mail}</td>
                    </tr>
                    <tr>
                        <td>{"AUTHORITIES"}</td>
                        <td>
                            {
                               getAuthorithiesList(props.scope).map((role, index) => <p style={{marginBottom: "0.5%"}}>{role}</p>)
                            }
                        </td>
                    </tr>
                </tbody>
            </Table>

        </React.Fragment>
    )
}