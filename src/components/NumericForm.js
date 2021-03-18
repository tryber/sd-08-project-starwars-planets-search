import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const initialOptions = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

function NumericForm() {
  const [options, setOptions] = useState(initialOptions);
  const [prevOptions, setPrevOptions] = useState([]);
  const [column, setColumn] = useState(options[0]);
  const [comparison, setComparison] = useState('');
  // const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState(0);
  const { filters, setFilters } = useContext(PlanetsContext);
  const { filterByNumericValues } = filters;

  const handleChange = ({ target }) => {
    if (target.name === 'column') setColumn(target.value);
    else if (target.name === 'comparison') setComparison(target.value);
    else setValue(target.value);
  };

  const handleClick = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        {
          column,
          comparison,
          value,
        },
        ...filterByNumericValues,
      ],
    });
    setOptions(options
      .filter((option) => option !== column));
    setPrevOptions(options);
    setColumn(options[1]);
  };

  const handleFilter = ({ target }) => {
    const currentFilters = filterByNumericValues
      .filter((filter) => filter.column !== target.value);
    setFilters({
      ...filters,
      filterByNumericValues: currentFilters,
    });
    setOptions(prevOptions);
  };

  return (
    <div>
      <form>
        <label htmlFor="input-filter">
          Choose your filter:
          <select
            id="input-filter"
            data-testid="column-filter"
            name="column"
            value={ column }
            onChange={ handleChange }
            required
          >
            {options
              .map((item) => (
                <option
                  key={ item }
                  value={ item }
                >
                  {item}
                </option>))}
          </select>
        </label>
        <label htmlFor="input-comparison">
          <select
            id="input-comparison"
            name="comparison"
            value={ comparison }
            data-testid="comparison-filter"
            required
            onChange={ handleChange }
          >
            <option defaultValue value="">Comparison</option>
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="input-value">
          <input
            id="input-value"
            name="value"
            value={ value }
            onChange={ handleChange }
            data-testid="value-filter"
          />
        </label>
        <button
          type="button"
          onClick={ handleClick }
          data-testid="button-filter"
        >
          Filter
        </button>
      </form>
      {filterByNumericValues
        .map((filter) => (
          <p key={ filter.column } data-testid="filter">
            {`${filter.column} | ${filter.comparison} | ${filter.value}`}
            <button
              value={ filter.column }
              type="button"
              onClick={ handleFilter }
            >
              X
            </button>
          </p>
        ))}
    </div>
  );
}

export default NumericForm;
