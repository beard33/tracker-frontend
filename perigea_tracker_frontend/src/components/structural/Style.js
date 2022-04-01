//style applica a tutti i componenti le impostazioni

import React from 'react';

const AllStyles = {
  "view": {
    color: '#d8dbdb',
    fontWeight: 'lighter'
  },
  "another-thing": {
    backgroundColor: '#d8dbdb'
  }
};

export default function Style( props ) {
  return(
    <div className="view-style" style={AllStyles["view"]}> 
      {props.children}    
    </div>
  )
}