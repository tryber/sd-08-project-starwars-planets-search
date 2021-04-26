import { useState, useEffect } from 'react';

const useFilterPlanets = (planets, filters) => {
  const {
    filterByNumericValues: { filtersArray },
    order: { column: columnOrder, sort },
  } = filters;

  const [filteredPlanets, setFilteredPlanets] = useState(planets);

  useEffect(() => {
    // console.log(planets);
    setFilteredPlanets(planets);
  }, [planets]);

  let newPlanetsList = filteredPlanets;

  const filterComparison = (planet, column, comparison, value) => {
    switch (comparison) {
    case 'maior que':
      return Number(planet[column]) > Number(value); // parseInt() deve funcionar tb maybe...
    case 'menor que':
      return Number(planet[column]) < Number(value);
    case 'igual a':
      return Number(planet[column]) === Number(value);
    default:
      break;
    }
  };

  if (filters.filterByNumericValues.status) {
    filtersArray.forEach(({ column, comparison, value }) => {
      newPlanetsList = newPlanetsList
        .filter((planet) => filterComparison(planet, column, comparison, value));
    });
    // console.log(newPlanetsList);
    // filteredPlanets.filter((planet) => filterComparison(planet, column, comparison, value));
  }

  if (columnOrder === 'name') {
    if (sort === 'DESC') {
      newPlanetsList = newPlanetsList
        .sort(({ [columnOrder]: a }, { [columnOrder]: b }) => a < b);
    } else {
      newPlanetsList = newPlanetsList
        .sort(({ [columnOrder]: a }, { [columnOrder]: b }) => a > b);
    }
  } else if (sort === 'ASC') {
    newPlanetsList = newPlanetsList
      .sort(({ [columnOrder]: a }, { [columnOrder]: b }) => Number(a) - Number(b));
  } else {
    newPlanetsList = newPlanetsList
      .sort(({ [columnOrder]: a }, { [columnOrder]: b }) => Number(b) - Number(a));
  }

  // name.startsWith(filters.filterByName?.name) tb dava kinda
  newPlanetsList = newPlanetsList.filter(({ name }) => (
    name.includes(filters.filterByName.name)
  ));

  return newPlanetsList;
};

export default useFilterPlanets;
