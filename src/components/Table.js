import React, { useContext } from 'react';
import SearchPlanetsContext from '../context/SearchPlanetsContext';

function Table() {
  const { planets, isLoaded } = useContext(SearchPlanetsContext);
  if (isLoaded) {
    return (
      <table>
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
            <th>URL</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {
            planets.map((planet) => (
              <tr key={ planet.name }>
                <td data-testid="planet-name">{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.url}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
  return (<>Carregando...</>);
}

export default Table;
