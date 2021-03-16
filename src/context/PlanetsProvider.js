import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const ORDER_POSITIVE = 1;
const ORDER_NEGATIVE = -1;

const sortArray = (array, order) => [
  ...array.sort((planetA, planetB) => {
    let columnA = parseInt(planetA[order.column], 10)
      ? parseInt(planetA[order.column], 10)
      : planetA[order.column];
    let columnB = parseInt(planetB[order.column], 10)
      ? parseInt(planetB[order.column], 10)
      : planetB[order.column];
    if (columnA === 'unknown') columnA = Infinity;
    if (columnB === 'unknown') columnB = Infinity;
    if (columnA > columnB && order.sort === 'ASC') return ORDER_POSITIVE;
    if (columnA < columnB && order.sort === 'ASC') return ORDER_NEGATIVE;
    if (columnA > columnB && order.sort === 'DESC') return ORDER_NEGATIVE;
    if (columnA < columnB && order.sort === 'DESC') return ORDER_POSITIVE;
    return 0;
  }),
];

const initialColumns = [
  'rotation_period',
  'orbital_period',
  'diameter',
  'surface_water',
  'population',
];

const filterOptions = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [
    {
      column: '',
      comparison: '',
      value: '',
    },
  ],
  order: {
    column: 'name',
    sort: 'ASC',
  },
};

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState(filterOptions);
  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((result) => setData(result.results));
  }, []);

  useEffect(() => {
    const {
      filterByName: { name },
      filterByNumericValues,
      order,
    } = filters;
    filterByNumericValues.forEach((filterValues) => {
      const { column, comparison, value } = filterValues;
      const filteredArray = data.filter((planet) => {
        const includesName = planet.name.toLowerCase().includes(name.toLowerCase());
        switch (comparison) {
        case 'maior que':
          return parseInt(planet[column], 10) > parseInt(value, 10) && includesName;
        case 'menor que':
          return parseInt(planet[column], 10) < parseInt(value, 10) && includesName;
        case 'igual a':
          return parseInt(planet[column], 10) === parseInt(value, 10) && includesName;
        default:
          return includesName;
        }
      });
      const sortedArray = sortArray(filteredArray, order);
      setPlanets(sortedArray);
    });
  }, [data, filters]);

  const context = { planets, setPlanets, filters, setFilters, columns, setColumns };

  return <PlanetsContext.Provider value={ context }>{children}</PlanetsContext.Provider>;
}

export default PlanetsProvider;

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
