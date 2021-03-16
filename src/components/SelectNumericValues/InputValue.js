import React from 'react';
import PropTypes from 'prop-types';

function InputValue({ numberValue, handleChange }) {
  return (
    <div>
      <input
        name="value"
        onChange={ handleChange }
        type="number"
        value={ numberValue }
        data-testid="value-filter"
        required
      />
    </div>
  );
}

InputValue.propTypes = {
  numberValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default InputValue;
