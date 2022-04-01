//componente generico che contiene a sua volta un altro componente - per ora solo card

import React from 'react';

export default function Box( props ) {
  return(
    <div className={`box-${props.className}`}> 
      {props.children}    
    </div>
  )
}