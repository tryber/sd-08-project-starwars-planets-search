import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './Components/Table';
import MyContext from './Components/MyContext';

function App() {
  const [isLoading, setLoading] = useState(true);
  const [starwarsData, setStarwarsData] = useState({});
  const [name, setName] = useState('');
  const [columnFilter, setColumnFilter] = useState('');
  const [comparisonFilter, setComparisonFilter] = useState('');
  const [valueFilter, setValueFilter] = useState(0);
  const [filterNumerics, setFilterNumerics] = useState([]);
  const [columnFilters, setColumnfilters] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [columnTypes, setColumnTypes] = useState([
    'maior que',
    'menor que',
    'igual a',
  ]);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json())
        .then((data) => {
          setStarwarsData(data);
          setLoading(false);
        });
    }
    fetchData();
  }, []);

  const handleChange = ({ target }) => {
    const { value } = target;
    setName(value);
  };

  const handleSelectColumn = ({ target: { value } }) => {
    setColumnFilter(value);
  };

  const handleSelectComparison = ({ target: { value } }) => {
    setComparisonFilter(value);
  };

  const handleNumber = ({ target: { value } }) => {
    setValueFilter(value);
  };

  const handleClick = () => {
    const newColumnFilter = [...columnFilters];
    const newColumnTypes = [...columnTypes];
    newColumnFilter.splice(newColumnFilter.indexOf(columnFilter), 1);
    newColumnTypes.splice(newColumnTypes.indexOf(comparisonFilter), 1);
    setColumnfilters(newColumnFilter);
    setColumnTypes(newColumnTypes);
    setFilterNumerics([...filterNumerics,
      {
        column: columnFilter,
        comparison: comparisonFilter,
        value: valueFilter,
      },
    ]);
  };

  const formField = () => (
    <form>
      <label htmlFor="name-filter">
        <input
          type="text"
          name="name-filter"
          placeholder="Digite o filtro"
          data-testid="name-filter"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="columnfilter">
        <select
          name="columnfilter"
          data-testid="column-filter"
          onChange={ handleSelectColumn }
          value={ columnFilter }
        >
          {columnFilters.map((column) => (
            <option key={ column }>{column}</option>
          ))}
        </select>
      </label>

      <label htmlFor="comparisonfilter">
        <select
          name="comparisonfilter"
          data-testid="comparison-filter"
          onChange={ handleSelectComparison }
          value={ comparisonFilter }
        >
          {columnTypes.map((column) => (
            <option key={ column }>{column}</option>
          ))}
        </select>
      </label>
      <label htmlFor="quantity">
        <input
          name="quantity"
          type="number"
          data-testid="value-filter"
          onChange={ handleNumber }
        />
      </label>
      <button type="button" data-testid="button-filter" onClick={ handleClick }>
        Filtrar
      </button>
    </form>
  );

  const contextValues = {
    starwarsData,
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues: filterNumerics,
    },
  };

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <MyContext.Provider value={ contextValues }>
          <div>
            <div>
              {isLoading ? (
                <h1>LOADING...</h1>
              ) : (
                <div>
                  {formField()}
                  <Table />
                </div>
              )}
            </div>
          </div>
        </MyContext.Provider>
      )}
    </div>
  );
}

export default App;
