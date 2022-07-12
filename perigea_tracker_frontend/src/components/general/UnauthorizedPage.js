import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { redirect } from '../../redux/Actions';


function UnauthorizedPage() {

  useEffect(() => {
    if (!props.navBar) {
      props.dispatch(redirect(props.location))
    }
  }, []);

  return (
    <h1> UNAUTHORIZED</h1>
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
export default withRouter(connect(mapStateToProps)(UnauthorizedPage));