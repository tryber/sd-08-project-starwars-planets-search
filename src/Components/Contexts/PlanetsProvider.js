import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import fetchInfoAPI from '../../Services/PlanetAPI';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [isRequesting, setIsRequesting] = useState(false);
  const [data, setData] = useState([]);

  const getPlanets = async () => {
    setIsRequesting(true);
    const planets = await fetchInfoAPI();
    // console.log(planets);
    setData([...planets]);
    setIsRequesting(false);
  };

  useEffect(() => { getPlanets(); }, []);
  // console.log(data);
  return (
    <PlanetsContext.Provider value={ { isRequesting, data, getPlanets } }>
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;

PlanetsProvider.propTypes = { children: PropTypes.node.isRequired };
