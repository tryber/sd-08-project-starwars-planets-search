import React, { useContext } from 'react';

import StarWarsPlanetsContext from '../context/StarWarsPlanetsContext';

function Table() {
  const { filteredPlanets } = useContext(StarWarsPlanetsContext);
  return (
    <table className="table is-narrow">
      <thead>
        <tr>
          <th>Name</th>
          <th>Population</th>
          <th>Terrain</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Diameter</th>
          <th>Orbital Period</th>
          <th>Rotation Period</th>
          <th>Surface Water</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {filteredPlanets.map((planet, index) => (
          <tr key={ index }>
            <td data-testid="planet-name">{planet.name}</td>
            <td>{planet.population}</td>
            <td>{planet.terrain}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.diameter}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.films}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
