import React, { useContext, useState } from 'react';

import StarWarsContext from '../context/StarWarsContext';
import ExcludeFilter from './ExcludeFilter';

function SelectCategories() {
  const { selectColumns, setSelectColumns, filterNumeric,
    setFilterNumeric } = useContext(StarWarsContext);
  const [localNumericFilter, setLocalNumericFilter] = useState([]);

  const handleChange = ({ target: { name, value } }) => {
    setLocalNumericFilter({ ...localNumericFilter, [name]: value });
  };

  const handleClick = () => {
    setFilterNumeric([...filterNumeric, localNumericFilter]);
    setSelectColumns(selectColumns.filter((item) => item !== localNumericFilter.column));
  };

  const removeClick = (column) => {
    setSelectColumns([...selectColumns, column]);
    setFilterNumeric(filterNumeric.filter((item) => item.column !== column));
  };

  return (
    <div>
      <label htmlFor="column-filter">
        <select
          name="column"
          data-testid="column-filter"
          onChange={ handleChange }
        >
          {
            selectColumns
              .map((item, i) => <option key={ i } value={ item }>{item}</option>)
          }
        </select>
      </label>
      <label htmlFor="comparison-filter">
        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          type="number"
          name="value"
          data-testid="value-filter"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Buscar
      </button>
      <ExcludeFilter removeClick={ removeClick } filterNumeric={ filterNumeric } />
    </div>
  );
}

export default SelectCategories;
