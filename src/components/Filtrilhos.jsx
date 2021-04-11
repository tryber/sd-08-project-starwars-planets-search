import React from 'react';
import PropTypes from 'prop-types';

function Filtrilhos({ filters, removeFilter }) {
  return (
    <div>
      <ul>
        {
          filters.map(({ column, comparison, value }, i) => (
            <li key={ i } data-testid="filter">
              {`${column} | ${comparison} | ${value}`}
              {' '}
              <button type="button" onClick={ () => removeFilter(column) }>X</button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

Filtrilhos.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default Filtrilhos;
