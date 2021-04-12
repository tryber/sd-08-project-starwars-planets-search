import React, { useContext } from 'react';
import { savePlanet } from '../context/PlanetContext';

function Table() {
  const { data } = useContext(savePlanet);
  return (
    <div>
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th scope="col">name</th>
            <th scope="col">rotation_period</th>
            <th scope="col">orbital_period</th>
            <th scope="col">diameter</th>
            <th scope="col">climate</th>
            <th scope="col">gravity</th>
            <th scope="col">terrain</th>
            <th scope="col">surface_water</th>
            <th scope="col">population</th>
            <th scope="col">films</th>
            <th scope="col">created</th>
            <th scope="col">edited</th>
            <th scope="col">url</th>
          </tr>
        </thead>
        <tbody>
          {data.state.map((planet, index) => (
            <tr key={ index }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
