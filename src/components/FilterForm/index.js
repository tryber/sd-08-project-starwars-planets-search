import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../../context/StarWarsContext';

function FilterForm() {
  const {
    data, filters, setFilters, setFilterByNumericValue,
  } = useContext(StarWarsContext);

  const columnFilter = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const usedColumnFilters = filters.filterByNumericValues.map((item) => item.column);
  const newColumnFilter = columnFilter.filter((column) => !usedColumnFilters
    .includes(column));
  // https://stackoverflow.com/questions/34901593/how-to-filter-an-array-from-all-elements-of-another-array

  const comparisonFilter = ['maior que', 'menor que', 'igual a'];

  function handleCLick() {
    const numericValues = filters.filterByNumericValues;
    const column = document.getElementById('column').value;
    const comparison = document.getElementById('comparison').value;
    const { value } = document.getElementById('value');
    const filterByNumericValues = numericValues.concat({ column, comparison, value });
    setFilters({ ...filters, filterByNumericValues });
  }

  let filterIteration = data;
  if (filters.filterByNumericValues.length > 0) {
    filters.filterByNumericValues.map((filter) => {
      if (filter.comparison === 'maior que') {
        filterIteration = filterIteration.filter(
          (planet) => parseInt(planet[filter.column], 10) > parseInt(filter.value, 10),
        );
      } if (filter.comparison === 'menor que') {
        filterIteration = filterIteration.filter(
          (planet) => parseInt(planet[filter.column], 10) < parseInt(filter.value, 10),
        );
      } if (filter.comparison === 'igual a') {
        filterIteration = filterIteration.filter(
          (planet) => parseInt(planet[filter.column], 10) === parseInt(filter.value, 10),
        );
      }
      return filterIteration;
    });
  }

  function deleteFilter(filter) {
    const filterByNumericValues = filters.filterByNumericValues
      .filter((item) => item.column !== filter.column);
    setFilters({ ...filters, filterByNumericValues });
  }

  useEffect(() => {
    setFilterByNumericValue(filterIteration);
  }, [filters.filterByNumericValues]);

  function checkValidity() {
    if (newColumnFilter.length === 0) return true;
    return false;
  }

  /* function columnSort() {

  } */

  return (
    <header>
      <form>
        <label htmlFor="name-filter">
          Planet name:
          <input
            name="name-filter"
            id="name-filter"
            data-testid="name-filter"
            onChange={ ({ target: { value } }) => setFilters(
              { ...filters, filterByName: { name: value } },
            ) }
          />
        </label>
        <label htmlFor="column">
          Column:
          <select
            name="column"
            id="column"
            data-testid="column-filter"
          >
            {newColumnFilter.map((column) => <option key={ column }>{ column }</option>)}
          </select>
        </label>
        <label htmlFor="comparison">
          Comparison:
          <select
            name="comparison"
            id="comparison"
            data-testid="comparison-filter"
          >
            { comparisonFilter.map((item) => <option key={ item }>{ item }</option>) }
          </select>
        </label>
        <label htmlFor="value">
          Value:
          <input
            type="number"
            name="value"
            id="value"
            data-testid="value-filter"
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => handleCLick() }
          disabled={ checkValidity() }
        >
          Filter
        </button>
        <label htmlFor="column-sort">
          Oyder by:
          <select name="column-sort" id="column-sort" data-testid="column-sort">
            <option>Name</option>
            <option>Rotation Period</option>
            <option>Orbital Period</option>
            <option>Diameter</option>
            <option>Surface Water</option>
            <option>Population</option>
          </select>
          <label htmlFor="ASC">
            ASC
            <input
              type="radio"
              id="ASC"
              name="column-sort"
              value="ASC"
              data-testid="column-sort-input-asc"
            />
          </label>
          <label htmlFor="DESC">
            DESC
            <input
              type="radio"
              id="DESC"
              name="column-sort"
              value="DESC"
              data-testid="column-sort-input-desc"
            />
          </label>
          <button
            type="button"
            data-testid="column-sort-button"
          //  onClick={ columnSort() }
          >
            Sort
          </button>
        </label>
      </form>
      { filters.filterByNumericValues.map((item, index) => (
        <div data-testid="filter" id={ index } key={ index }>
          <span>
            { `${item.column} ${item.comparison} ${item.value}` }
          </span>
          <button type="button" onClick={ () => deleteFilter(item) }>X</button>
        </div>)) }
    </header>
  );
}

export default FilterForm;
