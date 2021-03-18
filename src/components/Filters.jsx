import React, { useContext, useState } from 'react';
import SearchBar from './SearchBar';
import { PlanetsContext } from '../context/planetsContext';

const Filters = () => {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);
  const { setSelectFilters } = useContext(PlanetsContext);

  const sendCurrentFilter = () => {
    const CurrentFilter = {
      column,
      comparison,
      value: number,
    };
    setSelectFilters(CurrentFilter);
  };

  const renderSelect = (name, options, callback, labelText = '') => (
    <label htmlFor={ name }>
      { `${labelText} :` }
      <select
        id={ name }
        data-testid={ `${name}-filter` }
        onChange={ ({ target: { value } }) => callback(value) }
      >
        { options.map(
          (choise) => (
            <option key={ choise } value={ choise }>
              { choise }
            </option>),
        )}
      </select>
    </label>);
  const COLUMNS_SELECTOR = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const COMPARISON_SELECTOR = ['maior que', 'menor que', 'igual a'];
  return (
    <section>
      <SearchBar />
      { renderSelect('column', COLUMNS_SELECTOR, setColumn, 'Filtrar por')}
      { renderSelect('comparison', COMPARISON_SELECTOR, setComparison)}
      <label htmlFor="value">
        =
        <input
          type="number"
          id="value"
          data-testid="value-filter"
          onChange={ ({ target: { value } }) => setNumber(Number(value)) }
        />
      </label>
      <button type="button" onClick={ sendCurrentFilter } data-testid="button-filter">
        Filtrar
      </button>
    </section>
  );
};

export default Filters;
