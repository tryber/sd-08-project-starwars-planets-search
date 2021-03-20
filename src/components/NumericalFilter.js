import React, { useContext, useState } from 'react';
import NewContext from '../context/NewContext';

const INITIAL_STATE_FILTERS = {
  column: '',
  comparison: '',
  value: '',
};

const INITIAL_STATE_COLUMNS = [
  'population',
  'diameter',
  'rotation_period',
  'orbital_period',
  'surface_water',
];

export default function NumericalFilter() {
  const { filter, setFilter } = useContext(NewContext);

  const [filterNumbers, setFilterNumbers] = useState(INITIAL_STATE_FILTERS);
  const [columns, setColumns] = useState(INITIAL_STATE_COLUMNS);
  const [usedColumns, setUsedColumns] = useState([]);

  const { filterByNumericValues } = filter;
  const { column, comparison, value } = filterNumbers;

  const typeOfComparisons = ['maior que', 'menor que', 'igual a'];

  const handleChange = ({ target }) => {
    setFilterNumbers({
      ...filterNumbers,
      [target.name]: target.value,
    });
  };

  const handleAllFilters = () => {
    setFilter({
      ...filter,
      filterByNumericValues: {
        ...filterByNumericValues,
        ...filterNumbers,
      },
    });
    setColumns(columns.filter((columnName) => column !== columnName));
    setUsedColumns([...usedColumns, column]);
  };

  return (
    <>
      <select
        value={ column }
        name="column"
        onChange={ handleChange }
        data-testid="column-filter"
      >
        {columns.map((option) => (
          <option
            key={ option }
          >
            {option}
          </option>
        ))}
      </select>
      <select
        value={ comparison }
        name="comparison"
        onChange={ handleChange }
        data-testid="comparison-filter"
      >
        {typeOfComparisons.map((comparisonOption) => (
          <option
            key={ comparisonOption }
          >
            {comparisonOption}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="value"
        value={ value }
        onChange={ handleChange }
        data-testid="value-filter"
      />
      <button
        type="button"
        onClick={ handleAllFilters }
        data-testid="button-filter"
      >
        {' '}
        Filter
        {' '}
      </button>

    </>
  );
}
