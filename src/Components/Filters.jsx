import React, { useContext, useState } from 'react';
import StateContext from '../context/StateContext';

const Filters = () => {
  const { filters:
    { filterByName: { name },
      filterByNumericValues },
  setName,
  setFiltersByNumericValues,
  setOrder,
  headers,
  } = useContext(StateContext);

  const columns = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const comparisons = ['maior que', 'menor que', 'igual a'];

  const [column, setColumn] = useState(columns[0]);
  const [comparison, setComparison] = useState(comparisons[0]);
  const [value, setValue] = useState('0');
  const [header, setHeader] = useState('name');
  const [sort, setSort] = useState('ASC');

  return (
    <>
      <input
        value={ name }
        data-testid="name-filter"
        type="text"
        onChange={ ({ target: { value: v } }) => setName(v) }
      />

      <select
        value={ column }
        data-testid="column-filter"
        onChange={ ({ target: { value: v } }) => setColumn(v) }
      >
        {filterByNumericValues.reduce((acc, filter) => acc
          .filter((c) => c !== filter.column), columns)
          .map((c, i) => <option value={ c } key={ i }>{c}</option>)}
      </select>

      <select
        value={ comparison }
        data-testid="comparison-filter"
        onChange={ ({ target: { value: v } }) => setComparison(v) }
      >
        {comparisons.map((c, i) => <option value={ c } key={ i }>{c}</option>)}
      </select>

      <input
        value={ value }
        data-testid="value-filter"
        type="number"
        onChange={ ({ target: { value: v } }) => setValue(v) }
      />

      <button
        data-testid="button-filter"
        disabled={ !value }
        type="button"
        onClick={ () => {
          filterByNumericValues.push({ column, comparison, value });
          setFiltersByNumericValues([...filterByNumericValues]);
          setColumn(filterByNumericValues.reduce((acc, filter) => acc
            .filter((c) => c !== filter.column), columns)[0]);
        } }
      >
        filter
      </button>

      <select
        value={ header }
        data-testid="column-sort"
        onChange={ ({ target: { value: v } }) => setHeader(v) }
      >
        {headers
          .map((h, i) => <option value={ h } key={ i }>{h}</option>)}
      </select>

      <label htmlFor="asc">
        asc
        <input
          defaultChecked
          name="order"
          value="ASC"
          data-testid="column-sort-input-asc"
          type="radio"
          id="asc"
          onChange={ ({ target: { value: v } }) => setSort(v) }
        />
      </label>

      <label htmlFor="desc">
        desc
        <input
          name="order"
          value="DESC"
          data-testid="column-sort-input-desc"
          type="radio"
          id="desc"
          onChange={ ({ target: { value: v } }) => setSort(v) }
        />
      </label>

      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => {
          setOrder({ column: header, sort });
        } }
      >
        filter
      </button>
    </>
  );
};

export default Filters;
