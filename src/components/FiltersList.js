import React, { useContext } from 'react';
import StarWarsContext from '../contexts/StarWarsContext';

import styles from '../styles/components/FilterList.module.css';

const FiltersList = () => {
  const { filters: { filterByNumericValues },
    removeFilter } = useContext(StarWarsContext);

  function renderFilters() {
    return (
      <div className={ styles.filtersContainer }>
        { filterByNumericValues.map((filter, index) => (
          <div className={ styles.filter } data-testid="filter" key={ index }>
            <pre>{ JSON.stringify(filter) }</pre>
            <button
              className={ styles.removeFilterButton }
              type="button"
              onClick={ () => removeFilter(index) }
            >
              X
            </button>
          </div>
        )) }
      </div>
    );
  }
  return (
    !!filterByNumericValues.length && renderFilters()
  );
};

export default FiltersList;
