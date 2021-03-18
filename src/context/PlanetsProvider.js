import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import planetsAPI from '../services/planetsAPI';

const InitialFilter = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
};

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState(InitialFilter);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const planetsFromAPI = await planetsAPI();
      setData(planetsFromAPI.results);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const { filterByName: { name } } = filters;
    const { filterByNumericValues } = filters;
    let filteredByName = data
      .filter((planet) => planet.name.toUpperCase().includes(name.toUpperCase()));
    if (filterByNumericValues.length === 0) setPlanets(filteredByName);
    else {
      filterByNumericValues.forEach(({ column, comparison, value }) => {
        filteredByName = filteredByName.filter((planet) => {
          if (comparison === 'maior que') return parseInt(planet[column], 10) > value;
          if (comparison === 'menor que') return parseInt(planet[column], 10) < value;
          return planet[column] === value;
        });
        setPlanets(filteredByName);
      });
    }
  }, [data, filters]);

  const context = { planets, isLoading, filters, setFilters };

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
