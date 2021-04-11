import React, { useContext } from 'react';
import PlanetsContext from '../context/Context';

export default function ActiveFilters() {
  const { filters, setFilters, columns, setColumns } = useContext(PlanetsContext);
  const { filtrarPorNumero } = filters;

  const handleDeleteFilter = (column) => {
    setColumns([...columns, column]);
    setFilters({
      ...filters,
      filtrarPorNumero: filtrarPorNumero.filter((eachFilter) => (
        eachFilter.column !== column
      )),
    });
  };

  return (
    <>
      {filtrarPorNumero.map((eachFilter) => {
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
