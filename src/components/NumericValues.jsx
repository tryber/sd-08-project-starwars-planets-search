import React, { useContext } from 'react';
import ColumnFilterButton from './ColumnFilterButton';
import { PlanetContext } from '../context/PlanetProvider';

export default function NumericValues() {
  const { filterObject, setFilter, addFilter, filterArray,
    columnsArray } = useContext(PlanetContext);
  const invalidColumns = filterArray.map((item) => item.column);

  return (
    <>
      <label
        htmlFor="column"
      >
        <select
          id="column"
          name="column"
          data-testid="column-filter"
          onChange={ (e) => setFilter({ ...filterObject, column: e.target.value }) }
        >
          { columnsArray.filter((item) => !invalidColumns.includes(item))
            .map((item) => (
              <option
                key={ item }
                value={ item }
              >
                {item}
              </option>))}

        </select>
      </label>
      <label htmlFor="comparison-filter">
        <select
          name="comparison"
          id="comparison-filter"
          data-testid="comparison-filter"
          onChange={ (e) => setFilter({ ...filterObject, comparison: e.target.value }) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          name="value"
          type="text"
          id="value-filter"
          placeholder="Valor"
          data-testid="value-filter"
          onChange={ (e) => setFilter({ ...filterObject, value: e.target.value }) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => addFilter() }
      >
        Filtrar
      </button>
      { filterArray.length > 0 ? <ColumnFilterButton /> : ''}
    </>
  );
}
