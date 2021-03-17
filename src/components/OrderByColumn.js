import React, { useContext, useState } from 'react';
import StarWarsContext from '../contexts/StarWarsContext';

import styles from '../styles/components/OrderByColumn.module.css';

const OrderByColumn = () => {
  const { columns, orderColumn, changeOrderColumn,
    changeOrderSort } = useContext(StarWarsContext);
  const [sort, setSort] = useState('ASC');

  return (
    <div className={ styles.orderColumnContainer }>
      <select
        data-testid="column-sort"
        value={ orderColumn }
        onChange={ changeOrderColumn }
      >
        { columns.map((currentColumn, index) => (
          <option key={ index }>{ currentColumn }</option>)) }
      </select>
      <label htmlFor="sort-asc">
        Ascendente
        <input
          data-testid="column-sort-input-asc"
          id="sort-asc"
          name="sort-order"
          type="radio"
          value="ASC"
          onChange={ ({ target }) => setSort(target.value) }
          defaultChecked
        />
      </label>
      <label htmlFor="sort-desc">
        Descendente
        <input
          data-testid="column-sort-input-desc"
          id="sort-desc"
          name="sort-order"
          type="radio"
          value="DESC"
          onChange={ ({ target }) => setSort(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => changeOrderSort(sort) }
      >
        Ordernar
      </button>
    </div>
  );
};

export default OrderByColumn;
