import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

export default function FilterInput() {
  const { searchTerm, handleChange } = useContext(StarwarsContext);
  return (
    <div>
      <label htmlFor="search">
        Name:
        <input
          type="text"
          name="search"
          placeholder="search"
          data-testid="name-filter"
          value={ searchTerm }
          onChange={ handleChange }
        />
      </label>
    </div>
  );
}
