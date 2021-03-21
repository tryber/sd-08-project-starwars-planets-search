import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import PlanetsContext from '../context/planetsContext';
import './searchBarStyle.css';

const SearchBar = () => {
  const { filterByName, filterByNumericValues } = useContext(PlanetsContext);
  const [filters, setFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: null,
  });

  const handleNameChange = ({ target: { value } }) => {
    filterByName(value);
  };

  const handleFiltersChange = ({ target: { name, value } }) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    filterByNumericValues(filters);
  };

  return (
    <section>
      <header>
        <h1>In a galaxy far far away...</h1>
      </header>
      <Form>
        <input
          data-testid="name-filter"
          type="text"
          placeholder="Enter the planet name"
          onChange={ handleNameChange }
        />
        <select
          data-testid="column-filter"
          name="column"
          onChange={ handleFiltersChange }
          required
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
          onChange={ handleFiltersChange }
          required
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          data-testid="value-filter"
          name="value"
          type="number"
          onChange={ handleFiltersChange }
          placeholder="Enter a number"
          required
        />

        <button
          variant="primary"
          data-testid="button-filter"
          type="submit"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </Form>
    </section>
  );
};

export default SearchBar;
