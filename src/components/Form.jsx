import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Form() {
  const { filters, setFilters } = useContext(StarWarsContext);
  const { filterByName: { text } } = filters;

  const handleChange = ({ target: { value } }) => {
    setFilters({ ...filters, filterByName: { text: value } });
  };

  return (
    <form>
      <label htmlFor="textInput">
        Buscar Planeta:
        <input
          data-testid="name-filter"
          name="textInput"
          type="text"
          value={ text }
          onChange={ handleChange }
        />
      </label>
    </form>
  );
}
