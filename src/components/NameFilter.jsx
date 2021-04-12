import React, { useContext } from 'react';
import {
  Button,
} from 'react-bootstrap';
import { Context } from '../context';

const NameFilter = () => {
  const { filterObject } = useContext(Context);

  return (
    <section>
      { filterObject.filters.filterByNumericValues.length
        ? filterObject.filters.filterByNumericValues.map((numericFilter) => (
          <div key={ numericFilter.column } data-testid="filter">
            <span>{ numericFilter.column }</span>
            <span>{ numericFilter.comparison }</span>
            <span>{ numericFilter.value }</span>
            <Button
              variant="danger"
              onClick={ () => filterObject.removeNumericFilter(numericFilter.column) }
            >
              X
            </Button>
          </div>
        ))
        : <p>No filters</p> }
    </section>
  );
};

export default NameFilter;
