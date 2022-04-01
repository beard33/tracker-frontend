//componente che indirizza alla pagina principale

import { useHistory } from "react-router-dom";
import React from 'react';
export default function HomeButton() {
  const history = useHistory();

  function handleClick() {
    history.push("/");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}