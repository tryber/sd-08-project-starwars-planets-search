import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filtros() {
  const { filters, setFilters } = useContext(PlanetsContext);

  const filterByNumberInitial = {
    column: filters.columnValues[0],
    comparison: 'maior que',
    value: '',
  };

  const [filterByNumber, setFilterByNumber] = useState(filterByNumberInitial);

  function handleClick() {
    const columnValues = filters.columnValues
      .filter((col) => col !== filterByNumber.column);

    setFilters({
      ...filters,
      columnValues,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        filterByNumber,
      ],
    });
  }

  useEffect(() => {
    setFilterByNumber({
      column: filters.columnValues[0],
      comparison: 'maior que',
      value: '',
    });
  }, [filters.columnValues]);

  function numberFilter() {
    return (
      <form>
        <select
          className="form-select"
          value={ filterByNumber.column }
          data-testid="column-filter"
          onChange={ (e) => setFilterByNumber(
            {
              ...filterByNumber,
              column: e.target.value,
            },
          ) }
        >
          { filters.columnValues.map((col, index) => (
            <option
              key={ index }
              value={ col }
            >
              { col }
            </option>))}
        </select>
        <select
          className="form-select"
          data-testid="comparison-filter"
          value={ filterByNumber.comparison }
          onChange={ (e) => setFilterByNumber(
            {
              ...filterByNumber,
              comparison: e.target.value,
            },
          ) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          value={ filterByNumber.value }
          onChange={ (e) => setFilterByNumber(
            {
              ...filterByNumber,
              value: e.target.value,
            },
          ) }
        />
        <button type="button" data-testid="button-filter" onClick={ handleClick }>
          Filtrar
        </button>
      </form>
    );
  }

  function deleteFilter(e) {
    const filtersByNumeric = filters.filterByNumericValues
      .filter((ele) => ele.column !== e.target.name);
    if (filtersByNumeric.length === 0) {
      return setFilters({
        ...filters,
        columnValues: filters.columnValuesInitial,
        filterByNumericValues: filtersByNumeric });
    }

    const columnValues = filters.columnValuesInitial.filter((col) => {
      let isTrue = false;
      for (let ind = 0; ind < filtersByNumeric.length; ind += 1) {
        if (col !== filtersByNumeric[ind].column) {
          isTrue = true;
        }
      }
      return isTrue;
    });
    setFilters({
      ...filters,
      columnValues,
      filterByNumericValues: filtersByNumeric });
  }

  return (
    <div>
      <input
        type="text"
        value={ filters.filterByName.name }
        data-testid="name-filter"
        onChange={ (e) => setFilters(
          { ...filters, filterByName: { name: e.target.value } },
        ) }
      />
      { numberFilter() }
      <div>
        { filters.filterByNumericValues.length > 0
          ? filters.filterByNumericValues.map((filtro, index) => (
            <div data-testid="filter" key={ index }>
              { `${filtro.column} ${filtro.comparison} ${filtro.value}` }
              <button
                name={ filtro.column }
                type="button"
                onClick={ (e) => deleteFilter(e) }
              >
                X
              </button>
            </div>
          )) : false}
      </div>
    </div>
  );
}

export default Filtros;
