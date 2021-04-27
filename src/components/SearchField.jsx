import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import StarWarsContext from '../data/StarWarsContext';

export default function SearchField() {
  const { filters: { filterByName: { name } },
    filterByQuery } = useContext(StarWarsContext);

  return (
    <label htmlFor="search-field">
      <input
        data-testid="name-filter"
        type="text"
        name="search-field"
        id="search-field"
        onChange={ (e) => filterByQuery(e.target.value) }
        value={ name }
      />
    </label>
  );
}

// SearchField.contextType = StarWarsContext;

// SearchField.propTypes = {
//   // prop: PropTypes
// };
