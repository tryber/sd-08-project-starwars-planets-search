import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function SearchByName() {
  const {
    filters: { filterByName: { name } },
    function: { handleName },
  } = useContext(PlanetsContext);

  return (
    <label htmlFor="name-input">
      Nome:
      <input
        id="name-input"
        type="text"
        data-testid="name-filter"
        value={ name }
        onChange={ handleName }
      />
    </label>
  );
}

export default SearchByName;
