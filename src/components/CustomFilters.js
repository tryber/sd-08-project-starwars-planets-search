import React, { useContext } from 'react';
import ContextApi from '../context/Context';

function CustomFilters() {
  const {
    filterByNumericValues,
    setFilterByNumericValues,
    handleClick } = useContext(ContextApi);
  return (
    <form>
      <select
        data-testid="column-filter"
        name="column"
        onChange={ (ev) => setFilterByNumericValues(
          { ...filterByNumericValues, column: ev.target.value },
        ) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ (ev) => setFilterByNumericValues(
          { ...filterByNumericValues, comparison: ev.target.value },
        ) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <label htmlFor="field_filter">
        <input
          id="field_filter"
          name="value"
          type="number"
          data-testid="value-filter"
          onChange={ (ev) => setFilterByNumericValues(
            { ...filterByNumericValues, value: ev.target.value },
          ) }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar campos
      </button>
    </form>
  );
}

export default CustomFilters;
