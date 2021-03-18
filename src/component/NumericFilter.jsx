import React, { useContext, useEffect, useState } from 'react';
import SWPlanetsContext from '../context/SWPlanetsContext';
import '../styles/header.css';

function NumericFilter() {
  const {
    filtersPlanets,
    setFiltersPlanets,
    columns,
    setColumns,
  } = useContext(SWPlanetsContext);

  const [filterNumbers, setFilterNumbers] = useState({ // criei esse state
    column: '',
    comparison: '',
    value: 0,
  });
  const { filterByNumericValues } = filtersPlanets;
  const { column, comparison, value } = filterNumbers;

  useEffect(() => {
    setFilterNumbers({
      column: columns[0],
      comparison: 'maior que',
      value: '0',
    });
  }, [columns]);

  const handleChange = (event) => {
    setFilterNumbers({
      ...filterNumbers,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickFilter = () => {
    setFiltersPlanets({
      ...filtersPlanets,
      filterByNumericValues: [
        ...filterByNumericValues,
        filterNumbers,
      ],
    });
    setColumns(columns.filter((selectedColumn) => column !== selectedColumn));
  };

  return (
    <div className="inputs-number">
      <select
        name="column"
        data-testid="column-filter"
        onChange={ handleChange }
        value={ column }
      >
        {columns.map((columnItem) => <option key={ columnItem }>{columnItem}</option>)}
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ handleChange }
      >
        <option key="maior">maior que</option>
        <option key="menor">menor que</option>
        <option key="igual">igual a</option>
      </select>
      <input
        type="number"
        name="value"
        data-testid="value-filter"
        value={ value }
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClickFilter }
        className="button-filter"
      >
        Filter
      </button>
      <ul />
    </div>
  );
}

export default NumericFilter;
