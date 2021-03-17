import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const DateContext = createContext([]);

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filterPlanet, setFilterPlanet] = useState([]);
  const [filterNumber, setFilterNumber] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '100000',
  });

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((res) => res.json());
      setData(results);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filterPlanets = data;
    filterPlanets = data.filter((planet) => planet.name.includes((searchName)));
    setFilterPlanet(filterPlanets);
  }, [data, searchName]);

  const handleClick = () => {
    setData([]);
    const { column, comparison, value } = filterNumber;
    if (comparison === 'maior que') {
      return setData(data
        .filter((item) => Number(item[column]) > Number(value)));
    }
    if (comparison === 'menor que') {
      return setData(data
        .filter((item) => Number(item[column]) < Number(value)));
    }
    if (comparison === 'igual a') {
      return setData(data
        .filter((item) => Number(item[column]) === Number(value)));
    }
  };

  const filterName = (e) => {
    setSearchName(e.target.value);
  };

  const store = {
    data,
    searchName,
    filterPlanet,
    setData,
    filterName,
    filterNumber,
    handleClick,
    setFilterNumber,
  };

  return (
    <DateContext.Provider value={ store }>
      {
        children
      }

    </DateContext.Provider>
  );
};

export default DataProvider;

DataProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
};
