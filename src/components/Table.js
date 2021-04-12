import React, { useContext } from 'react';
import { PlanetContext } from '../context/PlanetProvider';

export default function Table() {
  const finalFilter = (planets, filter) => {
    switch (filter.comparison) {
    case 'maior que':
      return planets.filter((planet) => parseFloat(planet[filter.column]) > filter.value);
    case 'menor que':
      return planets.filter((planet) => parseFloat(planet[filter.column]) < filter.value);
    case 'igual a':
      return planets.filter((planet) => planet[filter.column] === filter.value);
    default:
      return planets;
    }
  };

  const { order, filteredPlanets, filterArray } = useContext(PlanetContext);
  // const { column, sort } = order;
  const sortFilter = (a, b) => {
    if (order.sort === 'ASC') {
      return a[order.column] - b[order.column];
    } if (order.sort === 'DESC') {
      return b[order.column] - a[order.column];
    }
    return 0;
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>
            Rotation Period
          </th>
          <th>
            Orbital Period
          </th>
          <th>
            Diameter
          </th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>
            Surface Water
          </th>
          <th>
            Population
          </th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        { filterArray.reduce(finalFilter, filteredPlanets)
          .sort((a, b) => a.name.localeCompare(b.name))
          .sort(sortFilter)
          .map((planet, index) => (
            <tr key={ index }>
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
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
