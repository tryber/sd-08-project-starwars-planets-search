import React from 'react';
import PropTypes from 'prop-types';

function FiltralhosDoCarilho({ filters, removeFilter }) {
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

FiltralhosDoCarilho.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default FiltralhosDoCarilho;
