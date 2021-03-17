import React, { useContext, useState } from 'react';
import MyDataContext from '../context/Context';

function Filter() {
  const { filters, setFilters } = useContext(MyDataContext);
  const [state, setState] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const { filterByName: { name } } = filters;
  const { column, comparison, value } = state;

  const changeNameFilter = (event) => {
    setFilters({ ...filters, filterByName: { name: event.target.value } });
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const changeNumericFilter = () => {
    setFilters({ ...filters, filterByNumericValues: [state] });
  };

  return (
    <header>
      <input
        type="text"
        data-testid="name-filter"
        value={ name }
        onChange={ changeNameFilter }
      />
      <select
        data-testid="column-filter"
        name="column"
        value={ column }
        onChange={ handleChange }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ comparison }
        onChange={ handleChange }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        value={ value }
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ changeNumericFilter }
      >
        Filtrar
      </button>
    </header>
  );
}

export default Filter;
