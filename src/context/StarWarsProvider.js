import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import { getStarWarsAPI } from '../services/StarWarsAPI';

const LESS_ONE = -1;

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [filterPlanet, setFilterPlanet] = useState('');
  const [removed, setRemoved] = useState(false);
  const [filters, setFilter] = useState({
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
  });

  const functionLength = (filterLength) => {
    if (filterLength === 1) {
      filterLength = 0;
    }
    if (filterLength > 1) {
      filterLength -= 2;
    }
    return filterLength;
  };

  const filterByNumericValuesFunc = (dataFiltered, column, comparison, value) => {
    let filtered;
    if (comparison === 'maior que') {
      filtered = dataFiltered.filter((elem) => elem[column] > parseInt(value, 10));
      dataFiltered = filtered;
    }
    if (comparison === 'menor que') {
      filtered = dataFiltered.filter((elem) => elem[column] < parseInt(value, 10));
      dataFiltered = filtered;
    }
    if (comparison === 'igual a') {
      filtered = dataFiltered.filter((elem) => elem[column] === value);
      dataFiltered = filtered;
    }
    return filtered;
  };

  const [columns, setColumns] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );

  const conditionFunction = (sortValue, sortedArrray) => {
    if (sortValue === 'ASC') {
      setData(sortedArrray);
    } else {
      setData(sortedArrray.reverse());
    }
  };

  const sortParseInt = (filterValue) => data.sort((a, b) => {
    if (parseInt(a[filterValue], 10) > parseInt(b[filterValue], 10)) {
      return 1;
    }
    if (parseInt(b[filterValue], 10) > parseInt(a[filterValue], 10)) {
      return LESS_ONE;
    }
    return 0;
  });

  const sortString = (filterValue) => data.sort((a, b) => {
    if (a[filterValue] > b[filterValue]) {
      return 1;
    }
    if (b[filterValue] > a[filterValue]) {
      return LESS_ONE;
    }
    return 0;
  });

  const sortFunction = (sortValue, filterValue) => {
    let sortedArrray;
    setSorted(true);
    if (filterValue === 'orbital_period' || filterValue === 'diameter') {
      sortedArrray = sortParseInt(filterValue);
      conditionFunction(sortValue, sortedArrray);
    } else {
      sortedArrray = sortString(filterValue);
      conditionFunction(sortValue, sortedArrray);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getStarWarsAPI();
      response.results.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (b.name > a.name) {
          return LESS_ONE;
        }
        return 0;
      });
      setData(response.results);
    }
    fetchData();
  }, []);

  const context = {
    data,
    filters,
    setFilter,
    functionLength,
    columns,
    setColumns,
    filterByNumericValuesFunc,
    filterPlanet,
    setFilterPlanet,
    removed,
    setRemoved,
    sortFunction,
    sorted,
    setSorted,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
