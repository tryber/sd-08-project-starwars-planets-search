import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function FilterNumbers() {
  const { handlePreferences, columnOptions,
    filterComparison, handleClick } = useContext(StarWarsContext);
  return (
    <>
      <select data-testid="column-filter" onChange={ handlePreferences }>
        {columnOptions.map((key) => (
          <option key={ key }>{key}</option>
        ))}
      </select>
      <select data-testid="comparison-filter" onChange={ handlePreferences }>
        {filterComparison.map((key) => (
          <option key={ key }>{key}</option>
        ))}
      </select>
      <input
        data-testid="value-filter"
        key="value"
        onChange={ handlePreferences }
        type="number"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </>
  );
}

export default FilterNumbers;
