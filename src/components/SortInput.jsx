import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

function SortInput() {
  const { setFilters, filters } = useContext(PlanetContext);
  const [sortBy, setSortBy] = useState({
    column: 'name',
    sort: 'ASC',
  });

  const columns = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'terrain',
    'surface_water',
    'population',
  ];

  function handleChange({ target }) {
    setSortBy({
      ...sortBy,
      [target.name]: target.value,
    });
  }

  function handleClick() {
    setFilters({
      ...filters,
      order: sortBy,
    });
  }

  return (
    <>
      <select name="column" data-testid="column-sort" onChange={ handleChange }>
        {columns.map((item, i) => <option key={ i } value={ item }>{item}</option>) }
      </select>
      <label htmlFor="ASC">
        Ascendent:
        <input
          type="radio"
          value="ASC"
          id="ASC"
          name="sort"
          data-testid="column-sort-input-asc"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="DSC">
        Descendent:
        <input
          type="radio"
          value="DSC"
          id="DSC"
          name="sort"
          data-testid="column-sort-input-desc"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleClick }
      >
        Sort
      </button>
    </>
  );
}

export default SortInput;
