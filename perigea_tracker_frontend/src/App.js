import React from 'react';
import RouterApp from './routers/RouterApp';
import { BrowserRouter as Router } from "react-router-dom";
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    console.log("APP ENTRY");
    return (
    
        <div style={{ heigth: "100%" }}>
          <Router history={history}>
            <RouterApp />
          </Router>
        </div>
      
    )
  }
}

export default App;