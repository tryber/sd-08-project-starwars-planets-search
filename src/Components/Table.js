import React, { useContext } from 'react';
import StarWarsContext from '../Context/StarWarsContext';

function Table() {
  const { filterPlanet } = useContext(StarWarsContext);

  return (
    <table className="table table-dark table-bordered table-responsive">
      <thead>
        <tr className="text-center">
          <th>Name</th>
          <th>Rotation_period</th>
          <th>Orbital_period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface_water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {filterPlanet.map((p, index) => (
          <tr className="text-center" key={ index }>
            <td>{p.name}</td>
            <td>{p.rotation_period}</td>
            <td>{p.orbital_period}</td>
            <td>{p.diameter}</td>
            <td>{p.climate}</td>
            <td>{p.gravity}</td>
            <td>{p.terrain}</td>
            <td>{p.surface_water}</td>
            <td>{p.population}</td>
            <td>{p.films}</td>
            <td>{p.created}</td>
            <td>{p.edited}</td>
            <td>{p.url}</td>
          </tr>))}
      </tbody>
    </table>

  );
}

export default Table;
