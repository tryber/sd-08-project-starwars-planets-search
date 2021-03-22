import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../Context/PlanetsContext';

function Table() {
  const { allPlanets,
    filteredArray,
    setFilteredArray,
    searchName,
    setSearchName,
    filterColumn,
    setFilterColumn,
    selected,
    setSelected,
    reset,
    setReset } = useContext(PlanetsContext);
  useEffect(() => {
    const resultFilter = allPlanets.filter((planet) => planet.name.includes(searchName));
    setFilteredArray(resultFilter);
    setReset(0);
  }, [allPlanets, setFilteredArray, searchName, reset]);

  function handleChange({ target }) {
    setSearchName(target.value);
  }
  function selectedFilter(event) {
    const attribute = event.target.getAttribute('data-testid');
    if (attribute === 'column-filter') {
      setSelected({ ...selected, column: event.target.value });
    } else if (attribute === 'comparison-filter') {
      setSelected({ ...selected, comparison: event.target.value });
    } else {
      setSelected({ ...selected, value: event.target.value });
    }
  }
  function filterCombined({ column, comparison, value }) {
    const filterThree = allPlanets.filter((planet) => {
      const valueColumn = Number(planet[column]);
      const valueReceived = Number(value);
      if (comparison === 'menor que') {
        return valueColumn < valueReceived;
      }
      if (comparison === 'maior que') {
        return valueColumn > valueReceived;
      }
      return valueColumn === valueReceived;
    });
    setFilteredArray(filterThree);
  }
  function handleClick() {
    filterCombined(selected);
    const itemRefused = filterColumn.filter((column) => column !== selected.column);
    setFilterColumn(itemRefused);
    
  }
  function handleClear() {
    setSelected({ ...selected, value: '' });
    setReset('1')
  }
  
  return (
    <div>
      <div>
        <form>
          <input
            type="text"
            name="name"
            data-testid="name-filter"
            placeholder="Digite o nome do planeta"
            onChange={ handleChange }
          />
          <select data-testid="column-filter" onChange={ selectedFilter }>
          {filterColumn.map((column)=><option value={ column }>{column}</option>)}
          </select>
          <select data-testid="comparison-filter" onChange={ selectedFilter }>
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option selected value="igual a">igual a</option>
          </select>
          <input
            type="number"
            name="name"
            data-testid="value-filter"
            placeholder="somente Números"
            onChange={ selectedFilter }
          />
          <button
            type="button"
            data-testid="button-filter"
            onClick={ handleClick }
          >
            Acionar filtro
          </button>
          <button
            type="button"
            data-testid="filter"
            onClick={ handleClear }
          >
            X
          </button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>rotation_period</th>
            <th>diameter</th>
            <th>climate</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>surface_water</th>
            <th>population</th>
            <th>films</th>
            <th>created</th>
            <th>edited</th>
            <th>orbital_period</th>
            <th>url</th>
          </tr>
        </thead>
        <tbody>
          {filteredArray.map((planet, index) => (
            <tr key={ index }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
