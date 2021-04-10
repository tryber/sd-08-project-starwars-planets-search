import React, { useContext } from 'react';
import myContext from '../context/dataContext';

function InputField() {
  const { filterByPlanetName, setFilterByPlanetName } = useContext(myContext);
  const { filters: { filterByName: { name },
    filterByNumericValues, order } } = filterByPlanetName;

  const handleChange = (e) => {
    setFilterByPlanetName({
      ...filterByPlanetName,
      filters: {
        filterByName: {
          name: e.target.value,
        },
        filterByNumericValues,
        order,
      },
    });
  };

  return (
    <section>
      <label htmlFor="input">
        Campo de busca
        <input
          value={ name }
          data-testid="name-filter"
          id="input"
          type="text"
          onChange={ handleChange }
        />
      </label>
    </section>
  );
}

export default InputField;
