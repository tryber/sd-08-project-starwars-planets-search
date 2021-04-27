import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './StarWarsContext';
import GetPlanets from '../services/api';

const Provider = ({ children }) => {
  const columns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const columnsByTable = [
    'Name',
    'Rotation_Period',
    'orbital_period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface_Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'Url',
  ];
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
    order: { column: 'Name', sort: 'ASC' },
  });
  const [columnsToDrop, setColumns] = useState(columns);

  useEffect(() => {
    async function fetchPlanets() {
      const planets = await GetPlanets();
      setData(planets);
    }
    fetchPlanets();
  }, []);

  const context = {
    data,
    filters,
    columnsToDrop,
    columnsByTable,
    setFilters,
    setColumns,
  };

  return <Context.Provider value={ context }>{children}</Context.Provider>;
};

Provider.propTypes = { children: PropTypes.node.isRequired };

export default Provider;
