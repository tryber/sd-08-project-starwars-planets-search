import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import getPlanets from '../services/index';

const arrOptions = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ filterByName: { name: '' } });
  const [filterNumeric, setFilterNumeric] = useState([]);
  const [newData, setNewData] = useState([]);
  const [selectColumns, setSelectColumns] = useState(arrOptions);
  const [excludeFilter, setExcludeFilter] = useState([]);

  // console.log(excludeFilter);

  async function importPlanets() {
    const planetsList = await getPlanets();
    setData(planetsList);
    setLoading(true);
  }

  useEffect(() => {
    importPlanets();
    setSelectColumns(arrOptions);
  }, []);

  useEffect(() => {
    const { filterByName: { name } } = filters;
    const filterDataName = data.filter((i) => (i.name.includes(name) && i));
    setNewData(filterDataName);
  }, [data, filters]);

  useEffect(() => {
    filterNumeric.forEach(({ comparison, column, value }) => {
      if (comparison === 'maior que') {
        setNewData(data.filter((i) => Number(i[column]) > Number(value)));
      } else if (comparison === 'menor que') {
        setNewData(data.filter((i) => Number(i[column]) < Number(value)));
      } else {
        setNewData(data.filter((i) => Number(i[column]) === Number(value)));
      }
    });
  }, [data, filterNumeric]);

  const globalState = {
    data,
    loading,
    filters,
    setFilters,
    newData,
    selectColumns,
    setSelectColumns,
    filterNumeric,
    setFilterNumeric,
    setExcludeFilter,
    excludeFilter,
  };
  return (
    <StarWarsContext.Provider value={ globalState }>
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
