import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import PlanetsContext from './PlanetsContext';

const FILTERS_INITIAL_STATE = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
};

const COLUMNS_INITIAL_STATE = ['population',
  'orbital_period', 'rotation_period', 'surface_water', 'diameter'];

function Planets({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(FILTERS_INITIAL_STATE);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [columns, setColumns] = React.useState(COLUMNS_INITIAL_STATE);

  function filterByName(name) {
    const planet = data.filter((item) => item.name.includes(name));
    setFilteredPlanets(planet);
  }

  ///
  ///

  useEffect(() => {
    console.log('show');
    function filterThem() {
      const { filterByNumericValues } = filters;
      console.log(filterByNumericValues.length);
      if (filterByNumericValues.length === 0) {
        return setFilteredPlanets(data);
      }
      filters.filterByNumericValues.forEach((item) => {
        const newValues = data.filter((planet) => {
          switch (item.comparison) {
          case 'maior que':
            return Number(planet[item.column]) > Number(item.value);
          case 'menor que':
            return Number(planet[item.column]) < Number(item.value);
          case 'igual a':
            return Number(planet[item.column]) === Number(item.value);
          default:
            return '';
          }
        });
        return setFilteredPlanets(newValues);
      });
    }

    filterThem();
  }, [data, filters]);

  useEffect(() => {
    async function getItems() {
      const { results } = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json());
      setData(results);
      setFilteredPlanets(results);
    }
    getItems();
  }, []);

  const store = {
    filters,
    setFilters,
    filterByName,
    filteredPlanets,
    columns,
    setColumns,
  };
  return (
    <PlanetsContext.Provider value={ { store } }>
      {children}
    </PlanetsContext.Provider>
  );
}

export default Planets;

Planets.propTypes = {
  children: PropTypes.node.isRequired,
};
