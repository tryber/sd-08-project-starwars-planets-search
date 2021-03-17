import React, { useContext } from 'react';
import PlanetContext from '../contexts/PlanetContext';

function FilterByColumn() {
  const { filters, setFilters } = useContext(PlanetContext);

  const {
    filterByColumnForm: [{ column, comparison, value }],
    filterByNumericValues,
  } = filters;

  function handleChangeByColumn({ target }) {
    if (target.id === 'column') {
      setFilters({
        ...filters,
        filterByColumnForm: [{ column: target.value, comparison, value }],
      });
    }
    if (target.id === 'comparison') {
      setFilters({
        ...filters,
        filterByColumnForm: [{ column, comparison: target.value, value }],
      });
    }
    if (target.id === 'value') {
      setFilters({
        ...filters,
        filterByColumnForm: [{ column, comparison, value: target.value }],
      });
    }
  }

  function handleFilterClick() {
    if (column && comparison && value) {
      setFilters({
        ...filters,
        filterByNumericValues: [...filterByNumericValues, { column, comparison, value }],
        filterByColumnForm: [{ column: '', comparison: '', value: '' }],
      });
    }
  }

  function generateOptions() {
    const allOptions = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];
    let filterOptions = [];
    if (filterByNumericValues.length > 0) {
      const usedFilters = filterByNumericValues.map((filter) => filter.column);
      usedFilters.forEach((filter) => {
        filterOptions = allOptions.filter((option) => option !== filter);
      });
    } else {
      filterOptions = allOptions;
    }

    return (
      <label htmlFor="column">
        Filter by column:
        <select
          id="column"
          value={ column }
          onChange={ (e) => handleChangeByColumn(e) }
          data-testid="column-filter"
        >
          {
            filterOptions.map((op) => (
              <option key={ op } value={ op }>{ op }</option>
            ))
          }
        </select>
      </label>
    );
  }

  return (
    <div>
      { generateOptions() }
      <label htmlFor="comparison">
        Comparison operator:
        <select
          id="comparison"
          value={ comparison }
          onChange={ (e) => handleChangeByColumn(e) }
          data-testid="comparison-filter"
        >
          <option value="" disabled>choose here</option>
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="filterByNumericValues">
        By the value:
        <input
          type="number"
          id="value"
          name="filterByNumericValues"
          value={ value }
          onChange={ (e) => handleChangeByColumn(e) }
          data-testid="value-filter"
        />
      </label>
      <button
        type="button"
        onClick={ () => handleFilterClick() }
        data-testid="button-filter"
      >
        Filter
      </button>
    </div>
  );
}

export default FilterByColumn;
