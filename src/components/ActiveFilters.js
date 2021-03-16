import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function ActiveFilters() {
  const { filters, setFilters, columns, setColumns } = useContext(PlanetsContext);
  const { filterByNumericValues } = filters;

  const handleDeleteFilter = (column) => {
    setColumns([...columns, column]);
    setFilters({
      ...filters,
      filterByNumericValues: filterByNumericValues.filter((eachFilter) => (
        eachFilter.column !== column
      )),
    });
  };

  return (
    <>
      {filterByNumericValues.map((eachFilter) => {
        const { column, comparison, value } = eachFilter;
        if (!column) return '';
        return (
          <section key={ column } data-testid="filter">
            <span>{`${column} | ${comparison} | ${value}`}</span>
            <button type="button" onClick={ () => handleDeleteFilter(column) }>X</button>
          </section>
        );
      })}
    </>
  );
}
