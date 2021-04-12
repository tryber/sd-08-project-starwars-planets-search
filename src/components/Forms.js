import React, { useContext } from 'react';
import FilterContext from '../context/Context';

function Forms() {
  const { filterName, filterPreferences, handleClick,
    searchName, columnOptions, size } = useContext(FilterContext);
  return (
    <fieldset>
      <label htmlFor="Name">
        Name:
        <input
          data-testid="name-filter"
          type="text"
          onChange={ filterName }
          value={ searchName }
        />
      </label>
      <select data-testid="column-filter" onChange={ filterPreferences }>
        {columnOptions.map((key) => (
          <option key={ key }>{key}</option>
        ))}
      </select>
      <select data-testid="comparison-filter" onChange={ filterPreferences }>
        {size.map((key) => (
          <option key={ key }>{key}</option>
        ))}
      </select>
      <input
        key="value"
        onChange={ filterPreferences }
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

export default Forms;
