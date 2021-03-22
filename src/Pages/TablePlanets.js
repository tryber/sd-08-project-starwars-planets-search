import React, { useState, useContext } from 'react';
import AppContext from '../context/Context';
import PlanetsList from '../components/PlanetsList';

function TablePlanets() {
  const {
    loading,
    setName,
    filters,
    filters: { filterByNumericValues },
    setFilters,
    optionsColumn,
    setOptionsColumn,
  } = useContext(AppContext);

  const [numericFilters, setNumericFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '100000',
  });

  const handleChange = ({ target }) => {
    setNumericFilters({
      ...numericFilters,
      [target.name]: target.value,
    });
  };

  const [addFilterElement, setAddFilterElement] = useState(false);

  const addFilter = () => {
    const { column } = numericFilters;
    // console.log(column)
    setFilters({
      ...filters,
      filterByNumericValues: [...filterByNumericValues, numericFilters],
    });
    setAddFilterElement(true);
    setOptionsColumn(optionsColumn.filter((col) => column !== col));
  };

  // const setOptionsColumn = () => {

  // }

  // const handleFilter = () => {
  //   setFilters({
  //     ...filters,
  //     filterByNumericValues: [...filterByNumericValues, filterValues],
  //   });
  //   setColumns(columns.filter((columnName) => column !== columnName));
  // };

  return (
    <div>
      <h1 className="text-center">Lista de Planetas</h1>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span
            className="input-group-text"
            id="inputGroup-sizing-default"
          >
            Google de Planetas
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          onChange={ (e) => setName(e.target.value) }
          data-testid="name-filter"
          placeholder="Naboo"
        />
      </div>
      <select
        className="form-select form-select-sm"
        aria-label=".form-select-sm example"
        data-testid="column-filter"
        name="column"
        onChange={ handleChange }
      >
        {
          optionsColumn.map((option, index) => (
            <option key={ index } value={ option }>{option}</option>
          ))
        }
      </select>
      <select
        className="form-select form-select-sm"
        aria-label=".form-select-sm example"
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        className="form-control"
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        data-testid="value-filter"
        min="0"
        placeholder="1000000"
        name="value"
        onChange={ handleChange }
      />
      <button
        type="button"
        className="btn btn-success"
        data-testid="button-filter"
        onClick={ addFilter }
      >
        Add Filter
      </button>
      { addFilterElement
        ? filterByNumericValues
          .map((option) => {
            if (!option.column) return '';
            return (
              <div key={ option.column }>
                <button
                  type="button"
                  className="btn btn-info"
                  data-testid="button-filter"
                >
                  {`${option.column} - ${
                    option.comparison
                  } - ${option.value}`}
                </button>
                <button type="button" className="btn btn-info">X</button>
              </div>
            );
          }) : '' }
      {loading ? <h2>Loading...</h2> : (
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Rotation Period</th>
              <th>Orbital Period</th>
              <th>Diameter</th>
              <th>Climate</th>
              <th>Gravity</th>
              <th>Terrain</th>
              <th>Surface Water</th>
              <th>Population</th>
              <th>Films</th>
              <th>Created</th>
              <th>Edited</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            <PlanetsList />
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TablePlanets;
