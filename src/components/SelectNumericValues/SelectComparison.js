import React from 'react';
import PropTypes from 'prop-types';

function SelectComparison({ comparison, handleChange, arrComparison }) {
  return (
    <div>
      <select
        value={ comparison }
        onChange={ handleChange }
        name="comparison"
        data-testid="comparison-filter"
        required
      >
        { arrComparison.map((el, index) => (
          <option key={ index }>{ el }</option>
        ))}
      </select>
    </div>
  );
}

SelectComparison.propTypes = {
  comparison: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  arrComparison: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SelectComparison;
