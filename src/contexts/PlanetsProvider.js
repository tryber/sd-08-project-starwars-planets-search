import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanets from '../services/api';

const PlanetsProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function handleFetchPlanets() {
      const { results } = await fetchPlanets();

      setData(results);
    }

    handleFetchPlanets();
  }, []);

  return (
    <PlanetsContext.Provider value={ { data } }>
      {children}
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PlanetsProvider;
