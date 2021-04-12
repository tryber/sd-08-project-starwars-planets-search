import React, { useContext, useState } from 'react';
import { Context } from '../services/PlanetsContext';

function SortForm() {
  const {
    data,
    columnTags,
    sortedData,
    setFilteredPlanets,
  } = useContext(Context);

  const [order, setOrder] = useState({
    column: 'population',
    sort: '',
  });

  const POSITIVE = 1;
  const NEGATIVE = -1;

  async function handleClickSortButton() {
    if (order.sort === 'ASC') {
      setFilteredPlanets(
        [...data].sort((a, b) => {
          if (Number(a[order.column]) < Number(b[order.column])) return NEGATIVE;
          if (Number(a[order.column]) > Number(b[order.column])) return POSITIVE;
          return 0;
        }),
      );
      console.log(sortedData);
    }
    if (order.sort === 'DESC') {
      setFilteredPlanets(
        [...data].sort((a, b) => {
          if (Number(a[order.column]) > Number(b[order.column])) return NEGATIVE;
          if (Number(a[order.column]) < Number(b[order.column])) return POSITIVE;
          return 0;
        }),
      );
      console.log(sortedData);
    }
  }

  return (
    <form>
      <select
        data-testid="column-sort"
        onChange={ (e) => setOrder({ ...order, column: e.target.value }) }
      >
        {columnTags.map((sortTag) => (
          <option key={ sortTag } value={ sortTag }>
            {sortTag}
          </option>
        ))}
      </select>
      <label htmlFor="ASC">
        <input
          type="radio"
          name="sort-input"
          data-testid="column-sort-input-asc"
          id="ASC"
          value="ASC"
          onClick={ (e) => setOrder({ ...order, sort: e.target.value }) }
        />
        ascendente
      </label>
      <label htmlFor="DESC">
        <input
          type="radio"
          name="sort-input"
          data-testid="column-sort-input-desc"
          id="DESC"
          value="DESC"
          onClick={ (e) => setOrder({ ...order, sort: e.target.value }) }
        />
        descendente
      </label>
      <button
        onClick={ handleClickSortButton }
        type="button"
        data-testid="column-sort-button"
      >
        Add sort filter
      </button>
    </form>
  );
}

export default SortForm;
