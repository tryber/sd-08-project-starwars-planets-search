import React, { useContext, useEffect, useState } from 'react';
import Table from '../components/Table';
import PlanetsContext from '../contexts/PlanetsContext';
import Select from '../components/Select';
import NumericFilters from '../components/NumericFilters';
import { getPlanetKeys } from '../services/requests';

function Home() {
  const [keys, setKeys] = useState([]);
  const [orderColumn, setOrderColumn] = useState('name');
  const [orderSort, setOrderSort] = useState('ASC');
  const {
    addNumericFilter,
    dataToFilter,
    fetchPlanets,
    filters,
    handleFilterByName,
    handleDataToFilter,
    numericColumns,
    setOrder,
  } = useContext(PlanetsContext);

  const { value } = dataToFilter;
  const { name } = filters.filterByName;

  const comparisonOptions = ['maior que', 'menor que', 'igual a'];

  useEffect(() => {
    fetchPlanets().then((planets) => planets);
    const updateKeys = async () => {
      setKeys(await getPlanetKeys());
    };
    updateKeys();
  }, []);

  return (
    <>
      <header>
        <input
          data-testid="name-filter"
          type="text"
          onChange={ (event) => handleFilterByName(event.target.value) }
          value={ name }
        />
        <Select
          testid="column-filter"
          options={ numericColumns }
          onChange={ ({ target }) => handleDataToFilter('column', target.value) }
        />
        <Select
          testid="comparison-filter"
          options={ comparisonOptions }
          onChange={ ({ target }) => handleDataToFilter('comparison', target.value) }
        />
        <input
          data-testid="value-filter"
          type="number"
          onChange={ ({ target }) => handleDataToFilter('value', target.value) }
          value={ value }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ addNumericFilter }
        >
          Filtrar
        </button>
        <Select
          testid="column-sort"
          options={ keys }
          onChange={ ({ target }) => setOrderColumn(target.value) }
        />
        <label htmlFor="ASC">
          <input
            id="ASC"
            data-testid="column-sort-input-asc"
            type="radio"
            name="sort"
            onChange={ () => setOrderSort('ASC') }
          />
          ASC
        </label>
        <label htmlFor="DESC">
          <input
            id="DESC"
            data-testid="column-sort-input-desc"
            type="radio"
            name="sort"
            onChange={ () => setOrderSort('DESC') }
          />
          DESC
        </label>
        <button
          data-testid="column-sort-button"
          type="button"
          onClick={ () => setOrder({ column: orderColumn, sort: orderSort }) }
        >
          Ordenar
        </button>
        <NumericFilters />
      </header>
      <Table keys={ keys } />
    </>
  );
}

export default Home;
