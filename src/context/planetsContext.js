import React, { useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types';
import planetsFetch from '../services/Api';

const PlanetsContext = createContext();

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [header, setHeader] = useState([]);
  const [name, setName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [filter, setFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [currentFilters, setCurrentFilters] = useState([]);
  const [sortFilter, setSortFilter] = useState({
    column: 'population',
    sort: '',
  });

  useEffect(() => {
    const filtered = data.filter((item) => item.name.toLowerCase().includes(name));
    setFilteredData(filtered);
  }, [data, name]);

  const ONE = 1;
  useEffect(() => {
    planetsFetch().then((response) => {
      setData(response.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -ONE;
        }
        return 0;
      }));
    });
  }, []);

  const [teste, setTeste] = useState('teste');

  const handleSortClick = () => {
    let newFilter = filteredData;
    const { column: orderColumn } = sortFilter;
    if (sortFilter.sort === 'DESC') {
      newFilter = newFilter.sort((a, b) => {
        if (Number(a[orderColumn]) < Number(b[orderColumn])) {
          return 1;
        }
        if (Number(a[orderColumn]) > Number(b[orderColumn])) {
          return -ONE;
        }
        return 0;
      });
      const rand = Math.random().toString();
      setTeste(rand);
      setFilteredData(newFilter);
      console.log(filteredData);
    }
    if (sortFilter.sort === 'ASC') {
      newFilter = newFilter.sort((a, b) => {
        if (Number(a[orderColumn]) < Number(b[orderColumn])) {
          return -ONE;
        }
        if (Number(a[orderColumn]) > Number(b[orderColumn])) {
          return 1;
        }
        return 0;
      });
      const rand = Math.random().toString();
      setTeste(rand);
      console.log(newFilter);
      setFilteredData(newFilter);
    }
  };

  useEffect(() => {
    if (data.length !== 0) {
      setHeader(
        Object.keys(data[0]).filter((property) => property !== 'residents'),
      );
    }
  }, [data]);

  const removeFilter = () => {
    setFilter([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    setCurrentFilters([]);
    setFilteredData(data);
  };

  const handleFilterClick = () => {
    if (comparison === 'maior que') {
      setFilteredData(data.filter((item) => Number(item[column] > Number(valueFilter))));
    } else if (comparison === 'menor que') {
      setFilteredData(data.filter((item) => Number(item[column] < Number(valueFilter))));
    } else {
      setFilteredData(data
        .filter((item) => Number(item[column] === valueFilter)));
    }
    setFilter([...filter].filter((item) => item !== column));
  };

  const provide = {
    data,
    header,
    filteredData,
    name,
    setName,
    setColumn,
    setComparison,
    setValueFilter,
    handleFilterClick,
    filter,
    setFilter,
    currentFilters,
    setCurrentFilters,
    removeFilter,
    sortFilter,
    setSortFilter,
    handleSortClick,
    teste,
  };

  return (
    <PlanetsContext.Provider value={ provide }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { PlanetsContext, PlanetsProvider as Provider };
