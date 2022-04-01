//componente button per update

import React from 'react';

const CardButtonUpdate = ({ 
  profileButton, 
  keyCardUpdate, 
  visualizzaForm, 
  disabilitaButton, 
  keyCard }) => {

  function showModal() {
    visualizzaForm(keyCardUpdate);
  }

  function disabledButton() {
    disabilitaButton(keyCard);
  }

  return (
    <div >
      <button className="card-button-update" type="button" disabled={!disabledButton} onClick={showModal}>
        {profileButton}
      </button>  
    </div>
  );

};

export default CardButtonUpdate;