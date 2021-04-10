import React, { useEffect, useState } from 'react';
import './App.css';
import myContext from './context/dataContext';
import InputField from './components/input';
import Table from './components/table';
import getPlanets from './services/starwarsAPI';
import ShortSearch from './components/shortSearch';
import OrderColumn from './components/columOrder';

const filterOptions = {
  filters: {
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  },
};

const columnFilter = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const ORDEM_POSITIVA = 1;
const ORDEM_NEGATIVA = -1;

// function ascendent(a, b) {
//   if (a.name > b.name) return ORDEM_POSITIVA;
//   if (a.name < b.name) return ORDEM_NEGATIVA;
//   return 0;
// }

// function descendent(a, b) {
//   if (a.name < b.name) return 1;
//   if (a.name > b.name) return -1;
//   return 0;
// }

function ASC(array, order) {
  return array.sort((a, b) => {
    if (!parseInt(a[order.column], 10)) {
      if (a[order.column] > b[order.column]) return ORDEM_POSITIVA;
      if (a[order.column] < b[order.column]) return ORDEM_NEGATIVA;
      return 0;
    }
    if (parseInt(a[order.column], 10)
    < parseInt(b[order.column], 10)) return ORDEM_POSITIVA;
    if (parseInt(a[order.column], 10)
    > parseInt(b[order.column], 10)) return ORDEM_NEGATIVA;
    return 0;
  });
  // console.log(ops);
}

// function DESC() {
//   const ops = data;
//   ops.sort(descendent);
//   console.log(ops);
//   setPlanets(ops);
// }

function App() {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [columns, setColumns] = useState(columnFilter);
  const [filterByPlanetName, setFilterByPlanetName] = useState(filterOptions);

  const tramelas = {
    data,
    setData,
    filterByPlanetName,
    setFilterByPlanetName,
    planets,
    setPlanets,
    columns,
    setColumns,
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getPlanets();
      const { results } = response;
      setData(results);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const { filters: { filterByName: { name },
      filterByNumericValues, order } } = filterByPlanetName;

    const planetsFiltreds = data
      .filter((cada) => cada.name.toLowerCase().includes(name.toLowerCase()));
    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach((planet) => {
        switch (planet.comparsion) {
        case 'maior que':
          setPlanets(planetsFiltreds
            .filter((cada) => Number(cada[planet.column]) > Number(planet.value)));
          break;
        case 'menor que':
          setPlanets(planetsFiltreds
            .filter((cada) => Number(cada[planet.column]) < Number(planet.value)));
          break;
        case 'igual a':
          setPlanets(planetsFiltreds
            .filter((cada) => Number(cada[planet.column]) === Number(planet.value)));
          break;
        default:
          setPlanets(planetsFiltreds);
          break;
        }
      });
    } else {
      setPlanets(ASC(planetsFiltreds, order));
      // if (order.column.length > 0) {
      //   if (order.sort === 'ASC') {
      //     const arrayCrescent = ASC(planetsFiltreds);
      //     console.log(arrayCrescent);
      //   } else { DESC(planetsFiltreds); }
      // }
    }
  }, [data, filterByPlanetName]);

  return (
    <myContext.Provider value={ tramelas }>
      <InputField />
      <ShortSearch />
      <OrderColumn />
      <Table />
    </myContext.Provider>
  );
}

export default App;
