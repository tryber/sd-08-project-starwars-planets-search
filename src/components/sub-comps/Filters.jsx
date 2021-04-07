import React, { useState, useContext } from 'react';
import SWContext from '../../context/SWContext';

const Filters = () => {
  const context = useContext(SWContext);
  const {
    filters,
    setFilters,
    columnFilters,
    comparisonFilters,
    setColumnFilters,
  } = context;
  const [numFilters, setNumFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });

  const removeFilter = (column) => {
    const { filterByNumericValues } = filters;
    setFilters((prevFilters) => ({
      ...prevFilters,
      filterByNumericValues: filterByNumericValues
        .filter((filter) => filter.column !== column),
    }));
  };

  const renderChosenFilters = () => {
    const { filterByNumericValues } = filters || [];
    return (
      <>
        {filterByNumericValues.map((filter) => {
          const { column, comparison, value } = filter;
          return (
            <p data-testid="filter" key={ column }>
              {column}
              {' '}
              {comparison}
              {' '}
              {value}
              <button
                type="button"
                onClick={ () => removeFilter(column) }
              >
                X
              </button>
            </p>
          );
        })}
      </>
    );
  };

  const handleNameFilter = ({ target: { value } }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      filterByName: { name: value },
    }));
  };

  const handleNumFilter = ({ target: { name, value } }) => {
    switch (name) {
    case 'column-filter':
      setNumFilters((prev) => ({
        ...prev,
        column: value,
      }));
      break;
    case 'comparison-filter':
      setNumFilters((prev) => ({
        ...prev,
        comparison: value,
      }));
      break;
    case 'value-filter':
      setNumFilters((prev) => ({
        ...prev,
        value: value.toString(),
      }));
      break;
    default:
    }
  };

  const numericFilters = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      filterByNumericValues: [
        ...prevFilters.filterByNumericValues,
        numFilters,
      ],
    }));
    setColumnFilters(columnFilters.filter((filter) => filter !== numFilters.column));
  };

  return (
    <>
      <label htmlFor="name-filter">
        Nome
        <input
          type="text"
          name="name-filter"
          data-testid="name-filter"
          onChange={ handleNameFilter }
        />
      </label>

      <select
        name="column-filter"
        data-testid="column-filter"
        onChange={ handleNumFilter }
      >
        {columnFilters.map((filter) => <option key={ filter }>{filter}</option>)}
      </select>

      <select
        name="comparison-filter"
        data-testid="comparison-filter"
        onChange={ handleNumFilter }
      >
        {comparisonFilters.map((filter) => <option key={ filter }>{filter}</option>)}
      </select>

      <label htmlFor="value-filter">
        Digite
        <input
          type="text"
          name="value-filter"
          data-testid="value-filter"
          onChange={ handleNumFilter }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ numericFilters }
      >
        Aplicar
      </button>
      <div>{renderChosenFilters()}</div>
    </>
  );
};

export default Filters;
