import React, { useContext } from 'react';
import StarWarsPlanetsContext from '../context/StarWarsPlanetsContext';

function TextFilter() {
  const {
    filters,
    setFilters,
  } = useContext(StarWarsPlanetsContext);
  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Filtrar por texto"
        value={ filters.filterByName.name }
        onChange={ ({ target }) => {
          setFilters({
            ...filters,
            filterByName: { name: target.value },
          });
        } }
      />
    </div>
  );
}
export default TextFilter;
