import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../../context';

function OldFilter(props) {
  const {
    filterByNumericValues,
    setFilterByNumericValues,
  } = useContext(MyContext).filters;

  const { filterIndex } = props;

  return (
    <div data-testid="filter">
      <span>
        {filterByNumericValues[filterIndex].column}
        {' | '}
        {filterByNumericValues[filterIndex].comparison}
        {' | '}
        {filterByNumericValues[filterIndex].value}
      </span>
      <button
        type="button"
        onClick={ () => setFilterByNumericValues(filterByNumericValues
          .reduce((acc, val, index) => (
            index === filterIndex ? acc : [...acc, val]
          ), [])) }
      >
        x
      </button>
    </div>
  );
}

OldFilter.propTypes = {
  filterIndex: PropTypes.number.isRequired,
};

export default OldFilter;
