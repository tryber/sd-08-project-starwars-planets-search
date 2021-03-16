import React, { useContext } from 'react';
import StarWarsContext from '../../provider/StarWarsContext';

const COLUMN_FILTER = [
  'name', 'population', 'orbital_period',
  'diameter', 'rotation_period',
  'surface_water', 'climate', 'gravity', 'terrain',
];

function OrderColumn() {
  const { order, changeOrderColumn, setOrderApproved } = useContext(StarWarsContext);
  return (
    <div>
      <div>
        <select
          value={ order.column }
          onChange={ changeOrderColumn }
          data-testid="column-sort"
          data-setsort="column"
        >
          { COLUMN_FILTER.map((column, index) => (
            <option key={ index } value={ column }>{column}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="asc">
          ASC
          <input
            onChange={ changeOrderColumn }
            data-setsort="sort"
            id="asc"
            name="asc-desc"
            data-testid="column-sort-input-asc"
            type="radio"
            value="ASC"
            defaultChecked
          />
        </label>
        <label htmlFor="desc">
          DESC
          <input
            onChange={ changeOrderColumn }
            data-setsort="sort"
            id="desc"
            name="asc-desc"
            data-testid="column-sort-input-desc"
            type="radio"
            value="DESC"
          />
        </label>
      </div>
      <div>
        <button
          data-testid="column-sort-button"
          onClick={ () => setOrderApproved(true) }
          type="button"
        >
          Ordenar
        </button>
      </div>
    </div>
  );
}

export default OrderColumn;
