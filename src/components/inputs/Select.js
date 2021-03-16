import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Select = ({ options, name, label, stateUpdater }) => {
  const [value, setValue] = useState(options[0]);

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  useEffect(() => {
    stateUpdater(value);
  }, [value, stateUpdater]);

  return (
    <label htmlFor={ name }>
      { label }
      <select
        id={ name }
        name={ name }
        data-testid={ name }
        value={ value }
        onChange={ handleChange }
      >
        { options.map((opt) => (
          <option key={ opt } value={ opt }>{ opt }</option>)) }
      </select>
    </label>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  stateUpdater: PropTypes.func,
};

Select.defaultProps = {
  stateUpdater: () => undefined,
};

export default Select;
