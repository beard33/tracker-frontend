import React, { Component, useState } from 'react'
import AxiosInstance from '../../axios/AxiosInstance';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import CalendarAxiosInstance from '../../axios/CalendarAxiosInstance';
import TextField from '@material-ui/core/TextField';
import { MenuItem } from '@mui/material';
import { approvalStatusEnum } from '../enum/TimesheetEnums';
import { set } from 'lodash';

export default function ApproveButton(props) {
    const [approvalModal, setApprovalModal] = useState(false)
    const [approvalStatus, setApprovalStatus] = useState("")
    const [calendarResponse, setCalendarResponse] = useState("")

    const openApprovalModal = () => {
        setApprovalModal(true)
    }

    /**
 * chiamata axios per l'aggiornamento del timesheet
 */
    const updateTimesheetStatus = async () => {
        await AxiosInstance({
            method: 'put',
            url: `timesheet/update-status/${approvalStatus}`,
            data: calendarResponse
        }).then((response) => {
            console.log("Stato di approvazione del timesheet aggiornato con successo")
            props.setSyncState()
        }).catch((error) => {
            console.log("Error into loadTimesheet ", error)
            alert("errore nello scarico")
        })
    }


    /**
     * chiamata axios per l'approvazione del timesheet da parte del responsabile 
     */
    const approveTimesheet = async () => {
        await CalendarAxiosInstance({
            method: "get",
            url: `timesheet/get-last-by-refs/${props.anno}/${props.mese}/${props.codicePersona}`,
        }).then((response) => {
            console.log(response)
            loadTimesheetEvent(response)
        }).catch((error) => {
            console.log("Error into loadTimesheet ", error)
        })
    }
    const loadTimesheetEvent = (arg) => {
        setCalendarResponse(arg.data.data)
        updateTimesheetStatus()
    }


    return (
        <React.Fragment>

            <button className='richiesta-button' title='approva timesheet' onClick={openApprovalModal}>
                <img className="menu" src="./images/approve.png"></img>
            </button>

            <Modal className="modal-lg" isOpen={approvalModal} toggle={openApprovalModal} >
                <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myLargeModalLabel">Stato di Approvazione</h5>
                    <button title='esci' onClick={() => setApprovalModal(false)} className="button-close">
                        <img className="menu" src="./images/exit.png"></img>
                    </button>
                </div>
                <ModalBody className="postPropsStyle">
                    <TextField
                        style={{ width: "100%" }}
                        id="select stato"
                        select
                        name='approvalStatus'
                        label="Stato di Approvazione"
                        value={approvalStatus}
                        required
                        onChange={(e) => {setApprovalStatus(e.target.value)}}
                    >
                        {approvalStatusEnum.map((option) => (
                            <MenuItem value={option.value} >
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                </ModalBody>
                <ModalFooter>
                    <button className='modalDeleteButton' title='conferma' onClick={() => {
                        approveTimesheet()
                        setApprovalModal(false)
                    }}>
                        <img className="menu" src="./images/conferma.png"></img>
                    </button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    )
}