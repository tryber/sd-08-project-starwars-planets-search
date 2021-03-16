import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const InputNumber = ({ name, label, stateUpdater }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target }) => {
    const numericValue = target.value.replace(/\D/g, '');
    setValue(numericValue);
  };

  useEffect(() => {
    stateUpdater(value);
  }, [value, stateUpdater]);

  return (
    <label htmlFor={ name }>
      { label }
      <input
        type="text"
        id={ name }
        name={ name }
        data-testid={ name }
        value={ value }
        onChange={ handleChange }
      />
    </label>
  );
};

InputNumber.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  stateUpdater: PropTypes.func,
};

InputNumber.defaultProps = {
  stateUpdater: () => undefined,
};

export default InputNumber;
