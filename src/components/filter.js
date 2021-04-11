import React, { useContext } from 'react';
import { PlanetsContext } from '../context/planetsContext';

const Filter = () => {
  const {
    setName,
    setColumn,
    setComparison,
    setValueFilter,
    handleFilterClick,
    filter,
    removeFilter,
    handleSortClick,
    setSortFilter,
    sortFilter,
    teste,
  } = useContext(PlanetsContext);

  const handleSortChange = (name, value) => {
    setSortFilter({ ...sortFilter, [name]: value });
  };

  const sortColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  return (
    <div key={ teste }>
      <input
        type="text"
        onChange={ (e) => setName(e.target.value) }
        data-testid="name-filter"
      />
      <div>
        <select
          name="column"
          data-testid="column-filter"
          onChange={ (e) => setColumn(e.target.value) }
        >
          {filter.map((item) => <option key={ item }>{item}</option>)}
        </select>
        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ (e) => setComparison(e.target.value) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          onChange={ (e) => setValueFilter(e.target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilterClick }
        >
          Filtrar
        </button>
        <div data-testid="filter">
          <button
            type="button"
            value="X"
            onClick={ () => removeFilter() }
          >
            X
          </button>
        </div>
        <div>
          <select
            name="column"
            data-testid="column-sort"
            // onChange consultado no PR https://github.com/tryber/sd-08-project-starwars-planets-search/blob/d464958ad55480efcc76cfc2a2d3e6989a87405e/src/components/SortByColumn.js
            onChange={ ({ target: { name, value } }) => handleSortChange(name, value) }
          >
            {sortColumns.map((item) => <option key={ item }>{item}</option>)}
          </select>
          <label htmlFor="radio">
            Crescente
            <input
              type="radio"
              data-testid="column-sort-input-asc"
              value="ASC"
              name="sort"
              onChange={ ({ target: { name, value } }) => handleSortChange(name, value) }
            />
          </label>
          <label htmlFor="radio">
            Decrescente
            <input
              type="radio"
              data-testid="column-sort-input-desc"
              value="DESC"
              name="sort"
              onChange={ ({ target: { name, value } }) => handleSortChange(name, value) }
            />
          </label>
          <button
            type="button"
            onClick={ handleSortClick }
            data-testid="column-sort-button"
          >
            Ordenar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
