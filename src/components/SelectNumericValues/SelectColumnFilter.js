import React from 'react';
import PropTypes from 'prop-types';

function SelectColumnFilter({ column, handleChange, columnFilter }) {
  return (
    <div>
      <select
        name="column"
        value={ column }
        onChange={ handleChange }
        data-testid="column-filter"
        required
      >
        {
          columnFilter.length === 0
            ? <option value="">{' '}</option>
            : (columnFilter.map((el, index) => (
              <option key={ index } value={ el }>{el}</option>
            )))
        }
      </select>
    </div>
  );
}

SelectColumnFilter.propTypes = {
  column: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  columnFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SelectColumnFilter;
