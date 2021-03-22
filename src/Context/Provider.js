import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function Provider({ children }) {
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [allPlanets, setAllPlanets] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filteredArray, setFilteredArray] = useState([]);
  const [filterColumn, setFilterColumn] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']
  );
  const [selected, setSelected] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });
  const [reset, setReset] = useState(0);
  useEffect(() => {
    async function fetchApi() {
      const data = await fetch(URL);
      const dataJson = await data.json();
      setAllPlanets(dataJson.results);
      setFilteredArray(dataJson.results);
    }
    fetchApi();
  }, []);

  const data = {
    allPlanets,
    setAllPlanets,
    setSearchName,
    searchName,
    filteredArray,
    setFilteredArray,
    filterColumn,
    setFilterColumn,
    selected,
    setSelected,
    reset,
    setReset,
  };
  return (
    <PlanetsContext.Provider value={ data }>
      { children}
    </PlanetsContext.Provider>

  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
