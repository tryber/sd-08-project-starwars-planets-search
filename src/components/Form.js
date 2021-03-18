import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Form() {
  const { filters, setFilters } = useContext(PlanetsContext);
  const { filterByName: { name } } = filters;

  const handleChange = ({ target }) => {
    setFilters({
      ...filters,
      filterByName: {
        name: target.value,
      },
    });
  };

  return (
    <form>
      <label htmlFor="input-search">
        Planet:
        <input
          id="input-search"
          name="name"
          value={ name }
          onChange={ handleChange }
          data-testid="name-filter"
        />
      </label>
    </form>
  );
}

export default Form;
