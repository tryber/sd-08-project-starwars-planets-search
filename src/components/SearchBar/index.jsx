import React, { useContext, useState } from 'react';
import { PlanetsContext } from '../../context/PlanetsContext';

const SearchBar = () => {
  const { filterByName, filterByValue } = useContext(PlanetsContext);
  const [filters, setFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 'null',
  });
  const handleSearchChange = ({ target: { value } }) => {
    filterByName(value);
  };

  const handleFilterChange = ({ target: { name, value } }) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleFilterButton = (e) => {
    e.preventDefault();
    filterByValue(filters);
  };

  return (

    <section className="search-bar">
      <input
        data-testid="name-filter"
        type="text"
        width="50"
        onChange={ handleSearchChange }
      />
      <form>
        <select
          data-testid="column-filter"
          name="column"
          onChange={ handleFilterChange }
          required
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ handleFilterChange }
          required
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>

        </select>
        <input
          type="number"
          name="value"
          data-testid="value-filter"
          onChange={ handleFilterChange }
          required
        />
        <button
          type="submit"
          data-testid="button-filter"
          onClick={ handleFilterButton }
        >
          Filtrar
        </button>
      </form>
    </section>
  );
};

export default SearchBar;
