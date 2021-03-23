import React, { useEffect, useState } from 'react';
import fetchPlanets from './services/api';
import Context from './context/Context';
import FilterContext from './context/FilterContext';
import './App.css';
import Table from './components/Table';
import Filters from './components/Filters';

const INITIAL_FILTER = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
};

function App() {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTER);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPlanets()
      .then((response) => setData(response));
  }, []);

  useEffect(() => {
    let dataF = data;
    const { filterByName: { name } } = filters;
    if (data !== [] && name !== '') {
      dataF = dataF.filter((i) => i.name.includes(name));
    }
    setPlanets(dataF);
  }, [data, filters]);

  useEffect(() => {
    const {
      filterByName: { name },
      filterByNumericValues,
    } = filters;

    filterByNumericValues.forEach((elem) => {
      const { comparison } = elem;
      const { column } = elem;
      const { value } = elem;
      const filter = data.filter((planet) => {
        const includesName = (planet.name).toLowerCase().includes(name.toLowerCase());
        switch (comparison) {
        case ('maior que'):
          return +(planet[column]) > +(value) && includesName;
        case ('menor que'):
          return +(planet[column]) < +(value) && includesName;
        case ('igual a'):
          return +(planet[column]) === +(value) && includesName;
        default:
          return includesName;
        }
      });
      setPlanets(filter);
    });
  }, [data, filters]);

  return (
    <FilterContext.Provider value={ { filters, setFilters } }>
      <Context.Provider value={ { data, planets, setPlanets } }>
        <Filters />
        <Table />
      </Context.Provider>
    </FilterContext.Provider>
  );
}

export default App;
