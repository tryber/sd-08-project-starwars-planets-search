import React, { useState, useContext } from 'react';
import Context from '../context/Context';

export default function OrderInputFilter() {
  const [temporaryOrderColumn, setTemporaryOrderColumn] = useState('name');
  const [temporaryOrderDirection, setTemporaryOrderDirection] = useState('ASC');
  const { data, setFilters } = useContext(Context);
  const sendOrderFilter = () => {
    setFilters((prevState) => ({
      ...prevState,
      order: {
        column: temporaryOrderColumn,
        sort: temporaryOrderDirection,
      },
    }));
  };
  if (!data.length) return <p>Carregando...</p>;
  return (
    <div>
      <select
        data-testid="column-sort"
        name="column-sort"
        onChange={ (e) => setTemporaryOrderColumn(e.target.value) }
      >
        {Object.keys(data[0]).map((column, index) => (
          <option
            key={ index }
            value={ column }
          >
            {column}
          </option>
        ))}
      </select>
      <label htmlFor="ASC">
        Filtrar por ordem Asc.
        <input
          type="radio"
          name="order"
          value="ASC"
          data-testid="column-sort-input-asc"
          id="ASC"
          onChange={ (e) => setTemporaryOrderDirection(e.target.value) }
          checked={ temporaryOrderDirection === 'ASC' }
        />
      </label>
      <label htmlFor="DESC">
        Filtrar por ordem Desc.
        <input
          type="radio"
          name="order"
          value="DESC"
          data-testid="column-sort-input-desc"
          id="DESC"
          onChange={ (e) => setTemporaryOrderDirection(e.target.value) }
          checked={ temporaryOrderDirection === 'DESC' }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ sendOrderFilter }
      >
        Ordenar
      </button>
    </div>
  );
}
