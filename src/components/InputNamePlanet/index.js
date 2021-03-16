import React, { useContext } from 'react';
import StarWarsContext from '../../provider/StarWarsContext';

function InputNamePlanet() {
  const {
    setName,
    filters: { filterByName: { name } },
  } = useContext(StarWarsContext);

  const handleChange = ({ target: { value } }) => {
    setName(value);
  };

  return (
    <input
      data-testid="name-filter"
      value={ name }
      type="text"
      onChange={ handleChange }
    />
  );
}

export default InputNamePlanet;
