import React, { useContext } from 'react';
import tableContext from '../context/tableContext';

export default function ListOfFilters() {
  const {
    columns,
    setColumns,
    setFilters,
    filters,
    filters: { filterByNumericValues },
  } = useContext(tableContext);

  const handleClick = ({ target: { name } }) => {
    const filterTurnToSelect = filterByNumericValues.filter(
      ({ column }) => column === name,
    );
    const filterTurnToFilter = filterByNumericValues.filter(
      ({ column }) => column !== name,
    );
    setFilters({ ...filters,
      filterByNumericValues: filterTurnToFilter });
    setColumns([...columns, filterTurnToSelect[0].column]);
  };
  return (
    <div>
      {filterByNumericValues.map((filter) => {
        const { column } = filter;

        return (
          <div key={ column } data-testid="filter">
            <div>{column}</div>
            <button
              type="button"
              name={ column }
              onClick={ handleClick }
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
}
