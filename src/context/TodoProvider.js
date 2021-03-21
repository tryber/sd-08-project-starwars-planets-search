import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TodoContext from './TodoContext';
import starWarsApi from '../Data';

function TodoProvider({ children }) {
  const [table, setTable] = useState([]);
  const [name, setName] = useState('');
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    async function getPlanet() {
      const result = await starWarsApi();
      setTable(result);
    }
    getPlanet();
  }, []);

  function createFilter(column, comparison, value) {
    setFilters([...filters, { column, comparison, value }]);
  }

  function removedFilter() {
    setFilters([]);
  }

  const getFilters = {
    filterByName: { name },
    filterByNumericValues: filters,
  };

  const contextValue = {
    filters: getFilters,
    table,
    setName,
    createFilter,
    removedFilter,
  };

  return (
    <div>
      <TodoContext.Provider value={ contextValue }>
        {children}
      </TodoContext.Provider>
    </div>
  );
}

TodoProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default TodoProvider;
