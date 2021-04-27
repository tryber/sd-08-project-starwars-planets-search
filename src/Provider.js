import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [name, setNameFilter] = useState('');
  const [filterByName, setFilter] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('');

  const fetchPlanets = async () => {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    return response.json().then(({ results }) => {
      setData(results);
      setFilter(results);
    });
  };

  const filterExample = {
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues: [{
        column,
        comparison,
        value,
      }],
    },
  };

  const MyContextValue = {
    setColumn,
    setComparison,
    setValue,
    filterExample,
    data,
    fetchPlanets,
    name,
    setNameFilter,
    setData,
    filterByName,
    setFilter,
  };
  return (
    <MyContext.Provider value={ MyContextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
