import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './Context';

const MAISUM = 1;
const DESCENDENTE = -1;

const ordenarr = (array, order) => [
  ...array.sort((planetaUm, planetaDois) => {
    const indexUm = parseInt(planetaUm[order.column], 10)
      ? parseInt(planetaUm[order.column], 10)
      : planetaUm[order.column];
    const indexDois = parseInt(planetaDois[order.column], 10)
      ? parseInt(planetaDois[order.column], 10)
      : planetaDois[order.column];
    if (indexUm > indexDois && order.sort === 'ASC') return MAISUM;
    if (indexUm < indexDois && order.sort === 'ASC') return DESCENDENTE;
    if (indexUm > indexDois && order.sort === 'DESC') return DESCENDENTE;
    if (indexUm < indexDois && order.sort === 'DESC') return MAISUM;
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
  filtrarPorNome: {
    name: '',
  },
  filtrarPorNumero: [{
    column: '',
    comparison: '',
    value: '',
  }],
  order: {
    column: 'name',
    sort: 'ASC',
  },
};

function PlnProvider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState(filterOptions);
  const [columns, setColumns] = useState(initialColumns);

  // chamada de api

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/').then((response) => response.json()).then((result) => setData(result.results));
  }, [data]);

  useEffect(() => {
    const { filtrarPorNome: { name }, filtrarPorNumero, order } = filters;
    filtrarPorNumero.forEach((filterValues) => {
      const { column, comparison, value } = filterValues;
      const filter = data.filter((planet) => {
        const includesName = planet.name.toLowerCase().includes(name.toLowerCase());
        switch (comparison) {
        case ('maior que'):
          return parseInt(planet[column], 10) > parseInt(value, 10) && includesName;
        case ('menor que'):
          return parseInt(planet[column], 10) < parseInt(value, 10) && includesName;
        case ('igual a'):
          return parseInt(planet[column], 10) === parseInt(value, 10) && includesName;
        default:
          return includesName;
        }
      });
      const ordenado = ordenarr(filter, order);
      setPlanets(ordenado);
    });
  }, [data, filters]);

  const contextValues = { planets, setPlanets, filters, setFilters, columns, setColumns };

  return (
    <PlanetsContext.Provider value={ contextValues }>
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlnProvider;

PlnProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
