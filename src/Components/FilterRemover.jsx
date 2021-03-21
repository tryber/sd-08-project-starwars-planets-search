import React, { useContext } from 'react';
import StarWarsContext from '../Contexts/StarWars/StarWarsContext';

const FilterRemover = () => {
  const { filters: { filterByNumericValues },
    setFiltersByNumericValues } = useContext(StarWarsContext);

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
