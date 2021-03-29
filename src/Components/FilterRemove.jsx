import React, { useContext } from 'react';
import StateContext from '../context/StateContext';

const FilterRemover = () => {
  const { filters: { filterByNumericValues },
    setFiltersByNumericValues } = useContext(StateContext);

  return (
    <>
      { filterByNumericValues.map(({ column, comparison, value }, index) => (
        <div key={ index } data-testid="filter">
          <span>
            {`${column} ${comparison} ${value}`}
          </span>
          <button
            type="button"
            onClick={ () => {
              setFiltersByNumericValues(filterByNumericValues
                .filter((filter) => filter.column !== column));
            } }
          >
            x
          </button>
        </div>
      ))}
    </>);
};

export default FilterRemover;
