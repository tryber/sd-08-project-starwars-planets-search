import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Order() {
  const { filters, setFilters, data } = useContext(PlanetsContext);
  const sortInitial = {
    column: 'name',
    sort: 'ASC',
  };
  const [sortLocal, setSortLocal] = useState(sortInitial);

  function handleClick() {
    setFilters({ ...filters, order: { ...sortLocal } });
  }

  function handleChange(e) {
    setSortLocal({
      ...sortLocal,
      sort: e.target.id,
    });
  }

  return (
    <div>
      <select
        className="form-select"
        data-testid="column-sort"
        value={ sortLocal.column }
        onChange={ (e) => setSortLocal(
          {
            ...sortLocal,
            column: e.target.value,
          },
        ) }
      >
        { data && data.dataFromAPI ? Object.keys(data.dataFromAPI[0])
          .map((col, index) => (
            <option
              key={ index }
              value={ col }
            >
              { col }
            </option>)) : false }
      </select>
      <div>
        <div className="form-check">
          <label className="form-check-label" htmlFor="ASC">
            <input
              className="form-check-input"
              type="radio"
              name="ordem"
              id="ASC"
              checked={ sortLocal.sort === 'ASC' }
              onChange={ (e) => handleChange(e) }
              data-testid="column-sort-input-asc"
            />
            ASC
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label" htmlFor="DESC">
            <input
              className="form-check-input"
              type="radio"
              name="ordem"
              id="DESC"
              checked={ sortLocal.sort === 'DESC' }
              onChange={ (e) => handleChange(e) }
              data-testid="column-sort-input-desc"
            />
            DESC
          </label>
        </div>
      </div>
      <button type="button" data-testid="column-sort-button" onClick={ handleClick }>
        Ordenar
      </button>
    </div>
  );
}

export default Order;
