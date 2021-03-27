import React, { useState, useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import { columnsNameOrder } from '../helpers/functionsHelpers';

function AlphabeticalOrder() {
  const { userFilters, setUserFilters } = useContext(PlanetContext);
  const [column, setColumn] = useState('');
  const [sort, setSort] = useState('');

  function handleChange() {
    setUserFilters({ ...userFilters, order: { column, sort } });
  }

  return (
    <div>
      <h3>Ordena</h3>
      <label htmlFor="opt">
        <select
          id="opt"
          data-testid="column-sort"
          onChange={ (e) => setColumn(e.target.value) }
          name="column"
        >
          {columnsNameOrder
            .map((nameOption) => (<option key={ nameOption }>{nameOption}</option>))}
        </select>
      </label>
      <label htmlFor="asc">
        <input
          type="radio"
          name="sort"
          data-testid="column-sort-input-asc"
          value="ASC"
          id="asc"
          onChange={ (e) => setSort(e.target.value) }
        />
        ASC
      </label>
      <label htmlFor="desc">
        <input
          type="radio"
          name="sort"
          data-testid="column-sort-input-desc"
          value="DESC"
          id="desc"
          onChange={ (e) => setSort(e.target.value) }
        />
        DESC
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleChange }
      >
        Ordenar

      </button>
    </div>
  );
}

export default AlphabeticalOrder;
