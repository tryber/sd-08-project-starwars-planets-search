import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../styles/FilterList.css';

function FilterList() {
  const { filterByNumericValue, removeFilter } = useContext(StarWarsContext);

  return (
    <ul className="filter-list">
      {filterByNumericValue.map(({ column, value, comparision }, index) => (
        <li key={ index } data-testid="filter">
          {`${column} ${comparision} ${value}`}
          <button type="button" onClick={ () => removeFilter(column) }>x</button>
        </li>))}
    </ul>

  );
}

export default FilterList;
