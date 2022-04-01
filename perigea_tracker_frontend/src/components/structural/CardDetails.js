//componente generico per dettagli delle card

import React from 'react';
import PropTypes from 'prop-types';

export default function CardDetails({name, lastName}) {
  return(
    <div className="card-details">
      {name} 
      &nbsp;
      {lastName}
    </div>
  )
}

CardDetails.propTypes = {
  name: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
}