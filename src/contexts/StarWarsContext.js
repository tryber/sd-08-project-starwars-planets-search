import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPlanets from '../services/starWarsApi';

const StarWarsContext = createContext();

export const StarWarsConsumer = StarWarsContext.Consumer;

export function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [name, setName] = useState('');
  const [filters, setFilters] = useState([]);
  const [orderColumn, setOrderColumn] = useState('name');
  const [orderSort, setOrderSort] = useState('ASC');
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    getPlanets().then(({ results }) => {
      results.forEach((result) => delete result.residents);
      setPlanets(results);
      setColumns(Object.keys(results[0]));
    });
  }, []);

  function changeName({ target }) {
    setName(target.value);
  }

  function changeOrderColumn({ target }) {
    setOrderColumn(target.value);
  }

  function changeOrderSort(sort) {
    setOrderSort(sort);
  }

  function addFilter(newFilter) {
    setFilters([...filters, newFilter]);
  }

  function removeFilter(index) {
    setFilters(filters.slice(0, index).concat(filters.slice(index + 1)));
  }

  const filtersNode = {
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues: filters,
      order: {
        column: orderColumn,
        sort: orderSort,
      },
    },
  };

  const context = {
    ...filtersNode,
    planets,
    orderSort,
    orderColumn,
    columns,
    changeOrderSort,
    changeOrderColumn,
    changeName,
    addFilter,
    removeFilter,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default StarWarsContext;
