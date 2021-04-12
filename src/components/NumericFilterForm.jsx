import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';
import FiltralhosDoCarilho from './FiltralhosDoCarilho';

export default function NumericFilterForm() {
  const {
    setNumFilter,
    selectColumns,
    numFilter,
    setSelectColumns,
  } = useContext(PlanetContext);
  const [numericFilter, setNumericFilter] = useState({
    column: '',
    comparison: '',
    value: '',
  });

  function handleChange({ target }) {
    setNumericFilter({
      ...numericFilter,
      [target.name]: target.value,
    });
  }

  function filterArrOptions() {
    setSelectColumns(selectColumns
      .filter((item) => item !== numericFilter.column));
  }

  function handleClick() {
    setNumFilter([
      ...numFilter,
      numericFilter,
    ]);
    filterArrOptions();
  }

  function removeFilter(column) {
    setNumFilter(numFilter.filter((item) => item.column !== column));
    setSelectColumns([...selectColumns, column]);
  }

  return (
    <>
      <form>
        <select name="column" id="" data-testid="column-filter" onChange={ handleChange }>
          {
            selectColumns && selectColumns
              .map((item, i) => <option key={ i } value={ item }>{item}</option>)
          }
        </select>
        <select
          name="comparison"
          id=""
          data-testid="comparison-filter"
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
          <option value="menor que">menor que</option>
        </select>
        <input
          type="number"
          name="value"
          value={ numericFilter.value }
          data-testid="value-filter"
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Buscar
        </button>
      </form>
      <FiltralhosDoCarilho filters={ numFilter } removeFilter={ removeFilter } />
    </>
  );
}
