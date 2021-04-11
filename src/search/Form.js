import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Form() {
  const { filters: { filterByName: { name } }, setFilters,
  } = useContext(StarWarsContext);
  // console.log(data.filter((i) => (i.name.includes(name) && i)));

  function handleNameChange(e) {
    setFilters({ filterByName: { name: e.target.value } });
  }

  return (
    <form>
      <label htmlFor="name-filter">
        Nome do planeta:
        <input
          type="search"
          value={ name }
          name="name-filter"
          data-testid="name-filter"
          onChange={ handleNameChange }
        />
      </label>
    </form>
  );
}

export default Form;
