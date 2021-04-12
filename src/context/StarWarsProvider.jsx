import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const StarWarsContext = createContext();

const StarWarsProvider = ({ children }) => {
  const INITIAL_STATE = {
    filterByName: { name: '' },
    filterByNumericValues: [
      { column: 'population', comparasion: 'maior que', value: 0 },
    ],
  };
  const COLUMN_OPTIONS = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(INITIAL_STATE);
  const [options, setOptions] = useState(COLUMN_OPTIONS);

  useEffect(() => {
    async function fetchApi() {
      const endpoint = await fetch('https://swapi-trybe.herokuapp.com/api/planets/?format=json');
      const objct = await endpoint.json();

      setData(objct.results);
    }
    fetchApi();
  }, []);

  const filterFuncs = {
    filterByName: (name) => setFilters({ ...filters, filterByName: { name } }),
    filterByNum: (ob) => setFilters({ ...filters, filterByNumericValues: [ob] }),
    updateOptions: (opt) => setOptions(options.filter((option) => option !== opt)),
    resetFilters: () => setOptions(COLUMN_OPTIONS) || setFilters(INITIAL_STATE),
  };

  const providerValue = { data, filters, filterFuncs, options };
  return (
    <StarWarsContext.Provider value={ providerValue }>
      { children }
    </StarWarsContext.Provider>
  );
};

export default StarWarsProvider;

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
