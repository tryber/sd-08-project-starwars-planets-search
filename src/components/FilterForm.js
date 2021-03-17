import React from 'react';
import { useStateValue } from '../contexts/StateContext';

const FilterForm = () => {
  const {
    filterName,
    setFilterName,
    columns,
    setColumn,
    setComparison,
    setValue,
    filterAction,
    filters: {
      filterByNumericValues: [{ column, comparison, value }],
    },
  } = useStateValue();
  const comparisonSelect = ['maior que', 'menor que', 'igual a'];
  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        value={ filterName }
        onChange={ (e) => setFilterName(e.target.value) }
      />
      <select
        data-testid="column-filter"
        onChange={ (e) => setColumn(e.target.value) }
        value={ column }
      >
        {columns.map((columnSelect, index) => (
          <option key={ index }>{columnSelect}</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ (e) => setComparison(e.target.value) }
        value={ comparison }
      >
        {comparisonSelect.map((option, index) => (
          <option key={ index }>{option}</option>
        ))}
      </select>
      <input
        data-testid="value-filter"
        type="number"
        value={ value }
        onChange={ (e) => setValue(e.target.value) }
      />
      <button data-testid="button-filter" type="button" onClick={ filterAction }>
        Filter
      </button>
    </div>
  );
};

export default FilterForm;
