import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const InputText = ({ name, label, stateUpdater }) => {
  const [value, setValue] = useState('');

  const handleChange = (evt) => {
    setValue(evt.target.value);
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

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  stateUpdater: PropTypes.func,
};

InputText.defaultProps = {
  stateUpdater: () => undefined,
};

export default InputText;
