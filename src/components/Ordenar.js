import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/Context';

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

  const set = ({ target }) => {
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
        onChange={ set }
        data-testid="column-sort"
      >
        {columns.map((index) => (
          <option key={ index }>{index}</option>
        ))}
      </select>
      <span>
        <label htmlFor="ASC">
          Crescente
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            value="ASC"
            id="ASC"
            name="sort"
            onChange={ set }
          />
        </label>
        <label htmlFor="DESC">
          Decrecente
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            value="DESC"
            id="DESC"
            onChange={ set }
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
