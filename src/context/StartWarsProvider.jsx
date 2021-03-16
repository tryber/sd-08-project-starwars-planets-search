import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './Context';
import fetchAllPlanets from '../helpers';

function StartWarsProvider({ children }) {
  const [planetList, setPlanetList] = useState();
  const [filterByName, setFilterByName] = useState('');
  const [filterNumericColumns, setFilterNumericColumns] = useState({
    column: null,
    comparison: null,
    value: null,
  });
  const [filterList, setFilterList] = useState([]);
  const [orderColumnBy, setOrderColumnBy] = useState({
    orderColumn: 'name', orderType: 'Crescente',
  });

  useEffect(() => {
    async function getPlanets() {
      const allPlanets = await fetchAllPlanets();
      allPlanets.forEach((planet) => {
        delete planet.residents;
      });
      setPlanetList(allPlanets);
    }
    getPlanets();
  }, []);

  function updateColumnFilters(column, comparison, value) {
    setFilterList([...filterList, {
      column,
      comparison,
      value,
    }]);
    setFilterNumericColumns({
      column,
      comparison,
      value,
    });
  }

  function clearFilter() {
    setFilterNumericColumns({
      column: null,
      comparison: null,
      value: null,
    });
  }

  function removeColumnFilter(columnName) {
    const newList = filterList.filter((filter) => filter.column !== columnName);
    setFilterList(newList);
    clearFilter();
  }

  return (
    <StarWarsContext.Provider
      value={ {
        setFilterByName,
        planetList,
        filterByName,
        filterNumericColumns,
        updateColumnFilters,
        filterList,
        setFilterList,
        removeColumnFilter,
        orderColumnBy,
        setOrderColumnBy } }
    >
      {children}
    </StarWarsContext.Provider>
  );
}

StartWarsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default StartWarsProvider;
