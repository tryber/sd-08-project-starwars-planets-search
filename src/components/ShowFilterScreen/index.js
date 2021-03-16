import React, { useContext } from 'react';
import StarWarsContext from '../../provider/StarWarsContext';

function ShowFilterScreen() {
  const {
    filters: { filterByNumericValues },
    deleteFilter,
  } = useContext(StarWarsContext);
  return (
    <div>
      { filterByNumericValues.map((el, index) => (
        <div data-testid="filter" key={ index }>
          <span>{ el.column }</span>
          <button
            onClick={ deleteFilter }
            data-column={ el.column }
            type="button"
          >
            X
          </button>
        </div>
      )) }
    </div>
  );
}

export default ShowFilterScreen;
