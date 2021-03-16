import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextApi from './Context';
import requestApi from '../services/Api';

function ProviderApi({ children }) {
  const [dataApi, setDataApi] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([{
    column: 'population',
    comparison: 'maior que',
    value: '100000',
  }]);

  const handleClick = () => {
    setDataApi([]);
    const { column, comparison, value } = filterByNumericValues;
    if (comparison === 'maior que') {
      setDataApi(dataApi.filter((item) => Number(item[column]) > Number(value)));
    } else if (comparison === 'menor que') {
      setDataApi(dataApi.filter((item) => Number(item[column]) < Number(value)));
    } else {
      setDataApi(dataApi.filter((item) => Number(item[column]) === Number(value)));
    }
  };

  const fetchPlanet = async () => {
    setDataApi(await requestApi());
  };

  useEffect(() => {
    fetchPlanet();
  }, []);

  const context = {
    dataApi,
    filterName,
    setFilterName,
    filterByNumericValues,
    setFilterByNumericValues,
    handleClick,
  };

  return (
    <ContextApi.Provider value={ context }>
      {
        children
      }
    </ContextApi.Provider>
  );
}

export default ProviderApi;

ProviderApi.propTypes = {
  children: PropTypes.node.isRequired,
};
