import React, { useState } from 'react';
import propTypes from 'prop-types';
import PlanetsStarWarsContext from './PlanetsStarWarsContext';

const NUMBER_ONE_NEGATIVE = -1;

function PlanetsStarWarsProvider({ children }) {
  const filtersObject = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {},
  };

  const filterByNumericObjetc = {
    column: 'population',
    comparison: 'maior que',
    value: 0,
  };

  const [planetsStarWars, setPlanetStarWars] = useState([]);
  const [planetsStarWarsAUX, setPlanetStarWarsAUX] = useState([]);
  const [filters, setFilters] = useState(filtersObject);
  const [column, setColumn] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [filterNumeric, setFilterNumeric] = useState(filterByNumericObjetc);
  const [filterSort, setFilterSort] = useState({ column: '', sort: '' });

  const handleChange = ({ target }) => {
    if (target.name === 'filterByName') {
      setFilters({ ...filters, filterByName: target.value });
      const filtersPlanets = planetsStarWarsAUX
        .filter((planet) => planet.name.includes(target.value));
      setPlanetStarWars(filtersPlanets);
    } else if (target.name === 'order') {
      setFilterSort({ ...filterSort, column: target.value.toLowerCase() });
    } else if (target.name === 'sort') {
      setFilterSort({ ...filterSort, [target.name]: target.value });
    } else {
      setFilterNumeric({ ...filterNumeric, [target.name]: target.value });
    }
  };

  const clickButton = (click = 0) => {
    if (click === 0) {
      filters.filterByNumericValues.push(filterNumeric);
      column.splice(column.indexOf(filterNumeric.column), 1);
      setColumn(column);
    }

    let planets = [];
    if (filters.filterByNumericValues.length > 1) {
      planets = planetsStarWars;
    } else {
      planets = planetsStarWarsAUX;
    }

    if (filterNumeric.comparison === 'maior que') {
      const filtersLarger = planets
        .filter((planet) => parseFloat(planet[filterNumeric.column])
        > parseFloat(filterNumeric.value));
      setPlanetStarWars(filtersLarger);
    } else if (filterNumeric.comparison === 'menor que') {
      const filtersSmaller = planets
        .filter((planet) => parseFloat(planet[filterNumeric.column])
        < parseFloat(filterNumeric.value));
      setPlanetStarWars(filtersSmaller);
    } else if (filterNumeric.comparison === 'igual a') {
      const filtersEqual = planets
        .filter((planet) => planet[filterNumeric.column] === filterNumeric.value);
      setPlanetStarWars(filtersEqual);
    } else {
      setPlanetStarWars(planets);
      console.log('entriu aqui');
    }

    setFilterNumeric(filterByNumericObjetc);
  };

  const filterDeleteButton = (index) => {
    setColumn([...column, filters.filterByNumericValues[index].column]);
    filters.filterByNumericValues.splice(index, 1);
    if (!filters.filterByNumericValues.length) {
      setPlanetStarWars(planetsStarWarsAUX);
    }
  };

  const sortString = (array) => {
    if (array.sort === 'asc') {
      planetsStarWars.sort((a, b) => {
        if (a[array.column] > b[array.column]) {
          return 1;
        }
        if (b[array.column] > a[array.column]) {
          return NUMBER_ONE_NEGATIVE;
        }
        return 0;
      });
    } else if (filterSort.sort === 'desc') {
      planetsStarWars.sort((a, b) => {
        if (b[array.column] > a[array.column]) {
          return 1;
        }
        if (a[array.column] > b[array.column]) {
          return NUMBER_ONE_NEGATIVE;
        }
        return 0;
      });
    }
  };

  const buttonSort = () => {
    setFilters({ ...filters, order: filterSort });
    if (filterSort.column === 'name') {
      sortString(filterSort);
    } else if (filterSort.column === 'population'
      || filterSort.column === 'orbital_period') {
      if (filterSort.sort === 'asc') {
        planetsStarWars.sort((a, b) => a[filterSort.column] - b[filterSort.column]);
      } else if (filterSort.sort === 'desc') {
        planetsStarWars.sort((a, b) => b[filterSort.column] - a[filterSort.column]);
      }
    }
  };

  return (
    <PlanetsStarWarsContext.Provider
      value={ { planetsStarWars,
        filters,
        column,
        filterNumeric,
        setPlanetStarWars,
        setPlanetStarWarsAUX,
        handleChange,
        clickButton,
        filterDeleteButton,
        buttonSort } }
    >
      {children}
    </PlanetsStarWarsContext.Provider>
  );
}

PlanetsStarWarsProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default PlanetsStarWarsProvider;
