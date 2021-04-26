import React, { useContext } from 'react';
import Context from '../context';
import { filterOptions } from '../services';

function FiltersChoices() {
  const { filter, setFilter, filters, setFilters } = useContext(Context);

  const removeFilter = (i, column) => {
    const newFilter = { ...filter };
    newFilter.filterByNumericValues.splice(i, 1);
    setFilter(newFilter);
    const newFilters = [...filters];
    newFilters.splice(filterOptions.indexOf(column), 0, column);
    setFilters(newFilters);
  };

  if (filter.filterByNumericValues) {
    return filter.filterByNumericValues
      .map(({ column, comparison, value }, i) => (
        <div key={ i } data-testid="filter">
          <span>
            {`${column} ${comparison} ${value}`}
            {' '}
          </span>
          <button type="button" onClick={ () => removeFilter(i, column) }>X</button>
        </div>));
  }
  return '';
}

export default FiltersChoices;
