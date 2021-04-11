import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Ordenar() {
  const { filters, setFilters } = useContext(PlanetsContext);

  const [ordenarPor, setOrdenar] = useState({
    column: 'name',
    sort: 'ASC',
  });

  const { column, sort } = ordenarPor;

  const columns = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'terrain',
    'surface_water',
    'population',
  ];

  const ordenar = () => {
    setFilters({
      ...filters,
      order: {
        column,
        sort,
      },
    });
  };

  const mudar = ({ target }) => {
    setOrdenar({
      ...ordenarPor,
      [target.name]: target.value,
    });
  };

  return (
    <>
      <select
        value={ column }
        name="column"
        onChange={ mudar }
        data-testid="column-sort"
      >
        {columns.map((index) => (
          <option key={ index }>{index}</option>
        ))}
      </select>
      <span>
        <label htmlFor="ASC">
          Ascendente
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            value="ASC"
            id="ASC"
            name="sort"
            onChange={ mudar }
          />
        </label>
        <label htmlFor="DESC">
          Descendente
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            value="DESC"
            id="DESC"
            onChange={ mudar }
            name="sort"
          />
        </label>
      </span>
      <button type="button" data-testid="column-sort-button" onClick={ ordenar }>
        Ordenar
      </button>
    </>
  );
}
