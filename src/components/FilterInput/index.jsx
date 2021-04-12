import React, { useContext } from 'react';
import { StarWarsContext } from '../../context/StarWarsProvider';

const FilterInput = () => {
  const { filterFuncs, filters } = useContext(StarWarsContext);
  const { filterByName } = filterFuncs;

  return (
    <input
      data-testid="name-filter"
      type="text"
      value={ filters.filterByName.name }
      onChange={ ({ target }) => filterByName(target.value) }
    />
  );
};

export default FilterInput;
