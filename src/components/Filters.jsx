import React from 'react';

import Planets from '../context/PlanetsContext';

function Filters() {
  const { store: {
    filters, setFilters, columns, setColumns,
  } } = React.useContext(Planets);

  const { filterByNumericValues } = filters;

  function removeFilter(filter) {
    const newArray = filterByNumericValues
      .filter((item) => item.column !== filter.column);
    console.log(newArray);
    setFilters({ ...filters, filterByNumericValues: newArray });
    setColumns([...columns, filter.column]);
  }

  return (
    <div>
      {filterByNumericValues.length !== 0 && (
        filterByNumericValues.map((filter, index) => (
          <span key={ index } data-testid="filter">
            {filter.column}
            <button type="button" onClick={ () => removeFilter(filter) }>x</button>
          </span>))
      )}
    </div>
  );
}

export default Filters;
