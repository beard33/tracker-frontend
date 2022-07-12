//barra di navigazione inferiore contenente la posizione e il percorso

import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { titleBarClick } from '../../redux/Actions';
import { connect } from 'react-redux';

function Title(props) {

  const duplicateControl = (list) => {
    let elements = [];
    list.map((item) => {
      let info = elements.find((el) => el.location.pathname === item.location.pathname)
      if (info) {
        console.log("duplicato")
      } else {
        elements.push(item)
      }      
    })
    return elements
  }

  //ritorna gli elementi del percorso con relativo link                
  const pathItems = (elements) => {

    return (
      <div >
        {elements.map((value, index) => {        

          if (value.id !== elements.length) {
            return (
              <Link
                to={{ pathname: value.location.pathname, state: value.location.state }}
                key={index}
                onClick={() => {props.dispatch(titleBarClick(value.id))}}
                style={{ color: "white", textDecoration: "none" }}>
                {upperCaseItem(value) + ' > '}
              </Link>
            )
          } else {
            return (
              <Link
                to={{ pathname: value.location.pathname, state: value.location.state }}
                key={index}
                onClick={() => {props.dispatch(titleBarClick(value.id))}}
                style={{ color: "white", textDecoration: "none" }}>
                {upperCaseItem(value)}
              </Link>
            )
          }
        }
        )}
      </div>
    )
  };

  //ritorna elemento del percorso con lettera maiuscola
  const upperCaseItem = (value) => {
    let array = value.location.pathname.split("/")

    return (
      array[1].charAt(0).toUpperCase() + array[1].slice(1).toLowerCase()
    )
  };


  return (
    <div className="page-titles" style={{ width: "100%", borderBottomRightRadius: "80%" }} >
      <div className="position">
        <div className="position-text">{pathItems(duplicateControl(props.history))}</div>
      </div>



    </div>
  )

}
const mapStateToProps = (state) => {

  return {
    user: state.user,
    counter: state.counter,
    history: state.history,
    navBar: state.navBar
  }
}

export default withRouter(connect(mapStateToProps)(Title));