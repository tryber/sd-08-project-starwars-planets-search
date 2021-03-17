import React, { useContext, useState } from 'react';
import StarWarsContext from '../contexts/StarWarsContext';

import styles from '../styles/components/ColumnFilter.module.css';

const columnOptions = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];

const comparisonOptions = ['maior que', 'menor que', 'igual a'];

const ColumnFilter = () => {
  const [column, setColumn] = useState(columnOptions[0]);
  const [comparison, setComparison] = useState(comparisonOptions[0]);
  const [value, setValue] = useState(0);

  const {
    addFilter,
    filters: { filterByNumericValues },
  } = useContext(StarWarsContext);

  const invalidColumns = Object.values(filterByNumericValues)
    .map((filter) => filter.column);

  function handleAddFilter() {
    addFilter({ column, comparison, value });
  }

  return (
    <div className={ styles.columnFilterContainer }>
      <select
        data-testid="column-filter"
        value={ column }
        onChange={ ({ target }) => setColumn(target.value) }
      >
        { columnOptions
          .filter((currentColumn) => !invalidColumns.includes(currentColumn))
          .map((option, index) => (
            <option key={ index }>{ option }</option>)) }
      </select>

      <select
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ ({ target }) => setComparison(target.value) }
      >
        { comparisonOptions.map((option, index) => (
          <option key={ index }>{ option }</option>
        )) }
      </select>

      <input
        type="number"
        data-testid="value-filter"
        value={ value }
        onChange={ ({ target }) => setValue(Number(target.value)) }
      />

      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleAddFilter }
      >
        Adicionar filtro
      </button>
    </div>
  );
};

export default ColumnFilter;
