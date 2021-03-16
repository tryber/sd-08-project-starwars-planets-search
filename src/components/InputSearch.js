import React, { useContext, useState } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';

const InputSearch = () => {
  const { filterByName, filterByValues } = useContext(PlanetsContext);
  const [filters, setFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 'null',
  });
  const handleChangeSearch = ({ target: { value } }) => {
    filterByName(value);
  };

  const handleChangeFilter = ({ target: { name, value } }) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleFilterButton = (e) => {
    e.preventDefault();
    filterByValues(filters);
  };

  return (

    <section>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ handleChangeSearch }
        placeholder="Digite o nome do Planeta..."
      />
      <form>
        <select
          data-testid="column-filter"
          name="column"
          onChange={ handleChangeFilter }
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
          onChange={ handleChangeFilter }
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
          onChange={ handleChangeFilter }
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

export default InputSearch;
