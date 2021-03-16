import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

const Table = () => {
  const { planets, filters: { filterByName: { name } } } = useContext(planetsContext);
  // criar o filtro aqui
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Climate</th>
            <th>Diameter</th>
            <th>Gravity</th>
            <th>Orbital Period</th>
            <th>Population</th>
            <th>Rotation Period</th>
            <th>Surface Water</th>
            <th>Terrain</th>
            <th>Films</th>
            <th>Residents</th>
            <th>Created</th>
            <th>Edited</th>
          </tr>
        </thead>
        <tbody>
          {planets.filter((planet) => (name ? planet.name.includes(name) : true))
            .map((planet, index) => (
              <tr key={ index }>
                <td>{planet.name}</td>
                <td>{planet.climate}</td>
                <td>{planet.diameter}</td>
                <td>{planet.gravity}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.population}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.terrain}</td>
                <td>{planet.films.length}</td>
                <td>{planet.residents.length}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
