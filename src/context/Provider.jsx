import React, { useState } from 'react';
import PropTypes from 'prop-types';
import tableContext from './tableContext';

export default function Provider({ children }) {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState(
    {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
      order: { column: 'name', sort: 'ASC' },
    },
  );

  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const context = {
    data,
    isFetching,
    filters,
    filteredData,
    columns,
    setData,
    setIsFetching,
    setFilters,
    setFilteredData,
    setColumns,
  };

  return (
    <div>
      <tableContext.Provider value={ context }>
        {children}
      </tableContext.Provider>
    </div>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
