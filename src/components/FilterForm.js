import React, { useContext } from 'react';

import Context from '../context/Context';

function renderTextInput(name, callback, value) {
  return (
    <label htmlFor={ name }>
      { name }
      <input
        data-testid={ `${name}-filter` }
        id={ name }
        onChange={ ({ target }) => callback(target.id, target.value) }
        value={ value }
      />
    </label>
  );
}

function renderSelectInput(name, options, callback, value) {
  return (
    <label htmlFor={ name }>
      { name }
      <select
        data-testid={ `${name}-filter` }
        id={ name }
        onChange={ ({ target }) => callback(target.id, target.value) }
        value={ value }
      >
        { options.map((option) => (
          <option key={ option } value={ option }>
            { option }
          </option>
        ))}
      </select>
    </label>
  );
}

function renderSortSelectInput(options, callback, value) {
  return (
    <label htmlFor="column">
      Sort By
      <select
        data-testid="column-sort"
        id="column"
        name="column"
        onChange={ ({ target }) => callback(target.name, target.value) }
        value={ value }
      >
        { options.map((option_) => (
          <option key={ option_ } value={ option_ }>
            { option_ }
          </option>
        ))}
      </select>
    </label>
  );
}

function FilterForm() {
  const {
    isFetching,
    data,
    filters,
    columnOptions,
    numericFilterValues,
    orderFilterValues,
    onChangeNameFilter,
    onChangeNumericFilter,
    onChangeOrderFilter,
    setOrderFilter,
    onClickAddFilter,
    onClickRemoveFilter,
  } = useContext(Context);

  const comparisonOptions = [
    'maior que',
    'menor que',
    'igual a',
  ];

  const sortOptions = !isFetching && Object.keys(data[0])
    .filter((key) => key !== 'residents').map((dataHeadColumn) => dataHeadColumn);

  function handleClick(event) {
    event.preventDefault();
    onClickAddFilter();
  }

  function renderRemoveFilterButton(id) {
    return (
      <button
        id={ id }
        onClick={ (event) => onClickRemoveFilter(event.target.id) }
        type="button"
      >
        x
      </button>
    );
  }

  return (
    <>
      <form>
        { renderTextInput('name', onChangeNameFilter, filters.filterByName.name) }
        { renderSelectInput(
          'column', columnOptions, onChangeNumericFilter, numericFilterValues.column,
        ) }
        { renderSelectInput(
          'comparison', comparisonOptions,
          onChangeNumericFilter, numericFilterValues.comparison,
        ) }
        { renderTextInput('value', onChangeNumericFilter, numericFilterValues.value) }
        <button
          data-testid="button-filter"
          type="submit"
          onClick={ handleClick }
        >
          Filter
        </button>
      </form>
      <form>
        { !isFetching && renderSortSelectInput(
          sortOptions, onChangeOrderFilter, orderFilterValues.column,
        ) }
        <label htmlFor="sort-asc">
          ASC
          <input
            checked={ orderFilterValues.sort === 'ASC' }
            data-testid="column-sort-input-asc"
            id="sort-asc"
            name="sort"
            onChange={ ({ target }) => onChangeOrderFilter(target.name, target.value) }
            type="radio"
            value="ASC"
          />
        </label>
        <label htmlFor="sort-desc">
          DESC
          <input
            checked={ orderFilterValues.sort === 'DESC' }
            data-testid="column-sort-input-desc"
            id="sort-desc"
            name="sort"
            onChange={ ({ target }) => onChangeOrderFilter(target.name, target.value) }
            type="radio"
            value="DESC"
          />
        </label>
        <button
          data-testid="column-sort-button"
          onClick={ (event) => { event.preventDefault(); setOrderFilter(); } }
          type="submit"
        >
          Sort
        </button>
      </form>
      <h4>Active Filters</h4>
      <ul>
        { filters.filterByNumericValues.length > 0
          && filters.filterByNumericValues.map((filter) => (
            <li data-testid="filter" key={ filter.column }>
              { `${filter.column} ${filter.comparison} ${filter.value} ` }
              { renderRemoveFilterButton(filter.column) }
            </li>))}
      </ul>
    </>
  );
}

export default FilterForm;
