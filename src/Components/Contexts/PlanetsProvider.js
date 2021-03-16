import React, { useState } from 'react';
import PropTypes from 'prop-types';

import fetchInfoAPI from '../../Services/PlanetAPI';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [isRequesting, setIsRequesting] = useState(false);
  const [data, setData] = useState([]);

  const getPlanets = async () => {
    setIsRequesting(true);
    const { results } = await fetchInfoAPI();
    console.log(...results);
    setData([...results]);
    setIsRequesting(false);
  };

  return (
    <PlanetsContext.Provider value={ { isRequesting, data, getPlanets } }>
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;

PlanetsProvider.propTypes = { children: PropTypes.node.isRequired };
