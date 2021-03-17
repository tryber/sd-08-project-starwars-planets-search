import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import getPlanetsAPI from '../services/planetsAPI';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilter] = useState({
    filterByName: { name: '' },
    filterValues: [],
    order: {
      columns: 'name',
      sort: 'ASC',
    },
    columnToGrab: [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ],
  });

  const zero = 0;

  const getPlanets = async () => {
    const refreshData = await getPlanetsAPI();
    const one = 1;
    const neg = -1;

    refreshData.sort((a, b) => {
      if (a.name > b.name) {
        return one;
      }
      if (a.name < b.name) {
        return neg;
      }
      return zero;
    });

    setData(refreshData);
  };

  useEffect(() => {
    getPlanets();
  }, [filters]);

  const filterPlanets = () => {
    const findSmallerPlanet = (column, number) => (
      parseInt(column, 10) < parseInt(number, 10)
    );
    const findBiggerPlanet = (column, number) => (
      parseInt(column, 10) > parseInt(number, 10)
    );
    const findEqualSizePlanet = (column, number) => (
      parseInt(column, 10) === parseInt(number, 10)
    );

    const filterName = (Planets) => (
      Planets.filter((Planet) => Planet
        .name.includes(filters.filterByName.name))
    );

    const planetComparing = (Planet, infoColumn, comparison, value) => {
      const compare = {
        'menor que': findSmallerPlanet(Planet[infoColumn], value),
        'maior que': findBiggerPlanet(Planet[infoColumn], value),
        'igual a': findEqualSizePlanet(Planet[infoColumn], value),
      };
      return compare[comparison];
    };

    const valuesFilter = (Planets) => {
      const { filterValues } = filters;
      if (filterValues.length === zero) {
        return Planets;
      }
      return Planets.filter((Planet) => (filterValues.every((filter) => (
        planetComparing(
          Planet,
          filter.column,
          filter.comparison,
          filter.value,
        )
      ))));
    };
    const filteredPlanetName = filterName(data);
    const filteredNumericValue = valuesFilter(filteredPlanetName);

    return filteredNumericValue;
  };

  const setOrderValues = (event) => {
    const { value, name } = event.target;
    setFilter({
      ...filters,
      order: { ...filters.order, [name]: value },
    });
  };

  // Consultei o link https://stackoverflow.com/questions/7000851/array-sort-doesnt-sort-numbers-correctly
  const setOrder = (elem1, elem2) => {
    const { column, sort } = filters.order;
    function desc(a, b) {
      return parseFloat(b) - parseFloat(a);
    }
    function asc(a, b) {
      return parseFloat(a) - parseFloat(b);
    }
    if (sort === 'ASC') {
      return asc(elem1[column], elem2[column]);
    }
    return desc(elem1[column], elem2[column]);
  };

  const planetsContext = {
    data,
    filters,
    setFilter,
    filterPlanets,
    setOrderValues,
    setOrder,
  };

  return (
    <StarWarsContext.Provider value={ planetsContext }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = { children: PropTypes.node.isRequired };

export default StarWarsProvider;
