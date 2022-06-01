// import { FormControl, InputLabel } from '@mui/material';
// import React from 'react';
// import { ruoli} from '../enum/RuoliEnum'
// import { MenuItem } from '@mui/material';

// // import Select from '@mui/material/Select';
// // import Checkbox from '@mui/material/Checkbox';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };

// class Ruoli extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             ruoli: []
//         }
//     }

//     handleAddRole = (ruolo) => {
//         this.setState((prevState) => ({
//             ruoli: prevState.ruoli.concat(ruolo)
//         }));
//         console.log(ruolo)
//         console.log(this.state.ruoli)
//     };

//     updateAnagraficaState = (ruolo) => {
//         this.handleAddRole(ruolo);
//         this.props.updateState(this.state.ruoli)
//     }



//     render() {
//         return (
//             <React.Fragment>
//                 <div className="info">

//                     <FormControl style={{ width: "50%", margin: "0% 0% 0% 25%"}}>
//                         <InputLabel >Ruoli</InputLabel>
//                         <Select

//                             labelId="Insert roles-label"
//                             id="Insert Roles"
//                             label="Ruolo"
//                             multiple
//                             value={this.state.ruoli}
//                             onChange={(e) => {
//                                 console.log(e.value)
//                                 this.updateAnagraficaState(e.target.value)
//                             }}
//                             MenuProps={MenuProps}
//                         >
//                             {ruoli.map((option) => (
//                                 <MenuItem key={option.id} value={(JSON.stringify(option))} >

//                                     <Checkbox checked={this.state.ruoli.indexOf(option) > -1} />
//                                     {option.id + " " + option.descrizione}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                 </div>
//             </React.Fragment>
//         )
//     }
// }
// export default Ruoli;

import * as React from 'react';
import { useState, useEffect } from 'react';
import { ruoli } from '../enum/RuoliEnum'
import TextField from '@material-ui/core/TextField';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { MenuItem } from '@mui/material';


export default function Ruoli(props) {
    const [ruolo, setRuolo] = useState("")

    const handleChange = (e) => {
        console.log(e.target.value)
        setRuolo(e.target.value)
    }

    const addRole = () => {
        console.log(ruolo)
        props.updateState(ruolo)
        setRuolo("")
    }

    return (
        <React.Fragment>
            <Form
                className='postStyleProps'

            >
                <h5 style={{ marginRight: "15%" }}>add Ruoli</h5>
                <div className='info' style={{
                    width: "70%", marginLeft: "15%", paddingTop: "1%", paddingBottom: "1%"
                }}>
                    <Form.Group style={{ width: "100%" }}>
                        <TextField
                            style={{ width: "70%", marginLeft: "13%" }}
                            id="select stato"
                            select
                            name='costoNotaSpese'
                            label="Ruolo"
                            value={ruolo}
                            onChange={handleChange}
                        >
                            {ruoli.map((option) => (
                                <MenuItem key={option.id} value={(JSON.stringify(option))} >
                                    {option.id + " " + option.descrizione}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button className='noteSpese-button'
                            onClick={addRole}
                            title="add Ruolo"
                            style={{ marginLeft: "2%", marginTop: "1%" }}                        >
                            <img className="menu" src="./images/add.png"></img>
                        </Button>
                    </Form.Group>
                </div>
            </Form>

        </React.Fragment>
    )

}