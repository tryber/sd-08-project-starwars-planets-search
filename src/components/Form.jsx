import React from 'react';

import Planets from '../context/PlanetsContext';

function Form() {
  const { store: {
    filters, filterByName, setFilters, columns, setColumns },
  } = React.useContext(Planets);
  const [name, setName] = React.useState('');
  const [comparison, setComparison] = React.useState('maior que');
  const [value, setValue] = React.useState('');
  const [column, setColumn] = React.useState('');

  function handleChange({ target }) {
    setName(target.value);
    filterByName(target.value);
  }

  React.useEffect(() => {
    setColumn(columns[0]);
  }, [columns]);

  function handleFilter({ target }) {
    if (target.name === 'column-filter') setColumn(target.value);
    if (target.name === 'comparison-filter') setComparison(target.value);
    if (target.name === 'value') setValue(target.value);
  }

  function saveFilters() {
    const newValues = filters.filterByNumericValues;
    filters.filterByNumericValues = [...newValues, { column, comparison, value }];
    setFilters({ ...filters });
    setColumns(columns.filter((item) => item !== column));
    setColumn(columns[0]);
  }

  return (
    <form autoComplete="off">
      <label htmlFor="name-input">
        Nome:
        <input
          value={ name }
          data-testid="name-filter"
          onChange={ handleChange }
          type="text"
          name="name"
          id="name-input"
        />
      </label>
      <label htmlFor="column-filter">
        Por:
        <select
          onChange={ handleFilter }
          value={ column }
          name="column-filter"
          data-testid="column-filter"
          id="select"
        >
          {columns.map((item) => (<option key={ item }>{item}</option>))}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Comparação:
        <select
          onChange={ handleFilter }
          value={ comparison }
          name="comparison-filter"
          id="size-values"
          data-testid="comparison-filter"
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <label htmlFor="value">
        Valor:
        <input
          data-testid="value-filter"
          onChange={ handleFilter }
          value={ value }
          type="number"
          id="value"
          name="value"
        />
      </label>
      <button
        onClick={ saveFilters }
        type="button"
        data-testid="button-filter"
      >
        Filtrar
      </button>

    </form>
  );
}

export default Form;
