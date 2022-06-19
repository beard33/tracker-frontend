import React from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import Typography from '@mui/material/Typography';


export default function DeleteModal(props) {
    return (
        <React.Fragment>
            <Modal className="modal-lg" isOpen={props.open} toggle={props.toggle} >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myLargeModalLabel">Eliminazione Dati</h5>
                    <button onClick={props.close} className="button-close" title='esci' >
                        <img className="menu" src="./images/exit.png"></img>
                    </button>
                </div>
                <ModalBody className="postPropsStyle">
                    <Typography className='modalText' style={{ fontSize: "150%" }}>
                       {props.typography}
                    </Typography>
                </ModalBody>
                <ModalFooter>
                    <button className='modalBackButton' title='annulla' onClick={props.close}>
                        <img className="menu" src="./images/annulla.png"></img>
                    </button>
                    <button className='modalDeleteButton' title='conferma' onClick={() => { props.delete(props.keyCode) }}>
                        <img className="menu" src="./images/conferma.png"></img>
                    </button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    )
}