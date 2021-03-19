import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const PlanetsContext = createContext([]);

const PlanetsProvider = ({ children }) => {
  const [planets, setPlanetes] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/?format=json';
      const { results } = await fetch(endpoint).then((response) => response.json());
      results.map((only) => delete only.residents);
      setPlanetes(results);
    };
    fetchPlants();
  }, []);

  return (
    <PlanetsContext.Provider value={ planets }>
      {
        children
      }
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PlanetsProvider;
