import React, { useState } from 'react';
import './App.css';

import Home from './Components/Home';

import SWContext from './Context/SWContext';

function App() {
  const [planets, setPlanets] = useState([]);
  const [menu, setMenu] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });
  const [isFiltered, setIsFiltered] = useState(false);

  const getPlanets = () => {
    if (planets.length < 1) {
      fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((data) => data.json())
        .then((response) => setPlanets(response.results));
    }
  };

  const filterByName = (e) => {
    if (e.target.value === '' && filters.filterByNumericValues.length < 1) {
      return setIsFiltered(false);
    }
    setFilteredPlanets(planets.filter((planet) => planet.name.includes(e.target.value)));
    setIsFiltered(true);
    setFilters({ ...filters, filterByName: { name: e.target.value } });
  };

  const addNumericFilter = (column, comparison, value) => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        { column, comparison, value },
      ],
    });
    switch (comparison) {
    case 'maior que':
      setFilteredPlanets(planets.filter((planet) => (
        Number(planet[column]) > Number(value)
      )));
      break;
    case 'menor que':
      setFilteredPlanets(planets.filter((planet) => (
        Number(planet[column]) < Number(value)
      )));
      break;
    case 'igual a':
      setFilteredPlanets(planets.filter((planet) => (
        Number(planet[column]) === Number(value)
      )));
      break;
    default:
      setFilteredPlanets(planets);
      break;
    }
    setIsFiltered(true);
  };

  return (
    <SWContext.Provider
      value={ {
        planets,
        filters,
        filteredPlanets,
        isFiltered,
        menu,
        setMenu,
        filterByName,
        getPlanets,
        addNumericFilter,
      } }
    >
      <h1>Star Wars Planet Search</h1>
      <Home />
    </SWContext.Provider>
  );
}

export default App;
