import React, { useState, useEffect, useContext } from 'react';

import starWarsContext from '../context/StarWarsContext';

const COLUMNS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const ORDER_OPTIONS = [
  'name',
  'rotation_period',
  'orbital_period',
  'diameter',
  'climate',
  'gravity',
  'terrain',
  'surface_water',
  'population',
];

const Header = () => {
  // fazer um custome hook pra todas as filtragens dps! maybe
  const { filters, setFilters } = useContext(starWarsContext);
  const { filterByNumericValues: { filtersArray } } = filters;

  const [name, setName] = useState('');

  const [columnOptions, setColumnOptions] = useState(COLUMNS);
  const [sortOptions] = useState(ORDER_OPTIONS);

  const [columnsFilter, setColumnsFilter] = useState('population');
  const [sortFilter, setSortFilter] = useState('name');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [comparisonFilter, setComparisonFilter] = useState('maior-que');
  const [valueFilter, setValueFilter] = useState(0);

  //  ...filters.filterByNumericValues.filtersArray,
  const sendComparisonFilters = () => {
    setFilters({
      ...filters,
      filterByNumericValues: {
        status: true,
        filtersArray: [
          ...filters.filterByNumericValues.filtersArray,
          {
            column: columnsFilter,
            comparison: comparisonFilter,
            value: valueFilter,
          },
        ],
      },
    });
  };

  const sendSortFilters = () => {
    setFilters({
      ...filters,
      order: {
        column: sortFilter,
        sort: sortOrder,
      },
    });
  };

  const removeFilter = (index, value) => {
    const newFilterArray = filtersArray;
    setColumnOptions([...columnOptions, value]);
    newFilterArray.splice(index, 1);
    setFilters({
      ...filters,
      filterByNumericValues: {
        status: true,
        filtersArray: newFilterArray,
      },
    });
  };

  // useEffect(() => {
  //   console.log(name);
  // }, [name]);

  useEffect(() => {
    filtersArray.forEach(({ column: filterColumn }) => {
      // console.log(filterColumn);
      setColumnOptions(columnOptions.filter((column) => column !== filterColumn));
    });
  }, [filtersArray]);

  return (
    <div>
      <label htmlFor="name-filter">
        Name
        <input
          id="name-filter"
          type="text"
          value={ name }
          data-testid="name-filter"
          onChange={ ({ target: { value } }) => {
            setName(value);
            setFilters({
              ...filters,
              filterByName: {
                name: value,
              },
            });
          } }
        />
      </label>
      <label htmlFor="column-filter">
        columns
        <select
          id="column-filter"
          name="column"
          data-testid="column-filter"
          onChange={ ({ target: { value } }) => setColumnsFilter(value) }
        >
          {columnOptions.map((column, index) => (
            <option value={ column } key={ index }>{column}</option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        <select
          id="comparison-filter"
          name="comparison"
          data-testid="comparison-filter"
          onChange={ ({ target: { value } }) => setComparisonFilter(value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          type="number"
          id="value-filter"
          data-testid="value-filter"
          onChange={ ({ target: { value } }) => setValueFilter(value) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => sendComparisonFilters() }
      >
        filtrar
      </button>
      <div>
        <select
          id="column-sort"
          name="column-sort"
          data-testid="column-sort"
          onChange={ ({ target: { value } }) => setSortFilter(value) }
        >
          {sortOptions.map((option, index) => (
            <option value={ option } key={ index }>{option}</option>
          ))}
        </select>
        <div onChange={ ({ target: { value } }) => setSortOrder(value) }>
          <input
            type="radio"
            name="sort-order"
            value="ASC"
            data-testid="column-sort-input-asc"
          />
          {' '}
          ASC
          <input
            type="radio"
            name="sort-order"
            value="DESC"
            data-testid="column-sort-input-desc"
          />
          {' '}
          DESC
        </div>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => sendSortFilters() }
        >
          Ordenar
        </button>
      </div>
      <div>
        <p>Filtros:</p>
        {filtersArray.map(({ column, comparison, value }, index) => (
          <div data-testid="filter" key={ index }>
            <button
              type="button"
              value={ column }
              key={ index }
              onClick={ ({ target: { value: nome } }) => removeFilter(index, nome) }
            >
              {`${column} ${comparison} ${value} X `}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
