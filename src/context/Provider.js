import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import StarWarsData from '../services/api';

function Provider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(
    {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
      order: {
        column: 'Name',
        sort: 'ASC',
      },
    },
  );
  const [filterByNumericValue, setFilterByNumericValue] = useState([]);

  async function fetchPlanetData() {
    setIsLoading(true);
    const getData = await StarWarsData();
    setData(getData);
    setFilterByNumericValue(getData);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPlanetData();
  }, []);

  const contextValue = {
    isLoading,
    data,
    filters,
    setFilters,
    filterByNumericValue,
    setFilterByNumericValue,
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
