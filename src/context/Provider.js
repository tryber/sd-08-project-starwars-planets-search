import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Context from './index';
import { filterOptions } from '../services';

function Provider({ children }) {
  const [filters, setFilters] = useState([...filterOptions]);
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState(
    { filterByName: { name: '' } },
    { filterByNumericValues: [] },
    { order: { column: 'Name', sort: 'ASC' } },
  );
  const context = {
    data,
    setData,
    headers,
    setHeaders,
    filter,
    setFilter,
    filters,
    setFilters,
    filteredData,
    setFilteredData,
  };

  const sortByNumColumn = useCallback((column, sort) => {
    if (sort === 'ASC') {
      return function compareAsc(a, b) {
        return a[column] - b[column];
      };
    }
    return function compareDesc(a, b) {
      return b[column] - a[column];
    };
  }, []);

  const COMPAREMINORONE = -1;
  const sortByColumn = useCallback((column, sort) => {
    if (sort === 'ASC') {
      return function compareAsc(a, b) {
        if (a[column] < b[column]) return COMPAREMINORONE;
        if (a[column] > b[column]) return 1;
        return 0;
      };
    }
    return function compareDesc(a, b) {
      if (a[column] > b[column]) return COMPAREMINORONE;
      if (a[column] < b[column]) return 1;
      return 0;
    };
  }, [COMPAREMINORONE]);
  useEffect(() => {
    const fetchPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((res) => res.json());
      const formatData = results.reduce((planets, next) => {
        delete next.residents;
        return [...planets, next];
      }, []);
      setData(formatData);
      setHeaders(Object.keys(formatData[0]));
      setFilteredData(formatData.sort(sortByColumn('name', 'ASC')));
    };
    fetchPlanets();
  }, [setData, setHeaders, setFilteredData, sortByColumn]);

  useEffect(() => {
    const { filterByName, filterByNumericValues, order } = filter;
    const column = order && order.column;
    const sort = order && order.sort;
    if (filterByNumericValues) {
      setFilteredData(data.filter((planets) => planets.name
        .includes(filterByName.name))
        .filter((filtPlanets) => filterByNumericValues
          .every((planet) => {
            if (planet.comparison === 'maior que') {
              return parseInt(filtPlanets[planet.column], 10)
          > parseInt(planet.value, 10);
            }
            if (planet.comparison === 'menor que') {
              return parseInt(filtPlanets[planet.column], 10)
          < parseInt(planet.value, 10);
            }
            return parseInt(filtPlanets[planet.column], 10)
        === parseInt(planet.value, 10);
          })).sort(sortByNumColumn(column, sort)));
    } else {
      setFilteredData(data.filter((planets) => planets.name
        .includes(filterByName.name)).sort(sortByNumColumn(column, sort)));
    }
  }, [setFilteredData, filter, data, sortByNumColumn]);

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
