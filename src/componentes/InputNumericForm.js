import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';
import { initialState, initialOptionsType, initialOptionsSize }
  from '../helpers/functionsHelpers';

function InputNumericForm() {
  const [inputValue, setInputValue] = useState(initialState);
  const { setUserFilters, userFilters } = useContext(PlanetContext);
  const [options, setOptions] = useState(initialOptionsType);

  const { filterByNumericValues } = userFilters;

  function handleClick() {
    const { column } = inputValue;
    setUserFilters({ ...userFilters,
      filterByNumericValues: [
        ...filterByNumericValues,
        inputValue,
      ] });
    const finalOptions = options.filter((opt) => opt !== column);
    setOptions(finalOptions);
  }

  function handleChange({ target }) {
    const { name, value } = target;
    setInputValue({ ...inputValue, [name]: value });
    setOptions(initialOptionsType);
  }

  function filterList({ target }) {
    const currentListValues = filterByNumericValues
      .filter((filterUser) => filterUser.column !== target.value);
    setUserFilters({ ...userFilters, filterByNumericValues: currentListValues });
  }

  function renderFiltesList(val) {
    return (
      <h3 data-testid="filter" key={ val.column }>
        {`${val.column} / ${val.comparison} / ${val.value} `}
        {' '}
        <button type="button" value={ val.column } onClick={ filterList }>X</button>
      </h3>
    );
  }

  return (
    <div>
      <select data-testid="column-filter" name="column" onChange={ handleChange }>
        {options.map((opt) => (<option key={ opt }>{opt}</option>))}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleChange }
      >
        {initialOptionsSize.map((opt) => (<option key={ opt }>{opt}</option>))}
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Adicionar Filtro
      </button>
      <section>
        <h3>Filtros Utilizados</h3>
        {filterByNumericValues
          .map((filter) => (
            renderFiltesList(filter)
          ))}
      </section>
    </div>
  );
}

export default InputNumericForm;
