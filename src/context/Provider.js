import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getData from '../services';
import tableContext from './tableContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');

  const fetchStarWarsData = async () => {
    setLoading(true);
    const planetsInfo = await getData();
    planetsInfo.forEach((result) => delete result.residents);
    setData(planetsInfo);
    setLoading(false);
  };

  const handleChange = ({ target }) => {
    setName(target.value);
  };

  const filterPlanetsByValue = ({ column, comparison, value }) => {
    const newFilteredPlanets = data.filter((planet) => {
      const columnInfo = Number(planet[column]);
      console.log(columnInfo);
      const valueInfo = Number(value);
      if (comparison === 'menor que') {
        return columnInfo < valueInfo;
      }
      if (comparison === 'maior que') {
        return columnInfo > valueInfo;
      }
      return columnInfo === valueInfo;
    });
    setData(newFilteredPlanets);
  };

  const filters = {
    filters: {
      filterByName: {
        name,
      },
    },
  };

  const context = {
    data,
    fetchStarWarsData,
    loading,
    handleChange,
    filterByValue: (info) => filterPlanetsByValue(info),
    ...filters,
  };

  return (
    <tableContext.Provider value={ context }>
      {children}
    </tableContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
