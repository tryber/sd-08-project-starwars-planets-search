import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './planetsContext';

const PlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint)
        .then((response) => response.json());
      setPlanets(results);
      setFilteredPlanets(results);
    };
    fetchPlanets();
  }, []);

  const planetsFilter = (planetName) => {
    const filtered = planets.filter(
      ({ name }) => name.includes(planetName),
    );
    setFilteredPlanets(filtered || planets);
  };

  const valuesFilter = ({ column, comparison, value }) => {
    const filterValues = planets.filter((planet) => {
      const valueTarget = planet[column];
      if (comparison === 'menor que') {
        return valueTarget <= value;
      }
      if (comparison === 'maior que') {
        return parseInt(planet[column], 10) > parseInt(value, 10);
      }
      return valueTarget === value;
    });
    setFilteredPlanets(filterValues);
  };

  const context = {
    planets,
    filteredPlanets,
    filterByName: (planetName) => planetsFilter(planetName),
    filterByNumericValues: (planetValues) => valuesFilter(planetValues),
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {
        children
      }
    </PlanetsContext.Provider>
  );
};

export default PlanetsProvider;

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
