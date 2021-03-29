import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import getPlanet from '../api';
import StateContext from './StateContext';

const StarWarsProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [name, setName] = useState('');
  const [filtersByNumericValues, setFiltersByNumericValues] = useState([]);
  const [order, setOrder] = useState({
    column: 'name',
    sort: 'ASC',
  });

  useEffect(() => {
    getPlanet().then((items) => {
      items.forEach((item) => delete item.residents);
      setPlanets(items);
    });
  }, []);

  const headers = Object.keys(planets[0] || []);

  const filters = {
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues: filtersByNumericValues,
      order,
    },
  };

  return (
    <StateContext.Provider
      value={ {
        planets,
        headers,
        ...filters,
        setName,
        setFiltersByNumericValues,
        setOrder,
      } }
    >
      { children }
    </StateContext.Provider>
  );
};

StarWarsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

export default StarWarsProvider;
