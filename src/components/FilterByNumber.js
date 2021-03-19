import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FilterByNumber() {
  const {
    inputsValues: {
      column,
      comparison,
      value,
    },
    filters: {
      filterByNumericValues,
    },
    function: {
      handleColumn,
      handleComparison,
      handleValue,
      addFilter,
      deleteFilter,
    },
    columnOptions,
  } = useContext(PlanetsContext);

  return (
    <>
      <select
        data-testid="column-filter"
        value={ column }
        onChange={ handleColumn }
      >
        {columnOptions.map((item) => <option key={ item }>{item}</option>)}
      </select>
      <select
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ handleComparison }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ value }
        onChange={ handleValue }
      />
      <button
        data-testid="button-filter"
        onClick={ addFilter }
        type="button"
      >
        Adicionar Filtro
      </button>
      <br />
      {filterByNumericValues.map((item) => (
        <div key={ item.column } data-testid="filter">
          <span>{`${item.column} ${item.comparison} ${item.value}`}</span>
          <button
            type="button"
            onClick={ () => deleteFilter(item.column) }
          >
            X
          </button>
        </div>
      ))}
    </>
  );
}

export default FilterByNumber;
