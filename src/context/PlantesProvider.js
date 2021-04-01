import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import getDataPlanetsStarWars from '../services/planetsAPI';

const ONE = 1;

const filterByName = (name, newData) => {
  newData = newData.filter((element) => element.name
    .toUpperCase()
    .includes(name.toUpperCase()));
  return newData;
};

const filterByNumbers = (column, comparison, value, newData) => {
  if (comparison === 'maior que') {
    return newData.filter((element) => Number(element[column]) > Number(value));
  }
  if (comparison === 'menor que') {
    return newData.filter((element) => Number(element[column]) < Number(value));
  }
  if (comparison === 'igual a') {
    return newData.filter((element) => Number(element[column]) === Number(value));
  }
};

const filterColumnsBySort = (order, newData) => {
  const { column, sort } = order;
  if (sort === 'DESC') {
    return newData.sort((a, b) => {
      if (Number(a[column]) < Number(b[column])) {
        return 1;
      }
      if (Number(a[column]) > Number(b[column])) {
        return -ONE;
      }
      return 0;
    });
  }
  return newData.sort((a, b) => {
    if (Number(a[column]) > Number(b[column])) {
      return 1;
    }
    if (Number(a[column]) < Number(b[column])) {
      return -ONE;
    }
    return 0;
  });
};

const filter = (dataStarWars, filters) => {
  let newData = [...dataStarWars];
  const { filterByName: { name }, order } = filters;
  const { filterByNumericValues } = filters;
  const [{ column, comparison, value }] = filterByNumericValues;

  if (name) {
    console.log(name);
    newData = filterByName(name, newData);
  }
  if (value) {
    newData = filterByNumbers(column, comparison, value, newData);
  }
  if (order.sort) {
    newData = filterColumnsBySort(order, newData);
  }

  return newData;
};

function PlanetsProvider({ children }) {
  const [dataStarWars, setDataStarWars] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
    order: {
      column: 'name',
      sort: '',
    },
  });

  useEffect(() => {
    const response = getDataPlanetsStarWars();
    response.then((data) => {
      console.log('Provider Renderizado');
      setDataStarWars(data.results.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -ONE;
        }
        return 0;
      }));
      setDescriptions(Object.keys(data.results[0]));
    });
  }, []);

  const data = [...filter(dataStarWars, filters)];

  const context = {
    data,
    setDataStarWars,
    descriptions,
    filters,
    setFilters,
    setDescriptions,
  };

  return <PlanetsContext.Provider value={ context }>{children}</PlanetsContext.Provider>;
}

export default PlanetsProvider;

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
