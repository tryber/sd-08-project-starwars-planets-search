import React, { useContext } from 'react';
import SWContext from '../context/SWContext';

export default function Header() {
  const { filterByName, setFilterByName, filter, MakeFilter,
    setFilterComparison, setFilterColumn, setFilterNumber,
    deleteFilter, setSortOrder, setSortColumn } = useContext(SWContext);
  const colList = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  // console.log(filter.filters.filterByNumericValues);
  const tableHeader = ['name', 'rotation_period', 'orbital_period', 'diameter', 'climate',
    'gravity', 'terrain', 'surface_water', 'population', 'films', 'created',
    'edited', 'url'];

    /// colocar use state fazer o filtro aqui dentro
    
  const numberalFilterList = () => ((
    <ol>
      {filter.filters.filterByNumericValues.map((criteriun, index) => (
        <li key={ criteriun.column } data-testid="filter">
          {criteriun.column}

          {criteriun.comparison}

          {criteriun.value}

          <button
            type="button"
            onClick={ () => { deleteFilter(index); } }
          >
            X
          </button>

        </li>
      ))}
    </ol>
  ));
  // console.log(filter.filters.filterByNumericValues.some((v) => v.column === 'population'));
  return (
    <div>
      <input
        type="text"
        value={ filterByName }
        onChange={ (e) => { setFilterByName(e.target.value); } }
        data-testid="name-filter"
      />
      <select
        data-testid="column-filter"
        name="column-filter"
        onChange={ (e) => setFilterColumn(e.target.value) }
      >
        {colList.map((column, index) => {
          if (filter.filters.filterByNumericValues.every((v) => v.column !== column)) {
            return (
              <option
                key={ index }
                value={ column }
              >
                {column}
              </option>
            );
          }
          return '';
        })}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison-filter"
        onChange={ (e) => setFilterComparison(e.target.value) }
        required
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ (e) => setFilterNumber(e.target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {   MakeFilter(); }}
      >
        Adicionar

      </button>
      <select
        data-testid="column-sort"
        id="column-sort"
        name="column-sort"
        onChange={ (e) => setSortColumn(e.target.value) }
      >
        {tableHeader.map((column, index) => (
          <option
            key={ index }
            value={ column }
          >
            {column}
          </option>
        ))}
      </select>
      <label htmlFor="ASC">
        ASC
        <input
          type="radio"
          onChange={ (e) => setSortOrder(e.target.value) }
          value="ASC"
          name="sort"
          data-testid="column-sort-input-asc"
        />
      </label>
      <label htmlFor="DESC">
        DESC
        <input
          type="radio"
          onClick={ (e) => setSortOrder(e.target.value) }
          value="DESC"
          name="sort"
          data-testid="column-sort-input-desc"
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => {  MakeFilter(); }}
      >
        Ordene

      </button>
      {filter.filters.filterByNumericValues.length > 0
      && numberalFilterList()}
    </div>
  );
}
