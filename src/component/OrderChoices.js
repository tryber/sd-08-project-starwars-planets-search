import React, { useContext, useState } from 'react';
import { filterOptions } from '../services';
import Context from '../context';

function OrderChoice() {
  const [columnSort, setColumnSort] = useState(filterOptions[0]);
  const [radioSort, setRadioSort] = useState('ASC');
  const { filter, setFilter } = useContext(Context);

  return (
    <section>
      <select
        data-testid="column-sort"
        value={ columnSort }
        onChange={ (e) => setColumnSort(e.target.value) }
      >
        {filterOptions.map((opt) => <option key={ opt }>{ opt }</option>)}
      </select>
      <div style={ { display: 'inline' } }>
        {/*  Link ensinando a controlar inputs radio: https://www.pluralsight.com/guides/how-to-use-radio-buttons-in-reactjs */}
        <label htmlFor="asc">
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            name="order"
            id="asc"
            value="ASC"
            checked={ radioSort === 'ASC' }
            onChange={ (e) => setRadioSort(e.target.value) }
          />
          Ascendente
        </label>
        <label htmlFor="desc">
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            name="order"
            id="desc"
            value="DESC"
            checked={ radioSort === 'DESC' }
            onChange={ (e) => setRadioSort(e.target.value) }
          />
          Descendente
        </label>
      </div>
      {' '}
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => setFilter(
          { ...filter, order: { column: columnSort, sort: radioSort } },
        ) }
      >
        Ordenar
      </button>
    </section>
  );
}

export default OrderChoice;
