import React from 'react';
import { Link } from 'react-router-dom';

export default function AddButton(props) {

    return (
        <React.Fragment>
            <div className="box-card">
                <Link to={{
                    pathname: props.pathname,
                    updateProps: { update: false }
                }}
                    style={{ textDecoration: "none" }}>
                    <button
                        className="add-card-show-button"
                    >
                        {props.buttonName}
                    </button>
                </Link>
            </div>
        </React.Fragment>
    )
} 