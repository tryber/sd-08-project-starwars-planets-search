import React, { useContext } from 'react';
import PlanetsContext from '../context/planetsContext';

const Table = () => {
  const { filteredPlanets } = useContext(PlanetsContext);

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
          <th>Edited</th>
          <th>Films</th>
          <th>URL</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {/* { planets.map((planet) => (
          <tr key={ planet.name }>
            {tableData.map((property) => (
              <td key={ `${planet.name}-${property}` }>
                {planet[property]}
              </td>
            ))}
          </tr>
        ))}
        ; */}
        { filteredPlanets.map((planet) => (
          <tr key={ planet.name }>
            <td>{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
