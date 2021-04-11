import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function OrderForm() {
  const { filters, setFilters } = useContext(StarWarsContext);

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

  const [sortBy, setSortBy] = useState({
    column: 'name',
    sort: 'ASC',
  });

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
    <form>
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
    </form>
  );
}

export default OrderForm;
