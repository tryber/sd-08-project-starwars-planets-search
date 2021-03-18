import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const { setFilters } = useContext(PlanetsContext);

  const [col, setCol] = useState('population');
  const [num, setNum] = useState(0);
  const [parameter, setParamenter] = useState('maior que');

  function byName(event) {
    setFilters(event.target.value);
  }

  function byCol(event) {
    setCol(event.target.value);
  }

  function byNum(event) {
    setNum(event.target.value);
  }

  function byComparison(event) {
    setParamenter(event.target.value);
  }

  function setContext() {
    setFilters(null, col, parameter, num);
  }

  return (
    <section className="input-group mb-3">
      <label htmlFor="filterByName" className="input-group-text">
        Nome:
        <input
          name="filterByName"
          type="text"
          onChange={ byName }
          data-testid="name-filter"
          id="inputSearch"
          placeholder="Digite aqui"
          className="form-control ml-2"
        />
      </label>
      <label htmlFor="filterByColumn" className="input-group-text">
        Coluna:
        <select
          name="filterByColumn"
          onChange={ byCol }
          data-testid="column-filter"
          className="custom-select ml-2"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="filterByComparison" className="input-group-text">
        Parâmetro:
        <select
          name="filterByComparison"
          onChange={ byComparison }
          data-testid="comparison-filter"
          className="custom-select ml-2"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="filterByNum" className="input-group-text">
        Valor:
        <input
          type="number"
          name="filterByNum"
          onChange={ byNum }
          min="0"
          step="1"
          data-testid="value-filter"
          className="form-control ml-2"
        />
      </label>
      <button
        className="btn btn-outline-secondary"
        type="button"
        data-testid="button-filter"
        onClick={ setContext }
      >
        Enviar
      </button>
    </section>
  );
}

export default Filter;
