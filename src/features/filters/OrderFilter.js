import React, { useContext } from 'react';
import MyContext from '../../context';

function OrderFilter() {
  const { filters, data } = useContext(MyContext);
  const { order, setOrder } = filters;
  const columns = Object.keys(data.results[0]);

  return (
    <form>
      <span>{'Sort: '}</span>
      <select
        name="column-sort"
        id="column-sort"
        data-testid="column-sort"
        value={ order.column }
        onChange={ (e) => setOrder({
          ...order,
          column: e.target.value,
        }) }
      >
        {columns.map((column) => (
          <option key={ column } value={ column }>{column}</option>
        ))}
      </select>
      <label htmlFor="ASC">
        <input
          type="radio"
          name="order"
          id="ASC"
          value="ASC"
          data-testid="column-sort-input-asc"
          defaultChecked
          onClick={ () => setOrder({
            ...order,
            sort: 'ASC',
          }) }
        />
        Ascendente
      </label>
      <label htmlFor="DESC">
        <input
          type="radio"
          name="order"
          id="DESC"
          value="DESC"
          data-testid="column-sort-input-desc"
          onClick={ () => setOrder({
            ...order,
            sort: 'DESC',
          }) }
        />
        Descendente
      </label>
      <button type="button" data-testid="column-sort-button">Ordenar</button>
    </form>
  );
}

export default OrderFilter;
