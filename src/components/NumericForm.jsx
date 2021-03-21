import React, { useState, useContext, useEffect } from 'react';
import tableContext from '../context/tableContext';

export default function NumericForm() {
  const {
    setFilters,
    filters,
    columns,
    setColumns,
  } = useContext(tableContext);

  const { filterByNumericValues } = filters;

  const [isEmpty, setIsEmpty] = useState(false);

  const [numericFilter, setNumericFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const comparisonSelect = ['maior que', 'menor que', 'igual a'];

  // desabilita o botão de filtrar caso o select esteja vazio
  useEffect(() => {
    if (columns.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [columns]);

  const { value, column, comparison } = numericFilter;

  const handleInput = ({ target }) => {
    setNumericFilter({ ...numericFilter, [target.name]: target.value });
  };

  const handleClick = async () => {
    setColumns(columns.filter((option) => option !== column));
    setFilters({ ...filters,
      filterByNumericValues: [...filterByNumericValues, numericFilter] });
    //
    if (column === columns[0]) {
      setNumericFilter({ ...numericFilter, column: columns[1] });
    } else {
      setNumericFilter({ ...numericFilter, column: columns[0] });
    }
  };

  return (
    <div>
      <label htmlFor="columns">
        selecione:
        <select
          name="column"
          data-testid="column-filter"
          onChange={ handleInput }
        >
          {columns.map((name) => <option value={ name } key={ name }>{ name }</option>)}
        </select>
      </label>
      <label htmlFor="comparison">
        <select
          value={ comparison }
          name="comparison"
          data-testid="comparison-filter"
          onChange={ handleInput }
        >
          {comparisonSelect.map(
            (item) => {
              if (item === '') {
                return null;
              }
              return <option key={ item }>{item}</option>;
            },
          )}
        </select>
      </label>
      <label htmlFor="value">
        <input
          name="value"
          value={ value }
          data-testid="value-filter"
          type="number"
          onChange={ handleInput }
        />
      </label>
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleClick }
        disabled={ isEmpty }
      >
        Filtrar
      </button>
    </div>
  );
}
