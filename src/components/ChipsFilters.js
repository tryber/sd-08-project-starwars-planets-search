import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function ChipsFilters() {
  const {
    filters: { filterByNumericValues }, handleClearFilter } = useContext(PlanetsContext);
  const comparisonWord = (chip) => {
    if (chip.comparison === 'maior que') return ' > ';
    if (chip.comparison === 'menor que') return ' < ';
    if (chip.comparison === 'igual a') return ' = ';
  };

  return (
    <div>
      { filterByNumericValues
        && filterByNumericValues.map((chip, index) => (
          <div data-testid="filter" key={ index }>
            { `${chip.column} ${comparisonWord(chip)} ${chip.value} ` }
            <button
              onClick={ () => handleClearFilter(chip) }
              type="button"
            >
              X
            </button>
          </div>
        )) }
    </div>
  );
}

export default ChipsFilters;
