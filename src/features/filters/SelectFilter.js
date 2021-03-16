import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../../context';

function SelectFilter(props) {
  const { filters } = useContext(MyContext);
  const { newFilter, updateNewFilter } = filters;
  const { selector, children } = props;

  return (
    <select
      name={ `${selector}-filter` }
      id={ `${selector}-filter` }
      data-testid={ `${selector}-filter` }
      value={ newFilter[selector] }
      onChange={ (e) => updateNewFilter({
        ...newFilter,
        [selector]: e.target.value,
      }) }
    >
      {children}
    </select>
  );
}

SelectFilter.propTypes = {
  children: PropTypes.node.isRequired,
  selector: PropTypes.string.isRequired,
};

export default SelectFilter;
