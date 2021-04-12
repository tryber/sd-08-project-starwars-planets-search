import React, { useContext, useState } from 'react';
import StarWarsPlanetsContext from '../context/StarWarsPlanetsContext';

function NumericFilter() {
  const {
    filters,
    setFilters,
  } = useContext(StarWarsPlanetsContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const toFilter = () => {
    const newColumnsOptions = filters.columnsOptions
      .filter((columnOption) => columnOption !== column);
    setFilters({
      ...filters,
      filterByNumericValues: filters.filterByNumericValues
        .concat({
          column,
          comparison,
          value,
        }),
      columnsOptions: newColumnsOptions,
    });
  };
  return (
    <form>
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => {
          setColumn(target.value);
        } }
      >
        {filters.columnsOptions.map((columnOption) => (
          <option
            value={ columnOption }
            key={ columnOption }
          >
            { columnOption }
          </option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => {
          setComparison(target.value);
        } }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        placeholder="number"
        value={ value }
        onChange={ ({ target }) => {
          setValue(target.value);
        } }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => toFilter() }
      >
        Filtrar
      </button>
    </form>
  );
}

export default NumericFilter;
