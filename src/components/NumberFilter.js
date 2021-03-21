import React, { useContext, useState } from 'react';
import TodoContext from '../context/TodoContext';

function NumberFilter() {
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('');
  const { createFilter, removedFilter } = useContext(TodoContext);

  const arrayCollum = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const arrayComparison = ['maior que', 'menor que', 'igual a'];

  console.log(column);

  const filterDelete = () => {
    if (column === 'population') {
      const index = arrayCollum.indexOf(column);
      return arrayCollum.splice(index, 1);
    }
    if (column === 'diameter') {
      const index = arrayCollum.indexOf(column);
      return arrayCollum.splice(index, 1);
    }
    if (column === 'orbital_period') {
      const index = arrayCollum.indexOf(column);
      return arrayCollum.splice(index, 1);
    }
    if (column === 'rotation_period') {
      const index = arrayCollum.indexOf(column);
      return arrayCollum.splice(index, 1);
    }
    if (column === 'surface_water') {
      const index = arrayCollum.indexOf(column);
      return arrayCollum.splice(index, 1);
    }
  };
  filterDelete();

  const oi = (e) => removedFilter(e);

  const removed = () => (
    <div>
      <p data-testid="filter">
        {`${column} ${comparison} ${value}`}
        <button type="button" onClick={ oi }>X</button>
      </p>
    </div>
  );

  const renderTable = () => (
    <div>
      <select
        name="column"
        data-testid="column-filter"
        onChange={ ({ target }) => setColumn(target.value) }
      >
        {arrayCollum.map((items) => (
          <option key={ items } value={ items }>{items}</option>
        ))}
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ ({ target }) => setComparison(target.value) }
      >
        {arrayComparison.map((items) => (
          <option key={ items } value={ items }>{items}</option>
        ))}
      </select>
      <input
        name="value"
        onChange={ ({ target }) => setValue(target.value) }
        data-testid="value-filter"
        type="number"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => createFilter(column, comparison, value) }
      >
        Filtrar
      </button>
    </div>
  );

  return (
    <div>
      {removed()}
      {renderTable()}
    </div>
  );
}

export default NumberFilter;
