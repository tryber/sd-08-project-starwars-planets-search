import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

const NameFilter = () => {
  const { handleChangeName } = useContext(planetsContext);
  return (
    <label htmlFor="name">
      Filtrar por texto:
      <input
        type="text"
        data-testid="name-filter"
        onChange={ handleChangeName }
        id="name"
      />
    </label>);
};

export default NameFilter;
