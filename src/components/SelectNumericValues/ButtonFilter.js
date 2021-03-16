import React from 'react';
import PropTypes from 'prop-types';

function ButtonFilter({ onClickAddFilterNumeric }) {
  return (
    <div>
      <button
        type="submit"
        onClick={ onClickAddFilterNumeric }
        data-testid="button-filter"
      >
        Filtrar
      </button>
    </div>
  );
}

ButtonFilter.propTypes = {
  onClickAddFilterNumeric: PropTypes.func.isRequired,
};

export default ButtonFilter;
