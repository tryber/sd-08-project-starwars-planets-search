import React, { useContext } from 'react';
import PlanetsStarWarsContext from '../context/PlanetsStarWarsContext';
import './forms.css';

function Forms() {
  const { handleChange, clickButton,
    column, filterNumeric, buttonSort } = useContext(PlanetsStarWarsContext);

  return (
    <form className="forms">
      <div className="div-name-planet">
        <label htmlFor="filterByName" className="label-planet-name">
          <input
            type="text"
            name="filterByName"
            className="input-name-planet"
            placeholder="Planet Name Search"
            onChange={ (event) => handleChange(event) }
            data-testid="name-filter"
          />
        </label>
      </div>
      <div className="div-filter">
        <div className="filter-select">
          <select
            data-testid="column-filter"
            name="column"
            value={ filterNumeric.column }
            onChange={ (event) => handleChange(event) }
          >
            {column.map((option, index) => <option key={ index }>{option}</option>)}
          </select>
        </div>
        <div className="filter-select">
          <select
            data-testid="comparison-filter"
            name="comparison"
            value={ filterNumeric.comparison }
            onChange={ (event) => handleChange(event) }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </div>
        <div className="filter-select">
          <input
            type="number"
            data-testid="value-filter"
            name="value"
            value={ filterNumeric.value }
            onChange={ (event) => handleChange(event) }
          />
        </div>
        <div className="filter-select">
          <button
            type="button"
            data-testid="button-filter"
            onClick={ () => clickButton() }
          >
            Filtrar
          </button>
        </div>
      </div>
      <div className="div-order">
        <div className="order">
          <select
            name="order"
            onChange={ (event) => handleChange(event) }
            data-testid="column-sort"
          >
            <option>Name</option>
            <option>population</option>
            <option>orbital_period</option>
          </select>
        </div>
        <div className="order">
          <label htmlFor="asc" className="label-order">
            Asc
            <input
              type="radio"
              name="sort"
              value="asc"
              className="with-gap"
              onChange={ (event) => handleChange(event) }
              data-testid="column-sort-input-asc"
            />
          </label>
          <label htmlFor="desc" className="label-order">
            Desc
            <input
              type="radio"
              name="sort"
              value="desc"
              className="with-gap"
              onChange={ (event) => handleChange(event) }
              data-testid="column-sort-input-desc"
            />
          </label>
        </div>
        <div className="order">
          <button
            type="button"
            onClick={ () => buttonSort() }
            data-testid="column-sort-button"
          >
            Ordenar
          </button>
        </div>
      </div>
    </form>
  );
}

export default Forms;
