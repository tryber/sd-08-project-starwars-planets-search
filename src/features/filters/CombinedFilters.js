import React, { useContext } from 'react';
import SelectFilter from './SelectFilter';
import MyContext from '../../context';

function CombinedFilters() {
  const { filters } = useContext(MyContext);
  const {
    filterByNumericValues,
    setFilterByNumericValues,
    newFilter,
    updateNewFilter,
  } = filters;

  const forbidden = filterByNumericValues.map((filter) => filter.column);
  const filterableColumns = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  return (
    <form>
      <SelectFilter selector="column">
        {filterableColumns.filter((column) => !forbidden.includes(column))
          .map((column) => <option key={ column } value={ column }>{column}</option>)}
      </SelectFilter>
      <SelectFilter selector="comparison">
        <option value="maior que">maior que</option>
        <option value="igual a">igual a</option>
        <option value="menor que">menor que</option>
      </SelectFilter>
      <input
        type="number"
        name="value-filter"
        id="value-filter"
        data-testid="value-filter"
        value={ filterByNumericValues.value }
        onChange={ (e) => updateNewFilter({
          ...newFilter,
          value: e.target.value,
        }) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => setFilterByNumericValues([
          ...filterByNumericValues,
          newFilter,
        ]) }
      >
        Adicionar filtro
      </button>
    </form>
  );
}

export default CombinedFilters;
