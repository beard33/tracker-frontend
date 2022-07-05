import React from 'react';
import RouterApp from './routers/RouterApp';
import { BrowserRouter as Router } from "react-router-dom";
import AuthVerify from './services/AuthVerifyService';
import { createBrowserHistory } from "history";
import AuthService from './services/AuthenticationService';
import { connect } from 'react-redux';
import { logout, refreshToken } from './redux/Actions';

const history = createBrowserHistory();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  // refresh = () => {
  //   dispatch(refreshToken(this.props.user.refresh_token))
  // }

  logout = () => {
    dispatch(logout());    
  }

  render() {
    console.log("APP ENTRY");
    return (

      <div style={{ heigth: "100%" }}>
        <Router history={history}>
          <RouterApp />
          <AuthVerify logout={this.logout} />
        </Router>
      </div>

    )
  }
}
const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App);

