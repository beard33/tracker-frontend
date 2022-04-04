//barra di navigazione inferiore contenente la posizione e il percorso

import React from 'react';
import { Link } from "react-router-dom";

export default class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.path = this.path.bind(this);
    this.pathItems = this.pathItems.bind(this);
  }

  //ritorna array con percorso diviso 
  path = () => {
    var array = location.pathname.split("/");
    array.splice(0,1);

    return(
      array
    )
  };

  //ritorna gli elementi del percorso con relativo link                
  pathItems = (elements) => {
    return(
      <div className="path">
        {elements.map((value, index) => {
          if(index < elements.length-1){     
            return(      
              <Link to={location.pathname} key={index}>{this.upperCaseItem(value)+'>'}</Link>   
            ) 
          } else {
            return(      
              <div className="path-text" key={index}>{this.upperCaseItem(value)}</div>         
            ) 
          }
        })}
      </div>
    )
  };

  //ritorna elemento del percorso con lettera maiuscola
  upperCaseItem = (position) => {
    position = position.slice(0,1).toUpperCase() + position.slice(1,position.length);
    return(
      position
    )
  };

  render() {
    return (
      <div className="page-titles" >
        <div className="position">
        <div className="position-text">{this.upperCaseItem(this.path()[this.path().length-1])}</div>
        </div>
        
          {this.pathItems(this.path())}

      </div>
    )
  }
}