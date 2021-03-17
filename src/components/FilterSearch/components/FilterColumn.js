import React from 'react';
import PropTypes from 'prop-types';

export default function FilterPopulation(props) {
  const { state, handleChange } = props;

  return (
    <label htmlFor="column">
      <select
        onChange={ handleChange }
        value={ state.column }
        name="column"
        data-testid="column-filter"
      >
        <option name="column" value="population">population</option>
        <option name="column" value="orbital_period">orbital_period</option>
        <option name="column" value="diameter">diameter</option>
        <option name="column" value="rotation_period">rotation_period</option>
        <option name="column" value="surface_water">surface_water</option>
      </select>
    </label>
  );
}

FilterPopulation.propTypes = {
  state: PropTypes.arrayOf.isRequired,
  handleChange: PropTypes.func.isRequired,
};
