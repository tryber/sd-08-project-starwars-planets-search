import React, { useContext } from 'react';
import PlanetContext from '../contexts/PlanetContext';
import FilterByColumn from './FilterByColumn';
import FilterByName from './FilterByName';
import SortForm from './SortForm';

function FilterForm() {
  const { filters, setFilters } = useContext(PlanetContext);

  const { filterByNumericValues } = filters;

  function handleDeleteFilter({ target }) {
    const { id } = target;
    const updateFilters = filterByNumericValues
      .filter((filter, index) => index !== Number(id));

    setFilters({
      ...filters,
      filterByNumericValues: updateFilters,
    });
  }

  function applyFilter() {
    if (filterByNumericValues) {
      return (
        <div>
          {filterByNumericValues.map((filter, index) => (
            <div key={ index } data-testid="filter">
              <span>{ `Column: ${filter.column}` }</span>
              <span>{ `Comparison: ${filter.comparison}` }</span>
              <span>{ `Value: ${filter.value}` }</span>
              <button
                id={ index }
                type="button"
                onClick={ (e) => handleDeleteFilter(e) }
              >
                X
              </button>
            </div>
          )) }
        </div>
      );
    }
  }

  return (
    <form>
      <FilterByName />
      <FilterByColumn />
      <SortForm />
      { applyFilter() }
    </form>
  );
}

export default FilterForm;
