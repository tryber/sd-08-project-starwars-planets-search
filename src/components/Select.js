import React from 'react';
import PropTypes from 'prop-types';

function Select({ testid, onChange, options }) {
  return (
    <select
      data-testid={ testid }
      onChange={ onChange }
    >
      { options.map((option) => (
        <option
          key={ option }
          value={ option }
        >
          { option }
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  testid: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Select;
