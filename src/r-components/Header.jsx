import React, { useContext } from 'react';
import PlanetsContext from '../contextAPI/PlanetsContext';
import { setNumericFilter, removeFromNumericFilter, removeFilterOption,
} from '../services/filterFunctions';
import './Header.css';

function renderOptionsWithObj(paramObj) {
  const toRender = Object.entries(paramObj);
  return toRender.map(([id, name]) => (
    <option key={ `reactKeyColumn${id}` } value={ id }>{name}</option>
  ));
}

function renderListFilters(filters, setFilters) {
  const { filterByNumericValues } = filters;
  return filterByNumericValues.map(({ column }) => (
    <div data-testid="filter" key={ `reactkeyfilters${column}` }>
      <span>{column}</span>
      <button
        type="button"
        onClick={ () => removeFromNumericFilter(filters, setFilters, column) }
      >
        x
      </button>
    </div>
  ));
}

export default function Header() {
  const {
    columnFilter, headerForm, setHeaderForm, filters, setFilters,
  } = useContext(PlanetsContext);
  return (
    <header>
      <label htmlFor="nameFilter">
        <input
          data-testid="name-filter"
          name="nameFilter"
          type="text"
          value={ filters.filterByName.name }
          onChange={ ({ target: { value } }) => {
            setFilters({
              ...filters,
              filterByName: {
                ...filters.filterByName,
                name: value,
              },
            });
          } }
        />
      </label>

      <label htmlFor="columnFilter">
        <select
          data-testid="column-filter"
          name="columnFilter"
          onChange={ ({ target: { value } }) => setHeaderForm({
            ...headerForm,
            columnFilter: value,
          }) }
        >
          { renderOptionsWithObj(removeFilterOption(filters, columnFilter)) }
        </select>
      </label>

      <label
        htmlFor="comparisonFilter"
      >
        <select
          data-testid="comparison-filter"
          name="comparisonFilter"
          value={ headerForm.comparisonFilter }
          onChange={ ({ target: { value } }) => setHeaderForm({
            ...headerForm,
            comparisonFilter: value,
          }) }
        >
          <option value="igual a">igual a</option>
          <option value="menor que">menor que</option>
          <option value="maior que">maior que</option>
        </select>
      </label>

      <label htmlFor="valueFilter">
        <input
          data-testid="value-filter"
          type="number"
          name="valueFilter"
          id="valueFilter"
          value={ headerForm.valueFilter }
          onChange={ ({ target: { value } }) => setHeaderForm({
            ...headerForm,
            valueFilter: value,
          }) }
        />
      </label>

      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => {
          setNumericFilter(filters, setFilters, headerForm);
        } }
      >
        Filtrar
      </button>

      <label htmlFor="selectOrder">
        <span>Ordenar</span>
        <select name="selectOrder">
          { renderOptionsWithObj(columnFilter) }
        </select>
      </label>

      <label htmlFor="ascendent">
        <span>Ascendente</span>
        <input type="radio" name="Ascendent" />
      </label>
      <label htmlFor="Descendent">
        <span>Descendente</span>
        <input type="radio" name="Descendent" />
      </label>
      <div>
        { renderListFilters(filters, setFilters) }
      </div>
    </header>
  );
}
