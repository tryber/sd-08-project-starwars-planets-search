import React, { useContext, useState, useEffect } from 'react';
import myContext from '../context/dataContext';
import Filters from './filters';

function ShortSearch() {
  const [filterNumeric, setFilterNumeric] = useState({});
  const { filterByPlanetName,
    setFilterByPlanetName,
    columns, setColumns } = useContext(myContext);
  const { filters: { filterByName, filterByNumericValues, order } } = filterByPlanetName;

  useEffect(() => {
    setFilterNumeric({
      column: columns[0],
      comparsion: 'maior que',
      value: '0',
    });
  }, [columns]);

  function handleChange({ target }) {
    setFilterNumeric(
      {
        ...filterNumeric,
        [target.name]: target.value,
      },
    );
  }

  function submitFilter() {
    setFilterByPlanetName({
      ...filterByPlanetName,
      filters: {
        filterByName,
        filterByNumericValues: [...filterByNumericValues, filterNumeric],
        order,
      },
    });
    setColumns(columns.filter((column) => column !== filterNumeric.column));
  }

  return (
    <>
      <select name="column" onChange={ handleChange } data-testid="column-filter">
        {columns.map((cada) => <option key={ cada }>{cada}</option>)}
      </select>
      <select name="comparsion" onChange={ handleChange } data-testid="comparison-filter">
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        name="value"
        onChange={ handleChange }
        type="number"
        data-testid="value-filter"
      />
      <button
        data-testid="button-filter"
        onClick={ submitFilter }
        type="button"
      >
        {' '}
        Filtrar
      </button>
      <Filters />
    </>
  );
}

export default ShortSearch;
