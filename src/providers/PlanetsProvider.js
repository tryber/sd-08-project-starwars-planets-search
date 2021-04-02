import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../contexts/PlanetsContext';
import { getPlanetsFromApi } from '../services/requests';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({ column: 'name', sort: 'ASC' });
  const [numericColumns, setNumericColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [dataToFilter, setDataToFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  useEffect(() => {
    const defaultColumn = numericColumns[0] || '';
    setDataToFilter({ ...dataToFilter, column: defaultColumn });
  }, [numericColumns]);

  async function fetchPlanets() {
    const allPlanets = await getPlanetsFromApi();
    setData(allPlanets);
    return allPlanets;
  }

  function handleFilterByName(name) {
    setFilterByName({ name });
  }

  function handleDataToFilter(key, value) {
    setDataToFilter({
      ...dataToFilter,
      [key]: value,
    });
  }

  function addNumericFilter() {
    const { column } = dataToFilter;
    if (column === '') return;
    const newNumericColumns = numericColumns.filter(
      (numericColumn) => numericColumn !== column,
    );
    setNumericColumns(newNumericColumns);
    setFilterByNumericValues([...filterByNumericValues, dataToFilter]);
  }

  function removeNumericFilter({ target }) {
    const column = target.name;
    const newNumericFilters = filterByNumericValues.filter(
      (filter) => filter.column !== column,
    );
    setFilterByNumericValues(newNumericFilters);
    setNumericColumns([...numericColumns, column]);
  }

  const filters = {
    filterByName,
    filterByNumericValues,
  };

  const state = {
    addNumericFilter,
    data,
    dataToFilter,
    fetchPlanets,
    filterByNumericValues,
    filters,
    handleFilterByName,
    handleDataToFilter,
    numericColumns,
    order,
    removeNumericFilter,
    setOrder,
  };

  return (
    <PlanetsContext.Provider value={ { ...state } }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
