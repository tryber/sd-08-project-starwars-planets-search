import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filter() {
  const {
    filters,
    setFilter,
    functionLength,
    columns,
    setColumns,
    setRemoved,
  } = useContext(StarWarsContext);

  const handleChange = (e) => {
    const { value } = e.target;
    const obj = { ...filters };
    obj.filterByName.name = value;
    setFilter(obj);
  };

  const handleSelectOption = (e) => {
    const { value, name } = e.target;
    const obj = { ...filters };
    const filterLength = obj.filterByNumericValues.length;
    obj.filterByNumericValues[filterLength - 1][name] = value;
  };

  const handleFilter = () => {
    const obj = { ...filters };
    let filterLength = obj.filterByNumericValues.length;
    const obj2 = {
      column: '',
      comparison: '',
      value: '',
    };
    obj.filterByNumericValues[filterLength] = obj2;
    filterLength = functionLength(filterLength);
    const filter = obj.filterByNumericValues[filterLength].column;
    const newColumns = columns.filter((elem) => elem !== filter);
    setColumns(newColumns);
    setFilter(obj);
  };

  const renderOptions = () => {
    const obj = { ...filters };
    let filterLength = obj.filterByNumericValues.length;
    filterLength = functionLength(filterLength);
    const filter = obj.filterByNumericValues[filterLength].column;
    const newColumns = columns.filter((elem) => elem !== filter);
    return (
      <>
        {newColumns.map((option) => (
          <option key={ option } value={ option }>{option}</option>
        ))}
      </>
    );
  };

  const renderComparsion = () => (
    <>
      <option value="maior que">maior que</option>
      <option value="menor que">menor que</option>
      <option value="igual a">igual a</option>
    </>
  );

  const removeFilter = (index) => {
    const obj = { ...filters };
    obj.filterByNumericValues.splice(index, 1);
    setRemoved(true);
    setFilter(obj);
  };

  const renderFilterButton = () => {
    const obj = { ...filters };
    return (
      <>
        {obj.filterByNumericValues
          .filter((elem) => elem.column !== '')
          .map((elem, index) => (
            <p
              key={ index }
              data-testid="filter"
            >
              {elem.column}
              {' '}
              {elem.comparison}
              {' '}
              {elem.value}
              <button
                key={ index }
                type="button"
                onClick={ (pos) => removeFilter(pos) }
              >
                X
              </button>
            </p>
          ))}
      </>
    );
  };

  return (
    <div>
      <input
        type="text"
        onChange={ handleChange }
        data-testid="name-filter"
      />
      <label htmlFor="column">
        <select
          data-testid="column-filter"
          id="column"
          name="column"
          onChange={ handleSelectOption }
        >
          {renderOptions()}
        </select>
      </label>
      <label htmlFor="comparison">
        <select
          data-testid="comparison-filter"
          id="comparison"
          name="comparison"
          onChange={ handleSelectOption }
        >
          {renderComparsion()}
        </select>
      </label>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        onChange={ handleSelectOption }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilter }
      >
        Filtrar
      </button>
      {renderFilterButton()}
    </div>
  );
}

export default Filter;
