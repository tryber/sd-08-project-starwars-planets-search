import React, { useEffect, useState } from 'react';
import './App.css';
import buscaPlanetas from './api';
import StarWarsContext from './context/StarWarsContext';
import Table from './components/Table';
import Filters from './context/Filters';
import Search from './components/Search';

const INITIAL_FILTER = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
};

function App() {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTER);

  useEffect(() => {
    buscaPlanetas()
      .then((resp) => setData(resp));
  }, []);

  useEffect(() => {
    const { filterByName: { name } } = filters;
    const filter = data.filter((planet) => (planet.name)
      .toLowerCase().includes(name.toLowerCase()));
    setPlanets(filter);
  }, [data, filters]);

  useEffect(() => {
    const {
      filterByName: { name },
      filterByNumericValues,
    } = filters;

    filterByNumericValues.forEach((fil) => {
      const { comparison } = fil;
      const { column } = fil;
      const { value } = fil;
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
    <Filters.Provider value={ { filters, setFilters } }>
      <StarWarsContext.Provider value={ { data, planets, setPlanets } }>
        <span>Hello, App!</span>
        <Search />
        <Table />
      </StarWarsContext.Provider>
    </Filters.Provider>
  );
}

export default App;
