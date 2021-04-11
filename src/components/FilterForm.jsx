import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import Filtrilhos from './Filtrilhos';

export default function FilterForm() {
  const {
    setNumFilter,
    numFilter,
    arrColumns,
    setArrColumns } = useContext(StarWarsContext);

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

  const filterArrOptions = () => setArrColumns(arrColumns
    .filter((item) => item !== numericFilter.column));

  function handleClick() {
    setNumFilter([
      ...numFilter,
      numericFilter,
    ]);
    filterArrOptions();
  }

  function removeFilter(column) {
    setNumFilter(numFilter.filter((item) => item.column !== column));
    setArrColumns([...arrColumns, column]);
  }

  return (
    <>
      <form>
        <select name="column" id="" data-testid="column-filter" onChange={ handleChange }>
          {
            arrColumns && arrColumns
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
      <Filtrilhos filters={ numFilter } removeFilter={ removeFilter } />
    </>
  );
}
