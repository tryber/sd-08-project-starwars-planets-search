import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Inputs() {
  const {
    filters: { filtersByName, filterByNumericValues },
    handleChange,
    dataFiltered,
    numberFilter,
    handleClick,
    ordered,
  } = useContext(PlanetsContext);

  const dropDownColumn = () => {
    const columns = [
      '', 'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    let disabledColumns = columns;
    filterByNumericValues.forEach(({ column }) => {
      disabledColumns = disabledColumns.filter((arr) => {
        if (!arr) return false;
        return arr !== column;
      });
    });
    return disabledColumns;
  };

  const dropDownRange = ['', 'maior que', 'menor que', 'igual a'];

  return (
    <>
      <input
        data-testid="name-filter"
        name="name"
        onChange={ handleChange }
        placeholder="Search name"
        type="text"
        value={ filtersByName }
      />

      <select data-testid="column-filter" name="data" onChange={ handleChange }>
        { dropDownColumn().map((data) => {
          if (data === '') return (<option label="Choose column" />);
          return (
            <option key={ data } value={ data }>
              { data }
            </option>);
        }) }
      </select>

      <select data-testid="comparison-filter" name="range" onChange={ handleChange }>
        { dropDownRange.map((range) => {
          if (range === '') return (<option label="Comparison" />);
          return (
            <option key={ range } value={ range }>
              { range }
            </option>);
        }) }
      </select>

      <input
        data-testid="value-filter"
        onChange={ handleChange }
        placeholder="Value"
        name="number"
        type="text"
        value={ numberFilter.value }
      />

      <button
        data-testid="button-filter"
        disabled={ !numberFilter.column }
        name="filter"
        onClick={ handleClick }
        type="button"
      >
        Search
      </button>

      <select data-testid="column-sort" name="sort-column" onChange={ handleChange }>
        <option label="Sort Column" />
        { dataFiltered[0]
          && Object.keys(dataFiltered[0]).map((column) => (
            <option key={ column } value={ column }>
              { column }
            </option>
          )) }
      </select>

      <label htmlFor="sort">
        <input
          checked={ ordered.sort === 'ASC' }
          data-testid="column-sort-input-asc"
          id="sort"
          name="sort"
          onClick={ handleChange }
          type="radio"
          value="ASC"
        />
        Ascendente
        <input
          checked={ ordered.sort === 'DESC' }
          data-testid="column-sort-input-desc"
          id="sort"
          name="sort"
          onClick={ handleChange }
          type="radio"
          value="DESC"
        />
        Descendente
      </label>

      <button
        data-testid="column-sort-button"
        disabled={ !ordered.column }
        name="ordination"
        onClick={ handleClick }
        type="button"
      >
        Sort
      </button>

    </>
  );
}

export default Inputs;
