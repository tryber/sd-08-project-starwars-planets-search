import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function SortTableForm() {
  const { filters, setFilters } = useContext(PlanetsContext);

  const [sortOrder, setSortOrder] = useState({
    column: '',
    sort: '',
  });

  const { column, sort } = sortOrder;

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

  const handleClick = () => {
    setFilters({
      ...filters,
      order: {
        column,
        sort,
      },
    });
  };

  const handleChange = ({ target }) => {
    setSortOrder({
      ...sortOrder,
      [target.name]: target.value,
    });
  };

  return (
    <div>
      Sorted By:
      <select
        value={ column }
        name="column"
        onChange={ handleChange }
        data-testid="column-sort"
      >
        {columns.map((columnOption) => (
          <option key={ columnOption }>{columnOption}</option>
        ))}
      </select>
      <div>
        <label htmlFor="ASC">
          Ascendent
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            value="ASC"
            id="ASC"
            name="sort"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="DESC">
          Descendent
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            value="DESC"
            id="DESC"
            onChange={ handleChange }
            name="sort"
          />
        </label>
      </div>
      <button type="button" data-testid="column-sort-button" onClick={ handleClick }>
        SORT
      </button>
    </div>
  );
}
