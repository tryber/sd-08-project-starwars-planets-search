import React, { useContext } from 'react';
import { PlanetContext } from '../context/PlanetProvider';

export default function ColumnFilterButton() {
  const { filterArray, setFilterArray } = useContext(PlanetContext);

  const handleClick = (e) => {
    const { value } = e.target;
    console.log(value);
    setFilterArray(filterArray.filter(({ column }) => column !== value));
  };
  return (
    <>
      { filterArray.map((filter) => (
        <div data-testid="filter" key={ filter.column }>
          <span>
            {`${filter.column}, ${filter.comparison}, ${filter.value}`}
          </span>
          <button
            onClick={ (e) => handleClick(e) }
            type="button"
            value={ filter.column }
          >
            X
          </button>
        </div>
      ))}
    </>

  );
}
