import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function NumericFilter() {
  const { filters, setFilters, columnsOp, setColumn } = useContext(PlanetsContext);
  const [filterTypes, setType] = useState({});

  const { filterByNumericValues } = filters;
  const { column, comparison, value } = filterTypes;

  const comparisonOptions = [
    'maior que',
    'menor que',
    'igual a',
  ];

  useEffect(() => {
    setType({
      column: columnsOp[0],
      comparison: 'maior que',
      value: '0',
    });
  }, [columnsOp]);

  const handleChange = ({ target }) => {
    setType({
      ...filterTypes,
      [target.name]: target.value,
    });
  };

  const handleClick = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [...filterByNumericValues, filterTypes],
    });
    setColumn(columnsOp.filter((columnName) => column !== columnName));
  };

  return (
    <>
      <select
        name="column"
        value={ column }
        onChange={ handleChange }
        data-testid="column-filter"
      >
        {columnsOp.map((option) => (
          <option key={ option }>{option}</option>
        ))}
      </select>
      <select
        name="comparison"
        value={ comparison }
        onChange={ handleChange }
        data-testid="comparison-filter"
      >
        {comparisonOptions.map((option) => (
          <option key={ option }>{option}</option>
        ))}
      </select>
      <input
        type="number"
        value={ value }
        name="value"
        onChange={ handleChange }
        data-testid="value-filter"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </>
  );
}
