import React, { useContext, useState } from 'react';
import planetsContext from '../context/planetsContext';

const NumberFilter = () => {
  const { newFilter, columnOptions } = useContext(planetsContext);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('>');
  const [value, setValue] = useState(0);

  const characteristics = {
    column,
    comparison,
    value,
  };

  return (
    <div>
      <label htmlFor="column-filter">
        Escolha um filtro:
        <select
          id="column-filter"
          onChange={ ({ target }) => setColumn(target.value) }
          data-testid="column-filter"
        >
          { columnOptions.map(
            (option) => <option key={ option } value={ option }>{option}</option>,
          )}
        </select>
      </label>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => setComparison(target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ ({ target }) => setValue(target.value) }
      />
      <button
        type="button"
        onClick={ () => newFilter(characteristics) }
        data-testid="button-filter"
      >
        Filtrar
      </button>
    </div>
  );
};

export default NumberFilter;
