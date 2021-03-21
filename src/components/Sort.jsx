import React, { useState, useContext } from 'react';
import tableContext from '../context/tableContext';

const Sort = () => {
  const { filters, setFilters } = useContext(tableContext);
  const [columnSort, setColumnSort] = useState({ column: 'Name', sort: 'ASC' });
  const { column } = columnSort;
  const columns = [
    'name',
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const handleInput = ({ target }) => {
    setColumnSort({ ...columnSort, [target.name]: target.value });
  };

  const handleClick = () => {
    setFilters({ ...filters, order: { ...columnSort } });
  };

  return (
    <section>
      <div className="sort-select">
        <label htmlFor="sort">
          Ordenar :
          <select
            value={ column }
            name="column"
            data-testid="column-sort"
            onChange={ (event) => handleInput(event) }
          >
            {
              columns.map(
                (item) => (
                  <option
                    key={ item }
                  >
                    {item}
                  </option>),
              )
            }
          </select>
        </label>
      </div>
      <div className="radio-sort">
        <label htmlFor="ASC">
          ASC
          <input
            onChange={ (event) => handleInput(event) }
            type="radio"
            name="sort"
            id="ASC"
            value="ASC"
            data-testid="column-sort-input-asc"
          />
        </label>
        <label htmlFor="DESC">
          DESC
          <input
            onChange={ (event) => handleInput(event) }
            type="radio"
            name="sort"
            id="DESC"
            value="DESC"
            data-testid="column-sort-input-desc"
          />
        </label>
      </div>
      <button
        onClick={ handleClick }
        data-testid="column-sort-button"
        type="button"
      >
        ordenar
      </button>
    </section>
  );
};

export default Sort;
