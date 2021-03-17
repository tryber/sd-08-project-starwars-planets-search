import { useContext, useEffect, useState } from 'react';
import PlanetContext from '../contexts/PlanetContext';

const useFilterByName = () => {
  const [filteredByName, setFilteredByName] = useState([]);

  const {
    planetsList,
    filters,
  } = useContext(PlanetContext);

  const {
    filterByName: { name }, filterByNumericValues } = filters;

  useEffect(() => {
    if (name !== '') {
      setFilteredByName(planetsList.filter((planet) => planet.name.includes(name)));
    }
    if (name === '' && filterByNumericValues.length === 0) {
      setFilteredByName(planetsList);
    }
  }, [filterByNumericValues.length, name, planetsList]);
  return [filteredByName, setFilteredByName];
};

export default useFilterByName;
