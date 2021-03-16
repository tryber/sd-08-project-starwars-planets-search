import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

const URL = 'https://swapi.dev/api/planets/';

function getPlanetsAPI() {
  return fetch(URL).then((response) => (
    response.ok
      ? response.json()
      : Promise.reject(new Error('error'))
  ));
}

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    getPlanetsAPI().then(({ results }) => {
      results.forEach((result) => delete result.residents);
      setData(results);
    });
  }, [data, name]);

  function handleChange({ target }) {
    setName(target.value);
  }

  const filters = {
    filters: {
      filterByName: {
        name,
      },
    },
  };

  const context = { ...filters, data, handleChange };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default Provider;
