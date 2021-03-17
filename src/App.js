import React, { useState, useEffect } from 'react';
import './App.css';
import Filter from './components/Filter';
import Table from './components/Table';
import MyDataContext from './context/Context';
import getData from './services';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const filterObject = {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  };

  const [filters, setFilters] = useState(filterObject);
  const { filterByName: { name } } = filters;
  const context = { filters, setFilters, filteredData };
  const { filterByNumericValues } = filters;

  useEffect(() => {
    getData()
      .then((response) => { setData(response); setFilteredData(response); });
  }, []);

  useEffect(() => {
    if (name.length > 0) {
      setFilteredData(data.filter((filteredName) => (filteredName.name)
        .toLowerCase().includes(name.toLowerCase())));
    }
    if (name.length === 0) setFilteredData(data);
  }, [name, data]);

  useEffect(() => {
    filterByNumericValues.forEach((fil) => {
      const { comparison, column, value } = fil;
      const filter = data.filter((planet) => {
        const includesName = (planet.name).toLowerCase().includes(name.toLowerCase());
        switch (comparison) {
        case ('maior que'):
          return Number(planet[column]) > Number(value) && includesName;
        case ('menor que'):
          return Number(planet[column]) < Number(value) && includesName;
        case ('igual a'):
          return Number(planet[column]) === Number(value) && includesName;
        default:
          return includesName;
        }
      });
      setFilteredData(filter);
    });
  }, [name, filterByNumericValues, data]);

  return (
    <MyDataContext.Provider value={ context }>
      <Filter />
      <Table />
    </MyDataContext.Provider>
  );
}

export default App;
