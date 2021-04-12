import React, { useContext, useCallback } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import FilterOrdenBy from './FilterOrdenBy';

// Utilização do Context - modelo de estudo e crédito total { Bruno Sordi T07}
// Foram feitas observações também nos códigos do { Pedro Marques T07}
function Table() {
  const {
    data,
    filters,
    setFilters,
    filterHandler,
    setFilterHandler,
  } = useContext(StarWarsContext);
  const negative = -1;

  // Filtro por nome, a cada novo filter, pega o array original e filtra por nome
  function handleChangeName({ target }) {
    const prevFilters = filters;
    setFilters({
      ...prevFilters,
      filterByName: { name: target.value },
    });
  }

  function handleChangeSelected({ target }) {
    const prevFilters = filterHandler;
    const { name, value } = target;
    setFilterHandler({
      ...prevFilters,
      [name]: value,
    });
  }
  // Adicionar filtro numerico
  function addFilter() {
    const prevFilters = filters;
    setFilters({
      ...prevFilters,
      filterByNumericValues: [...prevFilters.filterByNumericValues, filterHandler],
    });
  }

  function renderOptions() {
    const { filterByNumericValues } = filters;
    const createdFilters = [];
    filterByNumericValues.map((filter) => createdFilters.push(filter.column));
    const arrayComparison = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];
    const arrayRendered = arrayComparison.filter((comparison) => (
      createdFilters.every((filter) => filter !== comparison)
    ));

    return (
      <label htmlFor="column">
        <select
          name="column"
          data-testid="column-filter"
          value={ filters.filterByNumericValues.column }
          onChange={ handleChangeSelected }
        >
          {arrayRendered.map((comparison, index) => (
            <option key={ index } value={ comparison }>
              { comparison }
            </option>
          ))}
        </select>
      </label>
    );
  }
  // deletando a coluna de filtro // refatorar para ser excluido somente 1 valor
  function deleteFilter(column) {
    const { filterByNumericValues } = filters;
    const delFilters = filterByNumericValues.filter((filter) => (
      filter.column !== column
    ));
    setFilters({
      ...filters,
      filterByNumericValues: delFilters,
    });
  }
  // novo render apartir do filte populacional
  function renderFilters() {
    const { filterByNumericValues } = filters;
    const renderedFilters = filterByNumericValues.map((filter, index) => (
      <div data-testid="filter" key={ index }>
        { `${ filter.column } ${ filter.comparison } ${ filter.value }  `}
        <button type="button" onClick={ () => deleteFilter(filter.column) }>x</button>
      </div>
    ));
    return renderedFilters;
  }

  const filterby = useCallback((sorting, column) =>{
    switch (column) {
    case 'name':
      return setFilters([...data].sort(({ [column]: a }, { [column]: b }) => {
        if (sorting === 'DESC') return b > a ? 1 : negative;
        return a > b ? 1 : negative;
      }));
    case 'orbital_period':
      return setFilters([...data].sort(({ [column]: a }, { [column]: b }) => {
        if (sorting === 'DESC') return b - a;
        return a - b;
      }));
    default:
      return null;
    }
  }, [data, negative]);

  return (
    <div>
      <div>
        <label htmlFor="filter-text">
          Filter By Name:
          <input
            type="text"
            name="filter-text"
            data-testid="name-filter"
            value={ filters.filterByName.name }
            onChange={ handleChangeName }
          />
        </label>
        { renderOptions() }
        <label htmlFor="comparison">
          <select
            name="comparison"
            data-testid="comparison-filter"
            value={ filters.filterByNumericValues.comparison }
            onChange={ handleChangeSelected }
          >
            <option value="maior que">maior que</option>
            <option value="igual a">igual a</option>
            <option value="menor que">menor que</option>
          </select>
        </label>
        <label htmlFor="value">
          <input
            data-testid="value-filter"
            name="value"
            value={ filters.filterByNumericValues.value }
            onChange={ handleChangeSelected }
          />
        </label>
        <button type="button" data-testid="button-filter" onClick={ addFilter }>
          Add Filters
        </button>
        <div>
          { renderFilters() }
        </div>
      </div>
      {!data.length ? (
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((element, index) => (
                <th key={ index }>{ element }</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, keys) => (
              <tr key={keys}>
                { Object.values(item).map((element, index) => (
                  <td key={ index }>{ element }</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <FilterOrdenBy filterby={ filterby } />
    </div>
  );
}

export default Table;
