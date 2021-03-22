import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

// const selectPlanet = ['population', 'diameter', 'rotation_period', 'orbital_period', 'surface_water'];
// const comparisonn = ['maior que', 'maior que', 'igual a'];
function Filter() {
  const { filters, setFilters, type, comparisonn,
    fill, setfill, clickHandler } = useContext(StarWarsContext);
  return (
    <>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ ({ target: { value } }) => (
          setFilters({ ...filters, filterByName: { name: value } })) }
      />
      <select
        data-testid="column-filter"
        onChange={ ({ target: { value } }) => setfill({ ...fill, column: value }) }
      >
        {type.map((elemen, i) => <option key={ i } value={ elemen }>{elemen}</option>)}

      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target: { value } }) => setfill({ ...fill, comparison: value }) }
      >
        {comparisonn
          .map((elemen, i) => <option key={ i } indexvalue={ elemen }>{elemen}</option>)}

      </select>
      <input
        onChange={ ({ target: { value } }) => setfill({ ...fill, value }) }
        data-testid="value-filter"
        type="number"
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => clickHandler() }
      >
        Filtrar
      </button>
    </>
  );
}

export default Filter;
