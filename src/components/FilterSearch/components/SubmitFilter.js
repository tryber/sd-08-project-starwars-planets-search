import React from 'react';
import PropTypes from 'prop-types';

export default function SubmitFilter(props) {
  const { submitSearch } = props;

  return (
    <button
      onClick={ submitSearch }
      type="button"
      data-testid="button-filter"
    >
      Filtrar
    </button>
  );
}

SubmitFilter.propTypes = {
  submitSearch: PropTypes.func.isRequired,
};
