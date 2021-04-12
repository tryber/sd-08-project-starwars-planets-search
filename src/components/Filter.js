import React, { useState } from 'react';
import { usePlanets } from '../hooks/planets';

const Filter = () => {
  const {
    handleName,
    availableFilters,
    filters: { filterByName: { name }, filterByNumericValues },
    addFilter,
    removeFilter,
    handleOrder,
    planets,
    loading,
  } = usePlanets();

  const [column, setColumn] = useState(availableFilters[0] || '');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const [orderColumn, setOrderColumn] = useState('name');
  const [orderMethod, setOrderMethod] = useState('ASC');

  const onNameInputChange = ({ target }) => {
    handleName(target.value);
  };

  const onFilterBtnClick = () => {
    if (!column) return;

    addFilter({ column, comparison, value });
  };

  const onOrderBtnClick = () => {
    handleOrder(orderColumn, orderMethod);
  };

  return (
    <header>
      <div>
        <input
          placeholder="Filtrar por nome"
          value={ name }
          onChange={ onNameInputChange }
          data-testid="name-filter"
        />
      </div>
      <div>
        <select
          data-testid="column-filter"
          onChange={ ({ target }) => { setColumn(target.value); } }
        >
          {availableFilters.map((filter) => (
            <option key={ filter } value={ filter }>{filter}</option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ ({ target }) => { setComparison(target.value); } }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          onChange={ ({ target }) => { setValue(target.value); } }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ onFilterBtnClick }
        >
          Filtrar
        </button>
      </div>
      <div>
        {!loading && (
          <select
            data-testid="column-sort"
            onChange={ ({ target }) => setOrderColumn(target.value) }
          >
            {
              Object.keys(planets[0])
                .filter((planetInfo) => planetInfo !== 'residents')
                .map((filterOpt) => <option key={ filterOpt }>{filterOpt}</option>)
            }
          </select>
        )}
        <input
          type="radio"
          value="ASC"
          data-testid="column-sort-input-asc"
          name="order"
          onChange={ ({ target }) => setOrderMethod(target.value) }
          checked={ orderMethod === 'ASC' }
        />
        ASC
        <input
          type="radio"
          value="DESC"
          data-testid="column-sort-input-desc"
          name="order"
          onChange={ ({ target }) => setOrderMethod(target.value) }
          checked={ orderMethod === 'DESC' }
        />
        DESC
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ onOrderBtnClick }
        >
          Ordenar
        </button>
      </div>
      <ul>
        {filterByNumericValues.map(
          (
            { column: filterColumn, comparison: filterCompare, value: filterValue },
            index,
          ) => (
            <li key={ filterColumn } data-testid="filter">
              {`Filtro: ${filterColumn} | `}
              {`Comparação: ${filterCompare} | `}
              {`Valor: ${filterValue}`}
              <button type="button" onClick={ () => removeFilter(index) }>X</button>
            </li>
          ),
        )}
      </ul>
    </header>
  );
};

export default Filter;
