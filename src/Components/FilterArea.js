import React, { useContext } from 'react';
import planetsContext from '../Hooks/planetsContext';

function FilterArea() {
  const {
    setName,
    setColumn,
    setComparison,
    setNumber,
    setShouldFilter,
    setFilterByName,
    filters: { filterByNumericValues: [
      {
        column,
        comparison,
      },
    ] },
  } = useContext(planetsContext);

  function updateNameFilter({ target }) {
    setName(target.value);
    setFilterByName(true);
  }

  function changeColumm({ target }) {
    setColumn(target.value);
  }

  function changeComparison({ target }) {
    setComparison(target.value);
  }

  function changeNumber({ target }) {
    setNumber(parseInt(target.value, 10));
  }

  function applyFilter(event) {
    event.preventDefault();
    setShouldFilter(true);
  }

  return (
    <form className="form">
      <label htmlFor="text-filter">
        { 'Insira o filtro: ' }
        <input
          name="text-filter"
          type="text"
          data-testid="name-filter"
          onChange={ updateNameFilter }
        />
      </label>
      <label htmlFor="header-area">
        { 'Qual seletor dejesa? ' }
        <select
          value={ column }
          name="header-area"
          data-testid="column-filter"
          onChange={ changeColumm }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="populrotation_periodation">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="range-area">
        { 'Será ' }
        <select
          value={ comparison }
          name="range-area"
          data-testid="comparison-filter"
          onChange={ changeComparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="number-area">
        { 'Qual valor numérico? '}
        <input
          type="number"
          data-testid="value-filter"
          onChange={ changeNumber }
        />
      </label>
      <button
        name="send-filter"
        data-testid="button-filter"
        type="submit"
        onClick={ applyFilter }
      >
        Filtrar
      </button>
    </form>
  );
}

export default FilterArea;
