import React, { useState } from 'react';
import PropType from 'prop-types';

import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const resp = await fetch(url);
    const { results } = await resp.json();
    setData(results);
  };

  return (
    <PlanetsContext.Provider value={ { data, fetchData } }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropType.node.isRequired,
};

export default PlanetsProvider;
