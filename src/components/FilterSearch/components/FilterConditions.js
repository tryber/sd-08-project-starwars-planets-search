import React from 'react';
import PropTypes from 'prop-types';

export default function FilterConditions(props) {
  const { state, handleChange } = props;

  return (
    <label htmlFor="comparison">
      <select
        onChange={ handleChange }
        value={ state.comparison }
        name="comparison"
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="igual a">igual a</option>
        <option value="menor que">menor que</option>
      </select>
    </label>
  );
}

FilterConditions.propTypes = {
  state: PropTypes.arrayOf.isRequired,
  handleChange: PropTypes.func.isRequired,
};
