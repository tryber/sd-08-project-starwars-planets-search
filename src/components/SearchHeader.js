import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function SearchHeader() {
  const {
    filterName,
    filterColumn,
    filterComparison,
    filterValue,
    buttonFilter,
    newColumn,
  } = useContext(StarWarsContext);

  const comparisonName = ['maior que', 'menor que', 'igual a'];

  return (
    <div>
      <input
        type="text"
        onChange={ (event) => filterName(event.target.value) }
        data-testid="name-filter"
      />
      <select
        onChange={ (event) => filterColumn(event.target.value) }
        data-testid="column-filter"
      >
        { newColumn.map(
          (
            column,
          ) => <option key={ column } value={ column }>{ column }</option>,
        )}
      </select>
      <select
        onChange={ (event) => filterComparison(event.target.value) }
        data-testid="comparison-filter"
      >
        { comparisonName.map(
          (
            comparison,
          ) => <option key={ comparison } value={ comparison }>{ comparison }</option>,
        )}
      </select>
      <input
        type="number"
        onChange={ (event) => filterValue(event.target.value) }
        data-testid="value-filter"
      />
      <button
        type="button"
        onClick={ () => buttonFilter() }
        data-testid="button-filter"
      >
        Filter
      </button>
    </div>
  );
}

export default SearchHeader;
