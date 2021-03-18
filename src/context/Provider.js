import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

import Context from './Context';

import fetchPlanetsData from '../services/StarWarsPlanetsApi';

function Provider({ children }) {
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState([]);
  const [columnOptions, setColumnOptions] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  });
  const [numericFilterValues, setNumericFilterValues] = useState({
    column: columnOptions[0],
    comparison: 'maior que',
    value: 0,
  });
  const [orderFilterValues, setOrderFilterValues] = useState({
    column: 'name',
    sort: 'ASC',
  });

  function onChangeNumericFilter(id, value) {
    setNumericFilterValues({ ...numericFilterValues, [id]: value });
  }

  function onChangeNameFilter(id, value) {
    setFilters({ ...filters, filterByName: { [id]: value } });
  }

  function onChangeOrderFilter(name, value) {
    setOrderFilterValues({ ...orderFilterValues, [name]: value });
  }

  function setOrderFilter() {
    setFilters({ ...filters, order: { ...orderFilterValues } });
  }

  function onClickAddFilter() {
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, numericFilterValues],
    });
  }

  function onClickRemoveFilter(column) {
    const updateNumericFilter = filters.filterByNumericValues
      .filter((filter) => filter.column !== column);
    setFilters({ ...filters, filterByNumericValues: updateNumericFilter });
  }

  async function getPlanets() {
    setIsFetching(true);
    const planetsData = await fetchPlanetsData();
    setData(planetsData);
    setIsFetching(false);
  }

  useEffect(() => {
    getPlanets();
  }, []);

  useEffect(() => {
    const usedOptions = filters.filterByNumericValues.map((filter) => filter.column);
    setColumnOptions([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ].filter((column) => !usedOptions.includes(column)));
  }, [filters]);

  useEffect(() => {
    setNumericFilterValues({
      column: columnOptions[0],
      comparison: 'maior que',
      value: 0,
    });
  }, [columnOptions]);

  const value = {
    isFetching,
    data,
    filters,
    columnOptions,
    numericFilterValues,
    orderFilterValues,
    onChangeNameFilter,
    onChangeNumericFilter,
    onChangeOrderFilter,
    setOrderFilter,
    onClickAddFilter,
    onClickRemoveFilter,
  };

  return (
    <Context.Provider value={ value }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
