import React, { useContext } from 'react';
import SWContext from '../context/SWContext';

function SelectedFilters() {
  const { filters, setFilters, columns, setColumns } = useContext(SWContext);
  const { filterByNumericValues } = filters;

  function handleDelete(column) {
    setColumns([...columns, column]);
    setFilters({
      ...filters,
      filterByNumericValues: filterByNumericValues.filter((newFilter) => (
        newFilter.column !== column
      )),
    });
  }

  return (
    <div>
      {filterByNumericValues.map((option, index) => {
        const { column, comparison, value } = option;
        if (!column) return <span key={ index } />;
        return (
          <div key={ index } data-testid="filter">
            <span>{`Options: 1: ${column} 2: ${comparison} 3: ${value}`}</span>
            <button onClick={ () => handleDelete(column) } type="button">X</button>
          </div>
        );
      })}
    </div>
  );
}

export default SelectedFilters;
