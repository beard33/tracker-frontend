import React from 'react';
import { Link } from 'react-router-dom';
import { link } from '../../redux/Actions';
import { connect } from 'react-redux';

function AddButton(props) {

    return (
        <React.Fragment>
            <div className="box-card">
                <Link to={{
                    pathname: props.pathname,
                    state: { update: false }
                }}
                    style={{ textDecoration: "none" }}>
                    <button
                        className="add-card-show-button" onClick={() => {props.dispatch(link())}}
                    >
                        {props.buttonName}
                    </button>
                </Link>
            </div>
        </React.Fragment>
    )
} 
export default connect()(AddButton);