import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { planets } = useContext(StarWarsContext);
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
          <th>Residents</th>
          <th>Films</th>
          <th>Edit</th>
          <th>Del</th>
        </tr>
      </thead>
      <tbody>
        {planets.map((item, index) => (
          <tr key={ index }>
            <td>{item.name}</td>
            <td>{item.rotation_period}</td>
            <td>{item.orbital_period}</td>
            <td>{item.diameter}</td>
            <td>{item.climate}</td>
            <td>{item.gravity}</td>
            <td>{item.terrain}</td>
            <td>{item.surface_water}</td>
            <td>{item.population}</td>
            <td>{item.residents}</td>
            <td>{item.films}</td>
            <td>Edit</td>
            <td>Del</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
