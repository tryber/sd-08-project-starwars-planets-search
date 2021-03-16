import React, { useContext } from 'react';
import AppContext from '../utils/AppContext';

const Filters = () => {
  const {
    handleChange,
    handleClick,
    filters,
    setFilters,
    options } = useContext(AppContext);
  function filterChange(e) {
    setFilters({
      ...filters,
      filterByNumericValues: [
        {
          ...filters.filterByNumericValues[0],
          [e.target.name]: e.target.value,
        },
      ],
    });
  }

  return (
    <header>
      <input type="text" data-testid="name-filter" onChange={ handleChange } />
      <select data-testid="column-filter" name="column" onChange={ filterChange }>
        { options.map((value) => <option key={ value } name={ value }>{ value }</option>)}
      </select>
      <select data-testid="comparison-filter" name="comparison" onChange={ filterChange }>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="text"
        name="value"
        onChange={ filterChange }
        data-testid="value-filter"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </header>
  );
};

export default Filters;
