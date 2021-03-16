import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import fetchData from '../services/fetchData';

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterName, setFilterName] = useState('');
  const [filterNumeric, setFilterNumeric] = useState([]);

  useEffect(() => {
    async function effect() {
      const apiData = await fetchData();
      setData(apiData);
      setIsLoading(false);
    }
    effect();
  }, []);

  return (
    <Context.Provider
      value={ {
        data,
        isLoading,
        filters: {
          filterByName: {
            name: filterName,
            setFilter: setFilterName,
          },
          filterByNumericValues: filterNumeric,
          setFilterNumeric,
        },
      } }
    >
      { children }
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired),
  ]).isRequired,
};

export default ContextProvider;
