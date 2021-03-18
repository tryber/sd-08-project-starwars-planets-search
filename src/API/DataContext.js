import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import FETCH_API from './fetchAPI';

export const DataContext = createContext();

const GlobalDataContext = ({ children }) => {
  const [data, setData] = useState([]);
  const [stateOn, setStateOn] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [filterPlanet, setFilterPlanet] = useState([]);
  const [filterNumberValue, setfilterNumberValue] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '100000',
  });

  useEffect(() => {
    (async () => {
      setStateOn(true);
      const response = await FETCH_API();
      setData(response);
      setStateOn(false);
    })();
  }, []);

  useEffect(() => {
    const filterPlanets = data.filter((planet) => planet.name.includes((searchName)));
    setFilterPlanet(filterPlanets);
  }, [data, searchName]);

  const handleClick = () => {
    document.getElementById('pop').remove();
    const { column, comparison, value } = filterNumberValue;
    switch (comparison) {
    case 'maior que':
      return setData(data
        .filter((planet) => Number(planet[column]) > Number(value)));
    case 'menor que':
      return setData(data
        .filter((planet) => Number(planet[column]) < Number(value)));
    case 'igual a':
      return setData(data
        .filter((planet) => Number(planet[column]) === Number(value)));
    default: return setData(FETCH_API());
    }
  };

  const filterName = ({ target }) => setSearchName(target.value);

  const context = {
    data,
    searchName,
    filterPlanet,
    setData,
    filterName,
    handleClick,
    filterNumberValue,
    setfilterNumberValue,
  };

  return (
    <DataContext.Provider value={ context }>
      { stateOn ? 'Loading' : children }
    </DataContext.Provider>
  );
};

GlobalDataContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalDataContext;
