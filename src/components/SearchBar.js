import React, { useContext } from 'react';
import ContextApi from '../context/Context';

function SearchBar() {
  const { filterByName, setFilterName } = useContext(ContextApi);
  return (
    <label htmlFor="search">
      Buscar por nome:
      <input
        type="text"
        name="search"
        id="search"
        data-testid="name-filter"
        value={ filterByName }
        onChange={ (ev) => setFilterName(ev.target.value) }
      />
    </label>
  );
}

export default SearchBar;
