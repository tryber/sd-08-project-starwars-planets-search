import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import requestApi from '../RequestApi/requestApi';
import planetsContext from './planetsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setNumber] = useState('0');
  const [shouldFilter, setShouldFilter] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filterByName, setFilterByName] = useState(false);

  async function fetchApi() {
    const results = await requestApi().then((response) => response.results);
    setData(results);
  }

  useEffect(() => {
    fetchApi();
    setIsFetching(false);
  }, []);

  const planetsValue = {
    data,
    isFetching,
    shouldFilter,
    filteredData,
    filterByName,
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues: [
        {
          column,
          comparison,
          value,
        },
      ],
    },
    setShouldFilter,
    setIsFetching,
    setName,
    setColumn,
    setComparison,
    setNumber,
    setFilteredData,
    setFilterByName,
  };

  return (
    <planetsContext.Provider value={ planetsValue }>
      {children}
    </planetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Provider;
