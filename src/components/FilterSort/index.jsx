import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FilterSort = ({ sortBy }) => {
  const [slct, setSlct] = useState('ASC');
  const [column, setColumn] = useState('name');

  const handleChange = ({ target }) => setSlct(target.id);
  const handleOption = ({ target }) => setColumn(target.value);
  return (
    <div>
      <select onChange={ handleOption } data-testid="column-sort">
        <option value="name">name</option>
        <option value="orbital_period">orbital_period</option>
      </select>
      <label htmlFor="ASC">
        <input
          data-testid="column-sort-input-asc"
          id="ASC"
          type="radio"
          checked={ slct === 'ASC' }
          onChange={ handleChange }
        />
        ASC
      </label>
      <label htmlFor="DESC">
        <input
          data-testid="column-sort-input-desc"
          id="DESC"
          type="radio"
          checked={ slct === 'DESC' }
          onChange={ handleChange }
        />
        DESC
      </label>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ () => sortBy(slct, column) }
      >
        Filtrar ordem
      </button>
    </div>
  );
};

export default FilterSort;

FilterSort.propTypes = {
  sortBy: PropTypes.func.isRequired,
};
