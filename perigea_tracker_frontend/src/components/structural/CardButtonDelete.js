//componente button per delete

import React from 'react';

const CardButtonDelete = ({ profileButton, keyCard, deleteButton }) => {
  function deleteKeyCard() {
    deleteButton(keyCard);
  }

  return (
    <div >
      <button className="card-button-delete" type="button" onClick={deleteKeyCard}>
        {profileButton}
      </button>  
    </div>
  );
};

export default CardButtonDelete;