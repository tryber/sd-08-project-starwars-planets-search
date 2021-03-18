import React, { useContext } from 'react';
import SWPlanetsContext from '../context/SWPlanetsContext';

function FilterPlanetName() {
  const { filtersPlanets, setFiltersPlanets } = useContext(SWPlanetsContext);
  const {
    filterByName: { name },
  } = filtersPlanets;

  const handleChange = (event) => {
    setFiltersPlanets({
      ...filtersPlanets,
      filterByName: {
        name: event.target.value,
      },
    });
  };

  return (
    <form>
      <input
        type="text"
        value={ name }
        onChange={ handleChange }
        data-testid="name-filter"
        placeholder="Planet Name"
      />
    </form>
  );
}

export default FilterPlanetName;
