import React, { useContext } from 'react';
import { DataContext } from '../API/DataContext';

const Table = () => {
  const {
    filterName,
    searchName, filterPlanet, filterNumberValue, setfilterNumberValue, handleClick,
  } = useContext(DataContext);

  return (
    <>
      <p>Search Planet</p>
      <input
        type="text"
        data-testid="name-filter"
        id="search"
        onChange={ filterName }
        value={ searchName }
      />
      <select
        data-testid="column-filter"
        name="column"
        onChange={ ({ target }) => setfilterNumberValue(
          { ...filterNumberValue, column: target.value },
        ) }
      >
        <option id="pop" value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ ({ target }) => setfilterNumberValue(
          { ...filterNumberValue, comparison: target.value },
        ) }
      >
        <option value="maior que">maior que</option>
        <option value="igual a">igual a</option>
        <option value="menor que">menor que</option>
      </select>
      <input
        data-testid="value-filter"
        name="value"
        type="number"
        onChange={ ({ target }) => setfilterNumberValue(
          { ...filterNumberValue, value: target.value },
        ) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filter
      </button>
      <table id="lista">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Created</th>
            <th>Orbital Period</th>
            <th>Edited</th>
            <th>Diameter</th>
            <th>Url</th>
            <th>Climate</th>
            <th>Films</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {
            filterPlanet.map((planet) => (
              <tr key={ planet.name }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.created}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.edited}</td>
                <td>{planet.diameter}</td>
                <td>{planet.url}</td>
                <td>{planet.climate}</td>
                <td>{planet.films}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
};

export default Table;
