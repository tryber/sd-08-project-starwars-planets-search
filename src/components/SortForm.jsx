import React, { useContext } from 'react';
import PlanetContext from '../contexts/PlanetContext';

const SORT_OPTIONS = [
  'name',
  'rotation_period',
  'orbital_period',
  'diameter',
  'climate',
  'gravity',
  'terrain',
  'surface_water',
  'population',
  'films',
  'created',
  'edited',
  'url',
];

function SortForm() {
  const { filters, setFilters } = useContext(PlanetContext);

  const { order: { column, sort } } = filters;

  function handleSortChange({ target }) {
    const { value, type } = target;
    if (type === 'select-one') {
      setFilters({
        ...filters,
        order: { column: value, sort },
      });
    }
    if (type === 'radio') {
      setFilters({
        ...filters,
        order: { column, sort: value },
      });
    }
  }

  function handleSortClick() {
    setFilters({
      ...filters,
      sorted: true,
    });
  }

  function generateSortOptions() {
    return (
      <label htmlFor="column">
        Sort column by:
        <select
          id="order"
          // value={ column }
          onChange={ (e) => handleSortChange(e) }
          data-testid="column-sort"
          defaultValue="name"
        >
          {
            SORT_OPTIONS.map((op) => (
              <option key={ op } value={ op }>{ op }</option>
            ))
          }
        </select>
      </label>
    );
  }

  return (
    <div>
      { generateSortOptions() }
      <label htmlFor="ASC">
        Ascendent:
        <input
          name="sort-direction"
          id="ASC"
          type="radio"
          onChange={ (e) => handleSortChange(e) }
          value="ASC"
          checked={ sort === 'ASC' }
          data-testid="column-sort-input-asc"
        />
      </label>
      <label htmlFor="DESC">
        Descendent:
        <input
          name="sort-direction"
          id="DESC"
          type="radio"
          onChange={ (e) => handleSortChange(e) }
          value="DESC"
          checked={ sort === 'DESC' }
          data-testid="column-sort-input-desc"
        />
      </label>
      <button
        type="button"
        onClick={ () => handleSortClick() }
        data-testid="column-sort-button"
      >
        Sort it!
      </button>
    </div>
  );
}

export default SortForm;
