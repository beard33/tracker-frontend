//componente generico che continene elementi card utente cliente dipendente..

import React from 'react';

modalButtonCard = (buttonName) => {
  return(
    <div>
      <button className="card" 
        onClick={e => { this.showAddCardWindow(e); }}> 
        {buttonName}
      </button>
    </div>
  )
} 