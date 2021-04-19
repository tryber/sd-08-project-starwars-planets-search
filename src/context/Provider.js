import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  });
  const [selectOptions, setSelectOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  useEffect(() => {
    (async () => {
      const returnAPI = await fetch(
        'https://swapi-trybe.herokuapp.com/api/planets/',
      );
      const json = await returnAPI.json();
      const { results } = json;
      results.forEach((result) => delete result.residents);
      setData(results);
    })();
  }, []);

  const context = {
    filters,
    setFilters,
    data,
    selectOptions,
    setSelectOptions,
  };

  return <Context.Provider value={ context }>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
