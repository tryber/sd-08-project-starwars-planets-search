import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getData from '../api/getData';

export const savePlanet = createContext();

const initialState = {
  state: [],
  original: [],
  headers: [],
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
function PlanetContext(props) {
  const { children } = props;
  const [data, setData] = useState(initialState);
  const [selectPlanet, setSelectPlanet] = useState(initialStateSelectPlanet);
  const [filters, setFilters] = useState(initialStateFilters);

  useEffect(() => {
    async function effect() {
      const planetsList = await getData();
      setData({
        ...data,
        state: planetsList.filter((planetas) => delete planetas.residents),
        headers: Object.keys(planetsList[0]).filter((header) => header !== 'residents'),
        original: planetsList.filter((planetas) => delete planetas.residents),
      });
    }
    effect();
  }, []);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      state: prev.original.filter((planeta) => planeta.name
        .includes(filters.filterByName.name)),
    }));
  }, [filters]);

  const compareFilter = (column, compare, value, planet) => {
    switch (compare) {
    case 'maior que':
      return Number(planet[column]) > Number(value);
    case 'menor que':
      return Number(planet[column]) < Number(value);
    default:
      return Number(planet[column]) === Number(value);
    }
  };

  useEffect(() => {
    setData({
      ...data,
      state: data.original.filter((planetFind) => (
        filters.filterByNumericValues.every(({ column, compare, value }) => (
          compareFilter(column, compare, value, planetFind)
        ))
      )),
    });
  }, [filters.filterByNumericValues]);

  const giveData = {
    data,
    setData,
    filters,
    setFilters,
    selectPlanet,
    setSelectPlanet,
  };

  return (
    <savePlanet.Provider value={ giveData }>
      { children }
    </savePlanet.Provider>
  );
}

PlanetContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PlanetContext;
