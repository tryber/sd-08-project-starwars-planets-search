import { useCallback, useContext, useEffect, useState } from 'react';
import PlanetContext from '../contexts/PlanetContext';

const useFilterByColumn = () => {
  const [filteredByColumn, setFilteredByColumn] = useState([]);

  const {
    filters,
    planetsList,
  } = useContext(PlanetContext);

  const { filterByNumericValues } = filters;

  const verify = useCallback((filter, list) => {
    if (filter.comparison === 'maior que') {
      return list.filter((planet) => (
        Number(planet[filter.column]) > Number(filter.value)));
    }
    if (filter.comparison === 'menor que') {
      return list.filter((planet) => (
        Number(planet[filter.column]) < Number(filter.value)));
    }
    if (filter.comparison === 'igual a') {
      return list.filter((planet) => (
        Number(planet[filter.column]) === Number(filter.value)));
    }
  }, []);

  useEffect(() => {
    if (filterByNumericValues.length > 0) {
      let update = [];
      filterByNumericValues.forEach((filter, index) => {
        if (index === 0) {
          const verifiedPlanet = verify(filter, planetsList);
          update = verifiedPlanet;
        }
        if (index > 0) {
          const verifiedPlanet = verify(filter, update);
          update = verifiedPlanet;
        }
      });
      setFilteredByColumn(update);
    }
  }, [filterByNumericValues, planetsList, verify]);

  return [filteredByColumn, setFilteredByColumn];
};

export default useFilterByColumn;
