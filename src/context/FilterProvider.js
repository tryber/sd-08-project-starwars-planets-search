import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FilterContext from './FilterContext';

function FilterProvider({ children }) {
  const [filters, setFilters] = useState(
    { filterByName: { name: '' },
      filterByNumericValues: [],
      order: { column: 'name', sort: 'ASC' } },
  );

  const setFilterName = (name) => {
    setFilters({ ...filters, filterByName: { name } });
  };

  const setFilterByNumericValues = (column, comparison, value) => {
    setFilters({ ...filters,
      filterByNumericValues: [...filters.filterByNumericValues,
        { column, comparison, value }] });
  };

  const resetNumericFilter = (column) => {
    setFilters({ ...filters,
      filterByNumericValues: [...filters.filterByNumericValues]
        .filter((filter) => filter.column !== column) });
  };

  const setOrder = (column, sort) => {
    setFilters({ ...filters, order: { column, sort } });
  };

  return (
    <FilterContext.Provider
      value={ { setFilterName,
        filters,
        setFilterByNumericValues,
        resetNumericFilter,
        setOrder } }
    >
      {children}
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterProvider;
