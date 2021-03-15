import React, { useContext } from 'react';

import StarWarsPlanetsContext from '../context/StarWarsPlanetsContext';

function Filters() {
  const { filters, setFilters } = useContext(StarWarsPlanetsContext);
  const { name } = filters.filterByName;
  return (
    <form>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Filtrar por nome"
        value={ name }
        onChange={ (e) => setFilters({ ...filters,
          filterByName: { name: e.target.value },
        }) }
      />
      <br />
      <select
        data-testid="column-filter"
        // value={}
        // onChange={}
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select data-testid="comparison-filter">
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input type="number" data-testid="value-filter" placeholder="Número" />
      <button type="button" data-testid="button-filter">Adicionar</button>
    </form>
  );
}

export default Filters;
