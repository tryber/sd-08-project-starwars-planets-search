import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const PlanetsContext = createContext([]);

const Provider = ({ children }) => {
  const FILTERS_STUCTURE = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: 0,
      },
    ],
  };

  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState(FILTERS_STUCTURE);
  const [fetching, setFetching] = useState(true);
  const [planetsData, setPlanetsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const response = await fetch(ENDPOINT);
      const { results } = await response.json();
      setPlanets(results);
      setPlanetsData(results);
      setFetching(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredPlanets = planets
      .filter(({ name }) => name.toLowerCase().includes(
        filters.filterByName.name.toLowerCase(),
      )).filter((planet) => {
        let selectFilters = [];
        filters.filterByNumericValues.forEach(({ column, comparison, value }) => {
          if (comparison === 'maior que') {
            selectFilters = Number(planet[column]) > (value);
          } else if (comparison === 'menor que') {
            selectFilters = Number(planet[column]) < (value);
          } else if (comparison === 'igual a') {
            selectFilters = Number(planet[column]) === (value);
          } else {
            selectFilters = planets;
          }
        });
        return selectFilters;
      });
    setPlanetsData(filteredPlanets);
  }, [filters, planets]);

  const filterName = (value) => {
    setFilters({ ...filters, filterByName: { name: value } });
  };

  const setSelectFilters = (newFilter) => {
    setFilters({ ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, newFilter],
    });
  };

  const data = {
    fetching,
    filterName,
    setSelectFilters,
    planetsData,
  };
  return (
    <PlanetsContext.Provider value={ data }>
      { children }
    </PlanetsContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
