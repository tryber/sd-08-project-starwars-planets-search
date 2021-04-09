import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './Context';
import getApi from '../services/api';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filterSort, setFilterSort] = useState({
    column: 'name',
    sort: 'ASC',
  });

  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    getApi().then((response) => setData(response));
  }, []);

  const handleOrder = (array, order) => {
    const MENOS_UM = -1;
    const inOrder = array.sort((a, b) => {
      const planetA = Number(a[order.column]) ? Number(a[order.column]) : a[order.column];
      const planetB = Number(b[order.column]) ? Number(b[order.column]) : b[order.column];
      if ((planetA > planetB && order.sort === 'ASC')
      || (planetA < planetB && order.sort === 'DESC')) return 1;
      if (planetA < planetB && order.sort === 'ASC') return MENOS_UM;
      if (planetA > planetB && order.sort === 'DESC') return MENOS_UM;
      return 0;
    });
    return inOrder;
  };

  useEffect(() => {
    const newFilter = data.filter((planet) => filters.every((eachFilter) => {
      const { column, comparison, value } = eachFilter;
      const infoPlanet = Number(planet[column]);
      const toCompare = Number(value);
      if (comparison === 'menor que') {
        return infoPlanet < toCompare;
      }
      if (comparison === 'maior que') {
        return infoPlanet > toCompare;
      }
      return infoPlanet === toCompare;
    }));
    const orderedArray = handleOrder(newFilter, filterSort);
    setFilteredPlanets(orderedArray);
  }, [data, filterSort, filters]);

  useEffect(() => {
    getApi().then((response) => setFilteredPlanets(response));
  }, []);

  const filterPlanetsByName = (textName) => {
    const filtered = data.filter(
      ({ name }) => name.toLowerCase().includes(textName.toLowerCase()),
    );
    setFilteredPlanets(filtered);
  };

  const deleteFilter = (index) => {
    const delFilter = filters.filter((_, indexFilter) => index !== indexFilter);
    setFilters(delFilter);
  };

  // const filterPlanetsByNumericValues = (params) => {
  //   const deveriaSer = console.log('oi', [
  //     ...filters,
  //     params,
  //   ]);
  //   const newFilter = data.filter((planet) => filters.every((eachFilter) => {
  //     const { column, comparison, value } = eachFilter;
  //     const infoPlanet = Number(planet[column]);
  //     const toCompare = Number(value);
  //     if (comparison === 'menor que') {
  //       return infoPlanet < toCompare;
  //     }
  //     if (comparison === 'maior que') {
  //       return infoPlanet > toCompare;
  //     }
  //     return infoPlanet === toCompare;
  //   }));
  //   setFilteredPlanets(newFilter);
  // };

  const contextValue = {
    data,
    filteredPlanets,
    filters,
    setFilterSort,
    deleteFilter,
    setFilters,
    filterByName: (textName) => filterPlanetsByName(textName),
    setFilteredPlanets,
    // filterByNumericValues: (filtersLocal) => filterPlanetsByNumericValues(filtersLocal),
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
