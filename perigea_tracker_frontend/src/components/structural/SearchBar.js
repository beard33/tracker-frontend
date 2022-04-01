//componente generico che continene elementi card utente cliente dipendente..

import React from 'react';

const SearchBar = ({ onChange, query }) => {

  return (
    
    <input type="search" 
    className="search-button" 
    id="centered-toggle-button" 
    size="30" 
    placeholder="Cerca dipendente" 
    onChange={onChange} 
    value={query}>
    </input>
  );

};

export default SearchBar;