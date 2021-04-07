import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchPlanetsContext from './SearchPlanetsContext';
import getPlanetsStarWars from '../services/api';

const SearchPlanetsProvider = ({ children }) => {
  const [planets, setPlanets] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchPlanets() {
      const objectAPI = await getPlanetsStarWars();
      const { results } = objectAPI;
      setPlanets(results);
      setIsLoaded(true);
    }
    fetchPlanets();
  }, []);

  const context = {
    planets,
    isLoaded,
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
