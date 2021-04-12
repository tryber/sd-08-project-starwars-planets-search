import React, { useContext, useState } from 'react';
import StarWarsPlanetsContext from '../context/StarWarsPlanetsContext';

function Sort() {
  const {
    filteredPlanets,
    filters,
    setFilters,
  } = useContext(StarWarsPlanetsContext);

  const [columnSort, setColumnSort] = useState();
  const [sortType, setSortType] = useState();

  const toSort = () => {
    setFilters({
      ...filters,
      order: {
        column: columnSort,
        sort: sortType,
      },
    });
  };

  return (
    <form className="sort">
      <select
        data-testid="column-sort"
        onChange={ ({ target }) => {
          setColumnSort(target.value);
        } }
      >
        {Object.keys(filteredPlanets.reduce((acc, cur) => Object.assign(acc, cur), 0))
          .filter((key) => key !== 'residents')
          .map((columnOption) => (
            <option
              value={ columnOption }
              key={ columnOption }
            >
              { columnOption }
            </option>
          ))}
      </select>

      <div>
        <label htmlFor="ASC">
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            id="ASC"
            value="ASC"
            name="order"
            onChange={ ({ target }) => {
              setSortType(target.value);
            } }
          />
          ASC
        </label>
        <label htmlFor="DESC">
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            id="DESC"
            value="DESC"
            name="order"
            onChange={ ({ target }) => {
              setSortType(target.value);
            } }
          />
          DESC
        </label>
      </div>

      <button
        type="submit"
        data-testid="column-sort-button"
        onClick={ () => toSort() }
      >
        Ordenar
      </button>
    </form>
  );
}

export default Sort;
