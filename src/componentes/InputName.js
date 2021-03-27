import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function InputName() {
  const { userFilters, setUserFilters } = useContext(PlanetContext);
  const { filterByName: { name } } = userFilters;

  function handleChange({ target }) {
    const newValue = {
      ...userFilters,
      filterByName: {
        name: target.value,
      },
    };
    setUserFilters(newValue);
  }

  return (
    <form>
      <label htmlFor="name">
        <input
          type="text"
          id="name"
          onChange={ handleChange }
          data-testid="name-filter"
          name="name"
          value={ name }
        />
      </label>
    </form>
  );
}

export default InputName;
