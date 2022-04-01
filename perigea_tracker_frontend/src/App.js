import React from 'react';
import RouterApp from './routers/RouterApp';
import { BrowserRouter as Router } from "react-router-dom"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { }
  }
  
  render() {
    console.log("APP ENTRY");
    return (
      <div RouterDiv style={{heigth:"100%"}}>
        <Router>
          <RouterApp/> 
        </Router>
      </div>
    )
  }
}

export default App;