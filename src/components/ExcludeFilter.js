import React from 'react';
// import StarWarsContext from '../context/StarWarsContext';
import PropTypes from 'prop-types';

function ExcludeFilter(props) {
  // const { filterNumeric, selectColumns, setSelectColumns,
  //   setFilterNumeric } = useContext(StarWarsContext);
  const { removeClick, filterNumeric } = props;

  return (
    filterNumeric.length > 0 && (
      <div>
        {filterNumeric.map((item, index) => (
          <div data-testid="filter" key={ index }>
            {item.column }
            {item.comparison }
            {item.value}
            <button
              type="button"
              onClick={ () => removeClick(item.column) }
            >
              x

            </button>
          </div>
        ))}
      </div>
    )
  );
}

ExcludeFilter.propTypes = {
  filterNumeric: PropTypes.array.isRequired,
};

export default ExcludeFilter;
