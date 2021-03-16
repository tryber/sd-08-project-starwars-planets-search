import React, { useContext } from 'react';
import contextStarWarsApi from '../context/context';

function Table() {
  const { planetFiltered } = useContext(contextStarWarsApi);
  return (
    <table className="table table-striped table-hover table-dark">
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
        {planetFiltered.map((planet, index) => (
          <tr key={ index }>
            <td className="border border-secondary">{planet.name}</td>
            <td className="border border-secondary">{planet.population}</td>
            <td className="border border-secondary">{planet.terrain}</td>
            <td className="border border-secondary">{planet.climate}</td>
            <td className="border border-secondary">{planet.gravity}</td>
            <td className="border border-secondary">{planet.diameter}</td>
            <td className="border border-secondary">{planet.orbital_period}</td>
            <td className="border border-secondary">{planet.rotation_period}</td>
            <td className="border border-secondary">{planet.surface_water}</td>
            <td className="border border-secondary">{planet.films}</td>
            <td className="border border-secondary">{planet.created}</td>
            <td className="border border-secondary">{planet.edited}</td>
            <td className="border border-secondary">{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
