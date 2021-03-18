import React, { useContext } from 'react';
import SWPlanetsContext from '../context/SWPlanetsContext';
import '../styles/header.css';

function SelectedFilter() {
  const {
    filtersPlanets,
    setFiltersPlanets,
    columns,
    setColumns,
  } = useContext(SWPlanetsContext);
  const { filterByNumericValues } = filtersPlanets;

  const handleDelete = (column) => {
    setColumns([...columns, column]);
    setFiltersPlanets({
      ...filtersPlanets,
      filterByNumericValues: filterByNumericValues.filter((filter) => (
        filter.column !== column
      )),
    });
  };

  return (
    <div>
      {filterByNumericValues.map((filter) => {
        const { column, comparison, value } = filter;
        if (!column) return 'Sem filtros.';
        return (
          <div key={ column } data-testid="filter" className="selected-filter">
            <p>{`${column} - ${comparison} - ${value}`}</p>
            <button
              onClick={ () => handleDelete(column) }
              type="button"
              className="button-filter"
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default SelectedFilter;
