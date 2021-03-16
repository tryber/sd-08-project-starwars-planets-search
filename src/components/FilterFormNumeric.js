import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function FilterFormNumeric() {
  const { filters, setFilters, columns, setColumns } = useContext(PlanetsContext);

  const [filterValues, setFilterValues] = useState({});

  const { filterByNumericValues } = filters;
  const { column, comparison, value } = filterValues;

  const comparisons = ['maior que', 'menor que', 'igual a'];

  useEffect(() => {
    setFilterValues({
      column: columns[0],
      comparison: 'maior que',
      value: '0',
    });
  }, [columns]);

  const handleChange = ({ target }) => {
    setFilterValues({
      ...filterValues,
      [target.name]: target.value,
    });
  };

  const handleFilter = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [...filterByNumericValues, filterValues],
    });
    setColumns(columns.filter((columnName) => column !== columnName));
  };

  return (
    <>
      <select
        value={ column }
        name="column"
        onChange={ handleChange }
        data-testid="column-filter"
      >
        {columns.map((columnOption) => (
          <option key={ columnOption }>{columnOption}</option>
        ))}
      </select>
      <select
        value={ comparison }
        name="comparison"
        onChange={ handleChange }
        data-testid="comparison-filter"
      >
        {comparisons.map((comparisonOption) => (
          <option key={ comparisonOption }>{comparisonOption}</option>
        ))}
      </select>
      <input
        type="number"
        value={ value }
        name="value"
        data-testid="value-filter"
        placeholder="0"
        onChange={ handleChange }
      />
      <button type="button" data-testid="button-filter" onClick={ handleFilter }>
        Filter
      </button>
    </>
  );
}
