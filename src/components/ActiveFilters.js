import React from 'react';
import PropTypes from 'prop-types';

const ActiveFilters = ({ filterArray, stateUpdater }) => {
  const handleDelete = (evt, activeColumn) => {
    const updatedFilters = filterArray.filter(({ column }) => column !== activeColumn);
    stateUpdater(updatedFilters);
  };

  return (
    <ul>
      { filterArray.map((filter) => (
        <li key={ filter.column } data-testid="filter">
          { `${filter.column} | ${filter.comparison} | ${filter.value} ` }
          <button type="button" onClick={ (e) => handleDelete(e, filter.column) }>
            X
          </button>
        </li>
      )) }
    </ul>
  );
};

ActiveFilters.propTypes = {
  filterArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  stateUpdater: PropTypes.func.isRequired,
};

export default ActiveFilters;
