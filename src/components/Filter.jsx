import React, { useState, useContext, useEffect } from 'react';
import FilterContext from '../context/FilterContext';

const NUMERIC_VALUES = ['population',
  'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

const ALL_COLUMNS = ['name', 'rotation_period', 'orbital_period',
  'diameter', 'climate', 'gravity', 'terrain', 'surface_water',
  'population', 'films', 'created', 'edited', 'url'];

function Filter() {
  const [columnOptions, setColumnOptions] = useState(NUMERIC_VALUES);
  const [column, setColumn] = useState(NUMERIC_VALUES[0]);
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState();
  const [orderColumn, setOrderColumn] = useState('name');
  const [orderSort, setOrderSort] = useState('ASC');

  const { setFilterName,
    filters: { filterByName: { name }, filterByNumericValues },
    setFilterByNumericValues,
    setOrder,
    resetNumericFilter } = useContext(FilterContext);

  useEffect(() => {
    const filteredOptions = filterByNumericValues.map((numeric) => numeric.column);
    setColumnOptions(NUMERIC_VALUES.filter((opt) => !filteredOptions.includes(opt)));
  }, [filterByNumericValues]);

  return (
    <section className="filter">
      <label htmlFor="name">
        Nome:
        <input
          data-testid="name-filter"
          type="text"
          id="name"
          value={ name }
          onChange={ ({ target }) => setFilterName(target.value) }
        />
      </label>
      <label htmlFor="column">
        <select
          data-testid="column-filter"
          id="column"
          name="column"
          onChange={ ({ target }) => setColumn(target.value) }
        >
          { columnOptions.map(
            (columnOpt) => (
              <option value={ columnOpt } key={ columnOpt }>{ columnOpt }</option>
            ),
          )}
        </select>
      </label>
      <label htmlFor="comparison">
        <select
          id="comparison"
          data-testid="comparison-filter"
          name="comparison"
          onChange={ ({ target }) => setComparison(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="numeric_value">
        <input
          type="number"
          id="numeric_value"
          data-testid="value-filter"
          onChange={ ({ target }) => setValue(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => setFilterByNumericValues(column, comparison, value) }
      >
        Filtro
      </button>
      <label htmlFor="sortColumn">
        <select
          id="sortColumn"
          data-testid="column-sort"
          onChange={ ({ target }) => setOrderColumn(target.value) }
        >
          { ALL_COLUMNS.map((opt) => <option key={ opt } value={ opt }>{ opt }</option>) }
        </select>
      </label>
      <label htmlFor="asc">
        ASC
        <input
          type="radio"
          id="asc"
          name="sort"
          value="ASC"
          onClick={ ({ target }) => setOrderSort(target.value) }
          defaultChecked
          data-testid="column-sort-input-asc"
        />
      </label>
      <label htmlFor="desc">
        DESC
        <input
          type="radio"
          id="desc"
          data-testid="column-sort-input-desc"
          name="sort"
          value="DESC"
          onClick={ ({ target }) => setOrderSort(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => setOrder(orderColumn, orderSort) }
      >
        Ordenar
      </button>
      { filterByNumericValues.map(({ column: rmColumn }) => (
        <div key={ rmColumn } data-testid="filter">
          <button onClick={ () => resetNumericFilter(rmColumn) } type="button">
            { `${rmColumn} x` }
          </button>
        </div>
      ))}
    </section>
  );
}

export default Filter;
