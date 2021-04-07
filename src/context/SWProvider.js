import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';
import services from '../services';
import utils from '../utils';

const SWProvider = ({ children }) => {
  const { Provider } = SWContext;

  const [data, setData] = useState({});
  const [columnFilters, setColumnFilters] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [comparisonFilters, setComparisonFilters] = useState([
    'maior que', 'menor que', 'igual a',
  ]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filters, setFilters] = useState(
    {
      filterByName: { name: '' },
      filterByNumericValues: [],
    },
  );

  useEffect(() => {
    async function getResponse() {
      const response = await services.fetchData(setData);
      setData(response);
      setFilteredPlanets(response.results);
    }
    getResponse();
  }, []);

  useEffect(() => {
    const { filterByName: { name }, filterByNumericValues } = filters;
    if (name.length === 0 && filterByNumericValues.length === 0) {
      setFilteredPlanets(data.results);
    } else if (name.length > 0 && filterByNumericValues.length === 0) {
      setFilteredPlanets(utils.filterByName(data.results, name));
    } else if (name.length === 0 && filterByNumericValues.length > 0) {
      setFilteredPlanets(utils
        .filterByNumericValues(data.results, filters.filterByNumericValues));
    }
  }, [filters]);

  // useEffect(() => {
  //   const { name } = filters.filterByName;
  //   if (name === '') {
  //     setFilteredPlanets(data.results);
  //   } else {
  //     setFilteredPlanets(utils.filterByName(data.results, name));
  //   }
  //   // setFilteredPlanets(utils.filterByName(data.results, name));
  // }, [filters.filterByName]);

  // useEffect(() => {
  //   const { filterByNumericValues } = filters;
  //   if (filterByNumericValues.length === 0) {
  //     setFilteredPlanets(data.results);
  //   } else {
  //     setFilteredPlanets(utils
  //       .filterByNumericValues(data.results, filters.filterByNumericValues));
  //   }
  //   // setFilteredPlanets(utils
  //   //   .filterByNumericValues(data.results, filters.filterByNumericValues));
  // }, [filters.filterByNumericValues]);

  const contextValue = {
    data,
    setData,
    filters,
    setFilters,
    filteredPlanets,
    setFilteredPlanets,
    columnFilters,
    setColumnFilters,
    comparisonFilters,
    setComparisonFilters,
  };

  return (
    <Provider value={ contextValue }>
      {children}
    </Provider>
  );
};

SWProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SWProvider;
