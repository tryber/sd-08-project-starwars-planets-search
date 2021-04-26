import React, { useContext, useEffect, useState } from 'react';
import Context from '../context';

const filterOptions = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];
function NumericFilter() {
  const { filter, setFilter, filters, setFilters } = useContext(Context);
  const [column, setColumn] = useState(filterOptions[0]);
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('');
  const { filterByNumericValues } = filter;

  useEffect(() => {
    setColumn(filters[0]);
  }, [filters]);

  const handleClick = () => {
    const newFilters = [...filters];
    newFilters.splice(filters.indexOf(column), 1);
    setFilter({ ...filter,
      filterByNumericValues: filterByNumericValues
        ? [...filterByNumericValues, { column, comparison, value }]
        : [{ column, comparison, value }] });
    setFilters(newFilters);
  };

  return (
    <div>
      <label htmlFor="filter">
        Filtro:
        {' '}
        <select
          data-testid="column-filter"
          id="filter"
          value={ column }
          onChange={ (e) => setColumn(e.target.value) }
        >
          {filters.map((opt) => <option key={ opt }>{ opt }</option>)}
        </select>
      </label>
      <label htmlFor="comparison">
        Condição:
        {' '}
        <select
          data-testid="comparison-filter"
          id="comparison"
          value={ comparison }
          onChange={ (e) => setComparison(e.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value">
        Valor:
        {' '}
        <input
          type="number"
          data-testid="value-filter"
          id="value"
          value={ value }
          onChange={ (e) => setValue(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </div>
  );
}

export default NumericFilter;
