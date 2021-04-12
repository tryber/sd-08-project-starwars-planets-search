import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchPlanetsContext from './SearchPlanetsContext';
import getPlanetsStarWars from '../services/api';

const SearchPlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filteredNames, setFilteredNames] = useState([]);
  const [order, setOrder] = useState({
    column: 'name',
    sort: 'ASC',
  });

  useEffect(() => {
    const inverted = -1;
    async function fetchPlanets() {
      const objectAPI = await getPlanetsStarWars();
      const { results } = objectAPI;
      results.sort(
        (planet0, planet1) => (
          planet0[order.column] > planet1[order.column] ? 1 : inverted),
      );
      setPlanets(results);
      setFilteredNames(results);
      setIsLoaded(true);
    }
    fetchPlanets();
  }, [order.column]);

  function filterByName(input) {
    const planetsFiltered = planets.filter(
      ({ name }) => name.toLowerCase().includes(input.toLowerCase()),
    );
    setFilteredNames(planetsFiltered);
  }

  function filterByNumericValues(arrayOfFilters) {
    let filteredPlanets = [...planets];
    arrayOfFilters.forEach(({ column, comparison, value }) => {
      filteredPlanets = filteredPlanets.filter((planet) => {
        const targetInfo = Number(planet[column]);
        const valueCompared = Number(value);
        if (comparison === 'menor que') {
          return targetInfo < valueCompared;
        }
        if (comparison === 'maior que') {
          return targetInfo > valueCompared;
        }
        return targetInfo === valueCompared;
      });
    });
    setFilteredNames(filteredPlanets);
  }

  // useEffect(() => {

  // }, []);

  useEffect(() => {
    if (filteredNames.length === 0) return;
    const orderIsNumerical = !Number.isNaN(Number(filteredNames[0][order.column]));
    // console.log(orderIsNumerical);
    const inverted = -1;
    const arrayOrded = [...filteredNames];
    if (orderIsNumerical) {
      if (order.sort === 'ASC') {
        arrayOrded.sort(
          (planet0, planet1) => (
            Number(planet0[order.column]) - Number(planet1[order.column])
          ),
        );
      } else {
        arrayOrded.sort(
          (planet0, planet1) => (
            Number(planet1[order.column]) - Number(planet0[order.column])
          ),
        );
      }
    } else if (order.sort === 'ASC') {
      arrayOrded.sort(
        (planet0, planet1) => (
          planet0[order.column] > planet1[order.column] ? 1 : inverted),
      );
    } else {
      arrayOrded.sort(
        (planet0, planet1) => (
          planet0[order.column] > planet1[order.column] ? inverted : 1),
      );
    }
    setFilteredNames(arrayOrded);
    // eslint-disable-next-line
  }, [order, planets]);

  const newOrder = (column, sort) => {
    setOrder({ column, sort });
  };

  const context = {
    planets,
    isLoaded,
    filteredNames,
    filterByName,
    filterByNumericValues,
    newOrder,
  };

  return (
    <SearchPlanetsContext.Provider value={ context }>
      {children}
    </SearchPlanetsContext.Provider>
  );
};
SearchPlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default SearchPlanetsProvider;
