import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import StarWarsPlanetsContext from './StarWarsPlanetsContext';

const NUMBER_TO_ORDER = 1;

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  });
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    async function getPlanets() {
      const planetsFetchData = await (await fetch('https://swapi-trybe.herokuapp.com/api/planets')).json();
      setData(planetsFetchData.results);
    }
    getPlanets();
  }, []);

  useEffect(() => {
    const { filterByNumericValues } = filters;
    const filteredPlanetsByName = data
      .filter((planet) => planet.name.toLowerCase()
        .includes(filters.filterByName.name.toLowerCase()));
    let filteredPlanetsResult = filteredPlanetsByName;
    filterByNumericValues.forEach((filter) => {
      switch (filter.comparison) {
      case 'maior que':
        filteredPlanetsResult = filteredPlanetsByName
          .filter((planet) => (
            parseFloat(planet[filter.column]) > parseFloat(filter.value)
          ));
        break;
      case 'menor que':
        filteredPlanetsResult = filteredPlanetsByName
          .filter((planet) => (
            parseFloat(planet[filter.column]) < parseFloat(filter.value)
          ));
        break;
      case 'igual a':
        filteredPlanetsResult = filteredPlanetsByName
          .filter((planet) => (
            parseFloat(planet[filter.column]) === parseFloat(filter.value)
          ));
        break;
      default: break;
      }
    });
    const orderedAndFilteredPlanetsResult = filteredPlanetsResult
      .sort((planet1, planet2) => {
        let planet1Value = '';
        let planet2Value = '';
        if (parseFloat(planet1[filters.order.column])) {
          planet1Value = parseFloat(planet1[filters.order.column]);
          planet2Value = parseFloat(planet2[filters.order.column]);
        } else {
          planet1Value = planet1[filters.order.column];
          planet2Value = planet2[filters.order.column];
        }
        switch (filters.order.sort) {
        case 'ASC':
          return planet1Value > planet2Value
            ? NUMBER_TO_ORDER : -NUMBER_TO_ORDER;
        case 'DESC':
          return planet1Value < planet2Value
            ? NUMBER_TO_ORDER : -NUMBER_TO_ORDER;
        default: return null;
        }
      });
    setFilteredPlanets(orderedAndFilteredPlanetsResult);
  }, [data, filters]);

  const context = {
    filters,
    setFilters,
    filteredPlanets,
    setFilteredPlanets,
  };

  return (
    <StarWarsPlanetsContext.Provider value={ context }>
      {children}
    </StarWarsPlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
