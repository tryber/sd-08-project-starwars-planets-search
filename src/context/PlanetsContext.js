import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const PlanetsContext = createContext([]);

const PlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((res) => res.json());
      setPlanets(results);
      setFilteredNames(results);
    };
    fetchPlanets();
  }, []);

  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase

  const filterNamePlanets = (text) => {
    const filtered = planets.filter(
      ({ name }) => name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredNames(filtered);
  };

  const filterByNumericValues = ({ column, comparison, value }) => {
    const FilteredPlanets = planets.filter((planet) => {
      const targetInfo = Number(planet[column]);
      const valueToCompare = Number(value);
      if (comparison === 'menor que') {
        return targetInfo < valueToCompare;
      }
      if (comparison === 'maior que') {
        return targetInfo > valueToCompare;
      }
      return targetInfo === valueToCompare;
    });
    setFilteredNames(FilteredPlanets);
  };

  const context = {
    planets,
    filteredNames,
    filterByName: (text) => filterNamePlanets(text),
    filterByValues: (filter) => filterByNumericValues(filter),
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
