import React from 'react';

const COLLUMN_FILTER = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function SearchBar() {
  return (
    <div>
      <label htmlFor="name-filter">
        Texto:
        <input type="text" name="name-filter" data-testid="name-filter" />
      </label>
      <br />
      <select data-testid="column-filter" value="">
        <option value="">{null}</option>
        {COLLUMN_FILTER.map((i) => (
          <option
            key={ i }
            value={ i }
          >
            {i}

          </option>))}
      </select>
      <select data-testid="comparison-filter">
        <option value=">">maior que</option>
        <option value="<">menor que</option>
        <option value="=">igual a</option>
      </select>
      <input type="number" name="value-filter" data-testid="value-filter" />
      <button type="button" data-testid="button-filter">Filtrar</button>

    </div>
  );
}

export default SearchBar;
