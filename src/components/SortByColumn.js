import React, { useState, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const selectOptions = [
  'name',
  'rotation_period',
  'orbital_period',
  'diameter',
  'climate',
  'terrain',
  'surface_water',
  'population',
];

export default function SortByColumn() {
  const { setFilters, filters } = useContext(PlanetsContext);

  const [dataSort, setDataSort] = useState(
    { column: 'name',
      sort: '',
    },
  );

  const handleChange = (name, value) => {
    setDataSort({ ...dataSort, [name]: value });
  };
  const handleClick = () => {
    setFilters({ ...filters, ...{ order: dataSort } });
  };

  return (
    <>
      <select
        name="column"
        data-testid="column-sort"
        onChange={ ({ target: { name, value } }) => handleChange(name, value) }
      >
        { selectOptions.map((element, index) => (
          <option key={ index }>
            {element}
          </option>
        ))}
      </select>
      <label htmlFor="DESC">
        DES
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          name="sort"
          value="DESC"
          onChange={ ({ target: { name, value } }) => handleChange(name, value) }
        />
      </label>

      <label htmlFor="ASC">
        ASC
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          name="sort"
          value="ASC"
          onChange={ ({ target: { name, value } }) => handleChange(name, value) }
        />
      </label>

      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ () => handleClick() }
      >
        Ordenar
      </button>

    </>
  );
}
