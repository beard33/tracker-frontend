import React from 'react';

export default function FieldImage({ cardImage }) {
  return (
    <img className="card-image" src={cardImage}
      // style={{
      //   height: "65%",
      //   width: "60%",
      //   bottom: 0,
      //   transform: "scale(0.095,1.4) translateX(-310%) translateY(18%)",
      //   borderRadius: "50%",
      //   marginBottom: "0%",
      //   backgroundColor:"#333333",
      //   border: "2px solid #333333"
        
      // }}
      ></img>
  )
}