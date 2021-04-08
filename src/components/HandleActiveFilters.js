import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function HandleActiveFilters() {
  const { filters, setFilters, columnsOp, setColumn } = useContext(PlanetsContext);
  const { filterByNumericValues } = filters;

  const DeleteFilter = (column) => {
    setColumn([...columnsOp, columnsOp]);
    setFilters({
      ...filters,
      filterByNumericValues: filterByNumericValues.filter((target) => (
        target.column !== column
      )),
    });
  };

  return (
    <div>
      {filterByNumericValues.map((filterType) => {
        const { column, comparison, value } = filterType;
        if (!column) return '';
        return (
          <div key={ column } data-testid="filter">
            <span>{`${column} | ${comparison} | ${value}`}</span>
            <button type="button" onClick={ () => DeleteFilter(column) }>X</button>
          </div>
        );
      })}
    </div>
  );
}
