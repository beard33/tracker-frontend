import { TextField } from '@mui/material';
import React from 'react';
const Ruoli = (props) => (
    <div>


        <ul className="roles-list">
            {props.ruoli.map((ruolo) => (
                <li color='black'>{ruolo}</li>
            ))
            }
        </ul>

    </div>
);
export default Ruoli;