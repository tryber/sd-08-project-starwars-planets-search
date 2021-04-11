import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import TableHeaders from './TableHeaders';

export default function Table() {
  const { filteredPlanets, isLoading } = useContext(StarWarsContext);
  return (
    isLoading
    && (
      <table border="solid 1px">
        <thead>
          <TableHeaders />
        </thead>
        <tbody>
          {
            filteredPlanets.map((planet, i) => (
              <tr key={ i }>
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
            ))
          }
        </tbody>
      </table>
    )
  );
}
