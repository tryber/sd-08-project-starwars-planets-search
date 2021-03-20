import React, { useContext } from 'react';
import NewContext from '../context/NewContext';

function Table() {
  const { planet } = useContext(NewContext);
  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>population</th>
          <th>climate</th>
          <th>gravity</th>
          <th>diameter</th>
          <th>rotation_period</th>
          <th>orbital_period</th>
          <th>terrain</th>
          <th>surface_water</th>
          <th>films</th>
          <th>created</th>
          <th>edited</th>
          <th>url</th>
        </tr>
      </thead>
      <tbody>
        { planet.map((planets, index) => (
          <tr key={ index }>
            <td>{planets.name}</td>
            <td>{planets.population}</td>
            <td>{planets.climate}</td>
            <td>{planets.gravity}</td>
            <td>{planets.diameter}</td>
            <td>{planets.rotation_period}</td>
            <td>{planets.orbital_period}</td>
            <td>{planets.terrain}</td>
            <td>{planets.surface_water}</td>
            <td>{planets.films}</td>
            <td>{planets.created}</td>
            <td>{planets.edited}</td>
            <td>{planets.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
