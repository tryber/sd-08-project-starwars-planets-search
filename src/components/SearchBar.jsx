import React, { useContext } from 'react';
import { PlanetsContext } from '../context/planetsContext';

const SearchBar = () => {
  const { filterName } = useContext(PlanetsContext);

  const handleChange = ({ target }) => {
    const { value } = target;
    filterName(value);
  };

  return (
    <label htmlFor="name-filter">
      <input
        type="text"
        id="name-filter"
        onChange={ handleChange }
        data-testid="name-filter"
      />
    </label>
  );
};

export default SearchBar;
