//pagine di esempio per button ancora non associati a nessun componente

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { redirect } from '../../redux/Actions';
import { useEffect } from 'react';


function Message(props) {


  useEffect(() => {
    if (!props.navBar) {
      props.dispatch(redirect(props.location))
    }
  }, []);

  return (
    <React.Fragment>
      <div>
        <h1>WORK IN PROGRESS</h1>
      </div>
    </React.Fragment>
  )
}
const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.user,
    counter: state.counter,
    history: state.history,
    navBar: state.navBar
  }
}

export default withRouter(connect(mapStateToProps)(Message));