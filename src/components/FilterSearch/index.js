import React from 'react';
import PropTypes from 'prop-types';

import FilterInput from './components/FilterInput';
import FilterColumn from './components/FilterColumn';
import FilterConditions from './components/FilterConditions';
import FilterValue from './components/FilterValue';
import SubmitFilter from './components/SubmitFilter';

export default function FilterSearch(props) {
  const { state, setState } = props;

  const handleChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const submitSearch = () => {
    setState({});
  };

  return (
    <div>
      <FilterInput state={ state } setState={ setState } handleChange={ handleChange } />
      <FilterColumn state={ state } setState={ setState } handleChange={ handleChange } />
      <FilterConditions state={ state } handleChange={ handleChange } />
      <FilterValue state={ state } handleChange={ handleChange } />
      <SubmitFilter submitSearch={ submitSearch } />
    </div>
  );
}

FilterSearch.propTypes = {
  state: PropTypes.arrayOf.isRequired,
  setState: PropTypes.func.isRequired,
};
