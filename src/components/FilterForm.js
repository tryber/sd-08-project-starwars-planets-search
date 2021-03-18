import React, { useContext } from 'react';
import FilterContext from '../context/FilterContext';

function FilterForm() {
  const { filterName, filterSelected, handleClick,
    query, filterColumn, size } = useContext(FilterContext);
  return (
    <fieldset>
      <label htmlFor="Name">
        Name:
        <input
          data-testid="name-filter"
          type="text"
          onChange={ filterName }
          value={ query }
        />
      </label>
      <select data-testid="column-filter" onChange={ filterSelected }>
        {filterColumn.map((key) => (
          <option key={ key }>{key}</option>
        ))}
      </select>
      <select data-testid="comparison-filter" onChange={ filterSelected }>
        {size.map((key) => (
          <option key={ key }>{key}</option>
        ))}
      </select>
      <input
        key="value"
        onChange={ filterSelected }
        type="number"
        data-testid="value-filter"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar

      </button>
    </fieldset>
  );
}

export default FilterForm;
