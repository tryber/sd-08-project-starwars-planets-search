import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const StarWarsContext = createContext();
const StarWarsProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [] });

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((json) => setData(json.results));
  }, []);

  const context = {
    data,
    setSearch,
    setFilter,
    filter,
    search,
  };

  useEffect(() => {
    setFilter({ ...filter, filterByName: { name: search } });
  }, [search]);

  return (
    <StarWarsContext.Provider value={ context }>
      { children }
    </StarWarsContext.Provider>
  );
};
export { StarWarsContext, StarWarsProvider as Provider };

StarWarsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
