import React from 'react';
import PropTypes from 'prop-types';

// import * as getPlanetsByFilters from '../../../services/getPlanetsByFilters';

export default function FilterInput(props) {
  const { state, setState } = props;

  async function handleChange({ target }) {
    const table = state.results.filter((result) => result.name.includes(target.value)); // data.results.filter((result) => result.name.includes(query));
    setState({ ...state, fixResults: table });
  }

  return (
    <label htmlFor="value">
      Pesquisar:
      <input
        data-testid="name-filter"
        type="text"
        id="value"
        onChange={ handleChange }
        placeholder="Pesquisar"
      />
    </label>
  );
}

FilterInput.propTypes = {
  state: PropTypes.arrayOf.isRequired,
  setState: PropTypes.func.isRequired,
};
