import { FormControl, InputLabel } from '@mui/material';
import React from 'react';
import { ruoli } from './RuoliEnum';
import { MenuItem } from '@mui/material';

import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class Ruoli extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ruoli: []
        }
    }

    handleAddRole = (ruolo) => {
        this.setState((prevState) => ({
            ruoli: prevState.ruoli.concat(ruolo)
        }));
        console.log(ruolo)
        console.log(this.state.ruoli)
    };

    updateAnagraficaState = (ruolo) => {
        this.handleAddRole(ruolo);
        this.props.updateState(this.state.ruoli)
    }



    render() {
        return (
            <React.Fragment>
                <div className="info">

                    <FormControl style={{ width: "50%", margin: "0% 0% 0% 25%"}}>
                        <InputLabel >Ruoli</InputLabel>
                        <Select
                            
                            labelId="Insert roles-label"
                            id="Insert Roles"
                            label="Ruolo"
                            multiple
                            value={this.state.ruoli}
                            onChange={(e) => {
                                console.log(e.value)
                                this.updateAnagraficaState(e.target.value)
                            }}
                            MenuProps={MenuProps}
                        >
                            {ruoli.map((option) => (
                                <MenuItem key={option.id} value={(JSON.stringify(option))} >

                                    <Checkbox checked={this.state.ruoli.indexOf(option) > -1} />
                                    {option.id + " " + option.descrizione}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </React.Fragment>
        )
    }
}
export default Ruoli;