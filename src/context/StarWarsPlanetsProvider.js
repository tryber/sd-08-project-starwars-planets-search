import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsPlanetsContext from './StarWarsPlanetsContext';
import planetsAPIRequest from '../services/planetsAPIRequest';

function StarWarsPlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState(planets);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    columnsOptions: [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ],
    order: {
      column: 'Name',
      sort: 'ASC',
    },
  });

  const getPlanetsInfos = async () => {
    const planetsInfos = await planetsAPIRequest();
    const one = 1;
    const negative = -1;
    const zero = 0;
    planetsInfos.sort((a, b) => {
      if (a.name > b.name) {
        return one;
      }
      if (a.name < b.name) {
        return negative;
      }
      return zero;
    });
    setPlanets(planetsInfos);
  };

  useEffect(() => {
    getPlanetsInfos();
  }, []);

  useEffect(() => {
    const { name } = filters.filterByName;
    setFilteredPlanets(planets
      .filter((planet) => planet.name.includes(name)));
  }, [filters.filterByName.name, planets]);

  useEffect(() => {
    const { filterByNumericValues } = filters;
    // if (filterByNumericValues.every((filter) => filter.value === 0)) {
    //   setFilteredPlanets(planets);
    // }
    // if (filterByNumericValues.every((filter) => filter.value === undefined)) {
    //   setFilteredPlanets(planets);
    // }
    // if (filterByNumericValues.every((filter) => filter.value === '')) {
    //   setFilteredPlanets(planets);
    // }
    setFilteredPlanets(planets
      .filter((planet) => filterByNumericValues.every((filter) => {
        const { column, comparison, value } = filter;
        let result = false;
        if (comparison === 'maior que') {
          result = parseInt(planet[column], 10) > parseInt(value, 10);
          return result;
        }
        if (comparison === 'igual a') {
          result = parseInt(planet[column], 10) === parseInt(value, 10);
          return result;
        }
        if (comparison === 'menor que') {
          result = parseInt(planet[column], 10) < parseInt(value, 10);
          return result;
        }
        return result;
      })));
    const newColumnsOptions = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ].filter((columnOption) => filterByNumericValues
      .every((filter) => filter.column !== columnOption));

    setFilters({
      ...filters,
      columnsOptions: newColumnsOptions,
    });
  }, [filters.filterByNumericValues]);

  const data = {
    filters,
    setFilters,
    filteredPlanets,
  };

  return (
    <StarWarsPlanetsContext.Provider value={ data }>
      {children}
    </StarWarsPlanetsContext.Provider>
  );
}

StarWarsPlanetsProvider.propTypes = { children: PropTypes.node.isRequired };

export default StarWarsPlanetsProvider;
