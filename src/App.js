import React, { useEffect, useState } from 'react';
import './App.css';
import getPlanetsAPI from './api/getPlanetsAPI';
import starWarsContext from './context/context';
import Table from './components/Table';

function App() {
  const initialFiltersState = {
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
      order: {
        column: 'name',
        sort: 'ASC',
      },
    },
  };

  const DECIMAL = 10;
  const headers = ['name', 'rotation_period', 'orbital_period',
    'diameter', 'climate', 'gravity', 'terrain', 'surface_water',
    'population', 'films', 'created', 'edited', 'url'];
  const columnFilterOptions = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const [allPlanets, setAllPlanets] = useState([]);
  const [currentFilter, setCurrentFilter] = useState([]);
  const [filtersState, setFiltersState] = useState(initialFiltersState);
  const [numericState, setNumericState] = useState({});
  const [orderState, setOrderState] = useState({});
  const [columnFilterState, setColumnFilterState] = useState(columnFilterOptions);

  useEffect(() => {
    async function fetchAPI() {
      const data = await getPlanetsAPI();
      setAllPlanets(data);
      setCurrentFilter(data);
    }
    fetchAPI();
  }, []);

  function isNumeric(num) {
    if (parseInt(num, DECIMAL)) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    const { filters: { filterByName: { name: text },
      filterByNumericValues } } = filtersState;
    let filteredByAll = [...allPlanets];
    filteredByAll = filteredByAll.filter(({ name }) => name.includes(text));
    filterByNumericValues.forEach(({ column, comparison, value }) => {
      filteredByAll = filteredByAll.filter((planet) => {
        if (comparison === 'maior que') return +planet[column] > +value;
        if (comparison === 'menor que') return +planet[column] < +value;
        return +planet[column] === +value;
      });
    });
    const { filters: { order: { column, sort } } } = filtersState;
    let isNumber = false;
    if (allPlanets.length > 0) isNumber = isNumeric(allPlanets[0][column]);
    if (sort === 'ASC' && isNumber) filteredByAll.sort((a, b) => a[column] - b[column]);
    if (sort === 'DESC' && isNumber) filteredByAll.sort((a, b) => b[column] - a[column]);
    if (sort === 'ASC' && !isNumber) {
      filteredByAll.sort((a, b) => a[column].localeCompare(b[column]));
    }
    if (sort === 'DESC' && !isNumber) {
      filteredByAll.sort((a, b) => b[column].localeCompare(a[column]));
    }
    setCurrentFilter(filteredByAll);
  }, [allPlanets, filtersState]);

  function applyNumericFilter() {
    if (numericState.column
      && numericState.comparison
      && numericState.value
    ) {
      const indexRemove = columnFilterState.indexOf(numericState.column);
      const tempFilterArray = [...columnFilterState];
      tempFilterArray.splice(indexRemove, 1);
      setColumnFilterState(tempFilterArray);
      setFiltersState({ filters: { ...filtersState.filters,
        filterByNumericValues: [
          ...filtersState.filters.filterByNumericValues,
          numericState,
        ],
      } });
    }
  }

  function applyOrderFilter() {
    setFiltersState({ filters: {
      ...filtersState.filters,
      order: { ...orderState },
    } });
  }

  function handleChangeOrder({ target }) {
    const { name, value } = target;
    setOrderState({ ...orderState, [name]: value });
  }

  function handleName({ target }) {
    setFiltersState({ filters: { ...filtersState.filters,
      filterByName: { name: target.value } } });
  }

  function handleChangeNumeric({ target }) {
    const { name, value } = target;
    setNumericState({ ...numericState, [name]: value });
  }

  function removeFilter(index) {
    const { filters: { filterByNumericValues } } = filtersState;
    const tempFilter = [...filterByNumericValues];
    const addToFilterOption = tempFilter[index].column;
    const newColumnOptions = [...columnFilterState, addToFilterOption];
    tempFilter.splice(index, 1);
    setColumnFilterState(newColumnOptions);
    setFiltersState({ filters: { ...filtersState.filters,
      filterByNumericValues: tempFilter,
    } });
  }

  return (
    <starWarsContext.Provider value={ currentFilter }>
      <input
        name="name"
        type="text"
        data-testid="name-filter"
        onChange={ handleName }
        value={ filtersState.filters.filterByName.name }
      />
      <select
        name="column"
        id="column"
        data-testid="column-filter"
        onChange={ handleChangeNumeric }
      >
        { columnFilterState.map((filterOption) => (
          <option value={ filterOption } key={ filterOption }>
            {filterOption}
          </option>
        ))}
      </select>
      <select
        name="comparison"
        id="comparison"
        data-testid="comparison-filter"
        onChange={ handleChangeNumeric }
      >
        <option value="">{' '}</option>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        onChange={ handleChangeNumeric }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ applyNumericFilter }
      >
        Filtrar
      </button>
      <label htmlFor="column">
        <select
          name="column"
          id="column"
          onChange={ handleChangeOrder }
          data-testid="column-sort"
        >
          <option value="">{' '}</option>
          { headers.map((header) => (
            <option
              key={ header }
              value={ header }
            >
              { header}
            </option>
          ))}
        </select>
      </label>
      <p>Order By</p>
      <label htmlFor="ASC">
        <input
          type="radio"
          value="ASC"
          data-testid="column-sort-input-asc"
          name="sort"
          id="ASC"
          onChange={ handleChangeOrder }
        />
        Ascending
      </label>
      <label htmlFor="DESC">

        <input
          id="DESC"
          type="radio"
          value="DESC"
          data-testid="column-sort-input-desc"
          name="sort"
          onChange={ handleChangeOrder }
        />
        Descending
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ applyOrderFilter }
      >
        Ordenar
      </button>
      <ul>
        { filtersState.filters.filterByNumericValues.map(
          ({ column, comparison, value }, index) => (
            <li key={ `${index}+filter` } data-testid="filter">
              { `${column} ${comparison} ${value}`}
              <button
                type="button"
                onClick={ () => removeFilter(index) }
              >
                X
              </button>
            </li>
          ),
        )}
      </ul>
      <Table />
    </starWarsContext.Provider>
  );
}

export default App;
