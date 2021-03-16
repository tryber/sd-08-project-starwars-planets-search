import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../styles/FormFilter.css';

function FormFilter() {
  const [filterValues, setFilterValues] = useState({
    column: 'population',
    comparision: 'maior que',
    value: '',
  });

  const { column, comparision, value } = filterValues;

  const handleChange = ({ target }) => {
    setFilterValues({
      ...filterValues,
      [target.name]: target.value,
    });
  };

  const { addNumericFilter, filterByNumericValue } = useContext(StarWarsContext);

  const selectFilter = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const columnFilter = selectFilter.filter(
    (elem) => {
      const INITIAL_COUNT = 0;
      let count = INITIAL_COUNT;
      filterByNumericValue.forEach((e) => {
        if (e.column === elem) {
          count += 1;
        }
      });
      if (count === INITIAL_COUNT) { return true; }
      return false;
    },
  );

  const comparationFilter = [
    'maior que', 'menor que', 'igual a'];
  return (
    <form className="form-filter">
      <select
        onChange={ handleChange }
        name="column"
        data-testid="column-filter"
      >
        {columnFilter.map((elem, index) => <option key={ index }>{elem}</option>)}
      </select>
      <select
        onChange={ handleChange }
        name="comparision"
        data-testid="comparison-filter"
      >
        {comparationFilter.map((elem, index) => <option key={ index }>{elem}</option>)}
      </select>
      <input
        onChange={ handleChange }
        name="value"
        type="number"
        data-testid="value-filter"
      />
      <button
        onClick={ () => addNumericFilter(column, comparision, value) }
        type="button"
        data-testid="button-filter"
      >
        Adicionar filtro
      </button>
    </form>
  );
}

export default FormFilter;
