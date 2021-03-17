import React, { useState, useEffect } from 'react';
import { StateProvider } from './contexts/StateContext';
import getPlanets from './services/apiRequest';
import Table from './components/Table';
import FilterForm from './components/FilterForm';

function App() {
  const [data, setData] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [advancedFilter, setAdvancedFilter] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const filterAction = () => {
    setColumns(columns.filter((columnName) => columnName !== column));
    setData(advancedFilter);
  };
  useEffect(() => {
    switch (comparison) {
    case 'maior que':
      setAdvancedFilter(
        data.filter((planet) => parseInt(planet[column], 10) > value),
      );
      break;
    case 'menor que':
      setAdvancedFilter(
        data.filter((planet) => parseInt(planet[column], 10) < value),
      );
      break;
    case 'igual a':
      setAdvancedFilter(
        data.filter(
          (planet) => parseInt(planet[column], 10) === parseInt(value, 10),
        ),
      );
      break;
    default:
      break;
    }
  }, [column, comparison, data, value]);

  useEffect(() => {
    getPlanets().then((response) => setData(response));
  }, []);
  const providerValue = {
    data,
    columns,
    filters: {
      filterByName: {
        name: filterName,
      },
      filterByNumericValues: [
        {
          column,
          comparison,
          value,
        },
      ],
    },
    filterName,
    setFilterName,
    setColumn,
    setComparison,
    setValue,
    filterAction,
  };

  return (
    <StateProvider value={ providerValue }>
      <span>STAR WARS PLANETS</span>
      <FilterForm />
      <Table />
    </StateProvider>
  );
}

export default App;
