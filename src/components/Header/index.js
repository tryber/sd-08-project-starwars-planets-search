import React, { useContext } from 'react';

import StarWarsContext from '../../context/StartWarsContext';

function Header() {
  const {
    filters,
    changeInputsByName,
    changeSelectColumn,
    changeSelectComparison,
    changeSelectValue,
    handleFilterByNumericValues,
    handleRemoveFilter,
    changeSortType,
    changeSortColumn,
    sortPlanets,
    filters: { filterByNumericValues },
  } = useContext(StarWarsContext);

  const { filterByName: { name } } = filters;
  const columns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  if (filterByNumericValues.length) {
    filterByNumericValues.forEach(({ column }) => {
      const index = columns.indexOf(column);
      const zero = 0;
      if (index >= zero) {
        columns.splice(index, 1);
      }
    });
  }

  return (
    <div>
      <label htmlFor="name">
        Pesquisar por nome:
        <input
          data-testid="name-filter"
          name="name"
          id="name"
          value={ name }
          onChange={ (event) => changeInputsByName(event) }
        />
      </label>
      <div>
        Pesquisar por número de:
        <select
          name="column"
          data-testid="column-filter"
          onChange={ changeSelectColumn }
        >
          {columns.map((column) => (
            <option key={ column } value={ column }>
              { column }
            </option>
          ))}
        </select>
        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ changeSelectComparison }
        >
          <option>selecione</option>
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          name="value"
          type="number"
          data-testid="value-filter"
          onChange={ changeSelectValue }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilterByNumericValues }
        >
          Pesquisar
        </button>
        <div data-testid="filter">
          <button
            type="button"
            onClick={ handleRemoveFilter }
          >
            X
          </button>
        </div>
        <div>
          <select
            data-testid="column-sort"
            onChange={ changeSortColumn }
          >
            {columns.map((column) => (
              <option key={ column } value={ column }>
                { column }
              </option>
            ))}
          </select>
          <div>
            ASC
            <input
              type="radio"
              name="order"
              value="ASC"
              onChange={ changeSortType }
              data-testid="column-sort-input-asc"
            />
            DESC
            <input
              type="radio"
              name="order"
              value="DESC"
              onChange={ changeSortType }
              data-testid="column-sort-input-desc"
            />
          </div>
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ sortPlanets }
          >
            Ordenar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
