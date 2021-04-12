import React, { useContext } from 'react';
import StarWarsPlanetsContext from '../context/StarWarsPlanetsContext';
import NumericFilter from './NumericFilter';
import TextFilter from './TextFilter';
import removeX from '../images/x.jpg';

function Filters() {
  const {
    filters,
    setFilters,
  } = useContext(StarWarsPlanetsContext);

  const removeFilter = (filterColumn) => {
    const newColumnsOptions = filters.columnsOptions.concat(filterColumn);
    setFilters({
      ...filters,
      filterByNumericValues: filters.filterByNumericValues
        .filter((numericFilter) => numericFilter.column !== filterColumn),
      columnsOptions: newColumnsOptions,
    });
  };

  return (
    <div className="filters">
      <div className="filters-input">
        <TextFilter />
        <NumericFilter />
      </div>
      <div className="selected-filters">
        {filters.filterByNumericValues.map((filter) => (
          <div
            key={ filter.column }
            data-testid="filter"
          >
            <button
              type="button"
              value={ filter.column }
              onClick={ ({ target }) => removeFilter(target.value) }
            >
              <p>X</p>
              <img
                className="remove-x"
                alt="botão de remover filtro"
                src={ removeX }
              />
              <p>{filter.column}</p>
              <p>{filter.comparison}</p>
              <p>{filter.value}</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filters;
