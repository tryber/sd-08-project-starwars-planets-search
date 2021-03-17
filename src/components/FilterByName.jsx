import React, { useContext } from 'react';
import PlanetContext from '../contexts/PlanetContext';

function FilterByName() {
  const { filters, setFilters } = useContext(PlanetContext);
  const { filterByName: { name } } = filters;

  function handleChangeByName({ target }) {
    const { id, value } = target;
    setFilters({ ...filters, filterByName: { [id]: value } });
  }

  return (
    <label htmlFor="filterByName">
      <input
        type="text"
        id="name"
        name="filterByName"
        value={ name }
        onChange={ (e) => handleChangeByName(e) }
        data-testid="name-filter"
      />
    </label>
  );
}

export default FilterByName;
