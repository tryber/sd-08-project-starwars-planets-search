import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import getPlanets from '../services/getPlanets';

const filterState = {
  filterByName: {
    text: '',
  },
  order: {
    column: 'Name',
    sort: 'ASC',
  },
};

const arrOptions = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];
function Provider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState(filterState);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [numFilter, setNumFilter] = useState([]);
  const [countClick, setCountClick] = useState([]);
  const [arrColumns, setArrColumns] = useState(arrOptions);

  const NEGATIVE = -1;
  const POSITIVE = 1;

  function orderFunc(arrParam, column, sort) {
    return arrParam.sort((a, b) => {
      switch (sort) {
      case 'ASC':
        if (parseFloat(a[column]) < parseFloat(b[column])) return NEGATIVE;
        if (parseFloat(a[column]) > parseFloat(b[column])) return POSITIVE;
        break;
      case 'DSC':
        if (parseFloat(a[column]) < parseFloat(b[column])) return POSITIVE;
        if (parseFloat(a[column]) > parseFloat(b[column])) return NEGATIVE;
        break;
      default:
        break;
      }
      return 0;
    });
  }

  async function fetchPlanets() {
    const planets = await getPlanets();
    planets.sort((a, b) => {
      if (a.name < b.name) {
        return NEGATIVE;
      }
      if (a.name > b.name) {
        return POSITIVE;
      }
      return 0;
    });
    setData(planets);
    setIsLoading(true);
  }

  useEffect(() => {
    const { filterByName: { text } } = filters;
    const filtered = data.filter((item) => item.name.includes(text));
    setFilteredPlanets(filtered);
    if (arrColumns === undefined) {
      setArrColumns(arrOptions);
    }
  }, [data, filters, arrColumns]);

  useEffect(() => {
    fetchPlanets();
  }, []);

  useEffect(() => {
    let def = [...data];
    numFilter.forEach(({ column, comparison, value }) => {
      if (comparison === 'maior que') {
        def = data.filter((planet) => +planet[column] > +value);
      }
      if (comparison === 'igual a') {
        def = data.filter((planet) => +planet[column] === +value);
      }
      if (comparison === 'menor que') {
        def = data.filter((planet) => +planet[column] < +value);
      }
    });
    const { column, sort } = filters.order;
    const ordered = orderFunc(def, column, sort);
    setFilteredPlanets(ordered);
  },
  [data, numFilter, filters.order]);

  const contextValue = {
    data,
    isLoading,
    filters,
    setFilters,
    filteredPlanets,
    numFilter,
    setNumFilter,
    countClick,
    setCountClick,
    arrColumns,
    setArrColumns,

  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
