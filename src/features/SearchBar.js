import React, { useContext } from 'react';
import MyContext from '../context';

function SearchBar() {
  const { filterByName, setFilterByName } = useContext(MyContext).filters;
  return (
    <label htmlFor="search">
      Filtrar:
      <input
        type="text"
        name="search"
        id="search"
        data-testid="name-filter"
        value={ filterByName }
        onChange={ (e) => setFilterByName(e.target.value) }
      />
    </label>
  );
}

export default SearchBar;
