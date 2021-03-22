import React, { useContext, useState } from 'react';
// import PropTypes from 'prop-types';

import StarwarsContext from '../context/StarwarsContext';

function FormInput() {
  const { filterName, filterByName, filterColumn,
    filters, setDeleteFilter, filterComparison } = useContext(StarwarsContext);
  // console.log(filterByName);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [columnSelected, setColumnSelected] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  function deleteSelect() {
    const newColumnSelected = [...columnSelected.sort()];
    newColumnSelected.splice(columnSelected.indexOf(column), 1);
    setColumnSelected(newColumnSelected);
    setColumn(newColumnSelected[0]);
  }
  function createColumnFilters() {
    return columnSelected
      .map((name) => <option key={ name } value={ name }>{ name }</option>);
  }

  function createComparisonFilter() {
    const comparisonSelected = ['maior que', 'menor que', 'igual a'];
    return comparisonSelected
      .map((name) => <option key={ name } value={ name }>{ name }</option>);
  }

  function filterSpan() {
    return filters.filterByNumericValues.map((data, index) => (
      <div key={ index } className="span-filter">
        <span data-testid="filter">
          { `${data.column} || ${data.comparison} || ${data.value}`}
        </span>
        <button type="button" onClick={ () => setDeleteFilter(data) }>X</button>
      </div>
    ));
  }

  function renderPlanetInput() {
    // const { value } = this.state;
    return (
      <input
        type="text"
        name="value-planet"
        data-testid="name-filter"
        value={ filterByName }
        onChange={ filterName }
        placeholder="Pesquise nome do planeta"
      />
    );
  }

  function renderColumnFilter() {
    return (
      <select
        id="currency-input"
        data-testid="column-filter"
        name="currency"
        value={ column }
        onChange={ ({ target }) => setColumn(target.value) }
      >
        { createColumnFilters() }
      </select>
    );
  }

  function renderComparisonFilter() {
    return (
      <select
        id="currency-input"
        data-testid="comparison-filter"
        name="currency"
        value={ comparison }
        onChange={ ({ target }) => setComparison(target.value) }
      >
        { createComparisonFilter() }
      </select>
    );
  }

  function handleClick() {
    filterColumn(column, comparison, value);
    deleteSelect();
    filterComparison(column, comparison, value);
  }

  function renderValueInput() {
    // const { value } = this.state;
    return (
      <input
        type="number"
        name="value"
        data-testid="value-filter"
        value={ value }
        onChange={ ({ target }) => setValue(target.value) }
        placeholder="Digite um número"
      />
    );
  }

  return (
    <div>
      <form>
        <label htmlFor="value-planet">
          { renderPlanetInput() }
        </label>
        <label htmlFor="currency-input">
          { renderColumnFilter() }
        </label>
        <label htmlFor="method-input">
          { renderComparisonFilter() }
        </label>
        <label htmlFor="value">
          { renderValueInput() }
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          FILTRAR
        </button>
      </form>
      { filterSpan() }
    </div>
  );
}

export default FormInput;

// FormInput.propTypes = {
//   savedInputData: PropTypes.func.isRequired,
//   fetchCurrencies: PropTypes.func.isRequired,
//   currencies: PropTypes.instanceOf(Object).isRequired,
// };
