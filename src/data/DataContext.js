import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import searchPlanets from '../services/Api';

export const DataContext = createContext();

const initialState = {
  state: [],
  headers: [],
  original: [],

};

const initialStateFilters = {

  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
};

const initialStateSelectPlanet = [
  'population',
  'diameter',
  'rotation_period',
  'orbital_period',
  'surface_water'];

const Store = (props) => {
  const { children } = props;
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(initialStateFilters);
  const [selectPlanet, setSelectPlanet] = useState(initialStateSelectPlanet);

  useEffect(() => {
    async function fetchData() {
      const planets = await searchPlanets();

      setData({
        ...data,
        state: planets.filter((planetas) => delete planetas.residents),
        headers: Object.keys(planets[0]).filter((header) => header !== 'residents'),
        original: planets.filter((planetas) => delete planetas.residents),
      });

      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      state: prev.original.filter((planet) => planet.name
        .includes(filters.filterByName.name)),
    }));
  }, [filters]);

  function switchFiltros(column, comparison, value, planeta) {
    switch (comparison) {
    case 'maior que':
      return Number(planeta[column]) > Number(value);

    case 'menor que':
      return Number(planeta[column]) < Number(value);

    default:
      return Number(planeta[column]) === Number(value);
    }
  }

  useEffect(() => {
    setData({
      ...data,
      state: data.original.filter((planet1) => (
        filters.filterByNumericValues.every(({ column, comparison, value }) => (
          switchFiltros(column, comparison, value, planet1))))),
    });
  }, [filters.filterByNumericValues]);

  return (
    <DataContext.Provider
      value={ { data,
        setData,
        loading,
        filters,
        setFilters,
        selectPlanet,
        setSelectPlanet } }
    >
      {children}
    </DataContext.Provider>
  );
};

Store.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Store;
