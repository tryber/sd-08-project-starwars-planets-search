import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from '../data/StarWarsContext';
// import { firstSelector, secondSelector } from '../constants/index';

export default function SelectFields() {
  const { filters: { filterByNumericValues, col, comp, val }, filteredData,
    columnSelector, secondSelector, filterByNumerics, handleInputs,
    removeFilterByNumericValues,
  } = useContext(StarWarsContext);

  return (
    <fieldset>
      <label htmlFor="column-filter">
        <select
          name="column-filter"
          id="column-filter"
          data-testid="column-filter"
          value={ col }
          onChange={
            (e) => handleInputs(e, e.target.value, comp, parseInt(val, 10))
          }
        >
          {columnSelector.map((option, i) => (
            <option key={ i } value={ option }>{option}</option>))}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        <select
          name="comparison-filter"
          id="comparison-filter"
          data-testid="comparison-filter"
          value={ comp }
          onChange={
            (e) => handleInputs(e, col, e.target.value, parseInt(val, 10))
          }
        >
          {secondSelector.map((option, i) => (
            <option key={ i } value={ option }>{option}</option>))}
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          type="number"
          name="value-filter"
          id="value-filter"
          data-testid="value-filter"
          value={ val }
          onChange={
            (e) => handleInputs(e, col, comp, parseInt(e.target.value, 10))
          }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => filterByNumerics(filteredData, col, comp, val) }
      >
        Filtrar
      </button>
      <div>
        {filterByNumericValues.length > 1
         && filterByNumericValues.slice(1).map((filter, index) => (
           <label key={ index } htmlFor="filter" data-testid="filter">
             <span>{filter.column}</span>
             <button
               type="button"
               name="filter"
               id="filter"
               //  data-testid="filter"
               onClick={ () => removeFilterByNumericValues(index) }
             >
               X
             </button>
           </label>
         ))}
      </div>
    </fieldset>
  );
}
SelectFields.propTypes = {
  filteredData: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;
