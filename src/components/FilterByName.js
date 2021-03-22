import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FilterByName() {
  const { filters, setFilters } = useContext(StarWarsContext);

  const handleChange = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  };

  return (
    <input
      type="text"
      data-testid="name-filter"
      onChange={ handleChange }
    />
  );
}

export default FilterByName;
