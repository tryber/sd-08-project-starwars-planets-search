import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Header() {
  const {
    filters,
    setFilters,
  } = useContext(StarWarsContext);

  return (
    <div>
      <ul>
        {filters.filterByNumericValues.map(({ column, comparison, value }) => (
          <li data-testid="filter" key={ column }>
            Column:
            { column }
            , comparison:
            { comparison }
            , value:
            { value }
            <button
              type="button"
              onClick={ () => setFilters({
                ...filters,
                filterByNumericValues: [...filters.filterByNumericValues
                  .filter((filter) => filter.column !== column)],
              }) }
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Header;
