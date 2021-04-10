import React, { useContext } from 'react';
import myContext from '../context/dataContext';

function Filters() {
  const { filterByPlanetName, setFilterByPlanetName } = useContext(myContext);
  const { filters: { filterByName,
    filterByNumericValues, order } } = filterByPlanetName;

  function removeFilter({ target }) {
    const filterRemoved = filterByNumericValues
      .filter((cada) => cada.column !== target.name);
    setFilterByPlanetName({
      ...filterByPlanetName,
      filters: {
        filterByName,
        filterByNumericValues: filterRemoved,
        order,
      },
    });
  }

  return (
    <ul>
      { filterByNumericValues.map((cada) => (
        <li data-testid="filter" key={ cada.column }>
          {cada.column}
          {' '}
          {cada.comparsion}
          {' '}
          {cada.value}
          <button name={ cada.column } onClick={ removeFilter } type="button">X</button>
          {' '}
        </li>))}
    </ul>
  );
}

export default Filters;
