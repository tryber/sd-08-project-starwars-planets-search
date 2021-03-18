import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function PlanetsTable() {
  const { data, isFetching } = useContext(PlanetsContext);

  return (
    <table className="table">
      <thead>
        <tr role="row">
          <th scope="col">Name</th>
          <th scope="col">Rotation period</th>
          <th scope="col">Orbital period</th>
          <th scope="col">Diameter</th>
          <th scope="col">Climate</th>
          <th scope="col">Gravity</th>
          <th scope="col">Terrain</th>
          <th scope="col">Surface water</th>
          <th scope="col">Population</th>
          <th scope="col">Residents</th>
          <th scope="col">Films</th>
          <th scope="col">Created</th>
          <th scope="col">Edited</th>
        </tr>
      </thead>
      {isFetching
        ? (
          <thead>
            <tr role="row">
              <th scope="col">Loading</th>
            </tr>
          </thead>
        )
        : (
          <tbody>
            { data.dataFiltered.map((planet) => (
              <tr role="row" key={ planet.created }>
                <td data-testid="planet-name">{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.residents}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
              </tr>
            ))}
          </tbody>
        )}
    </table>
  );
}

export default PlanetsTable;
