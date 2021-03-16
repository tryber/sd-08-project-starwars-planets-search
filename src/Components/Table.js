import React, { useContext } from 'react';

import PlanetsContext from './Contexts/PlanetsContext';

function Table() {
  const { data, isRequesting } = useContext(PlanetsContext);

  if (isRequesting) return <p>Loading...</p>;

  return (
    <table className="table table-hover table-bordered table-dark">
      <caption>Planets list</caption>
      <thead>
        <tr className="text-warning">
          <th scope="col" className="align-middle text-center">#</th>
          <th scope="col" className="align-middle text-center">Name</th>
          <th scope="col" className="align-middle text-center">Rotation Period</th>
          <th scope="col" className="align-middle text-center">Orbital Period</th>
          <th scope="col" className="align-middle text-center">Diameter</th>
          <th scope="col" className="align-middle text-center">Climate</th>
          <th scope="col" className="align-middle text-center">Gravity</th>
          <th scope="col" className="align-middle text-center">Terrain</th>
          <th scope="col" className="align-middle text-center">Surface Water</th>
          <th scope="col" className="align-middle text-center">Population</th>
          <th scope="col" className="align-middle text-center">Films</th>
          <th scope="col" className="align-middle text-center">Created</th>
          <th scope="col" className="align-middle text-center">Edited</th>
          <th scope="col" className="align-middle text-center">URL</th>
        </tr>
      </thead>
      <tbody>
        {data.map((planet, index) => (
          <tr key={ planet.name }>
            <th scope="row">{index + 1}</th>
            <td className="align-middle">{planet.name}</td>
            <td className="align-middle">{planet.rotation_period}</td>
            <td className="align-middle">{planet.orbital_period}</td>
            <td className="align-middle">{planet.diameter}</td>
            <td className="align-middle">{planet.climate}</td>
            <td className="align-middle">{planet.gravity}</td>
            <td className="align-middle">{planet.terrain}</td>
            <td className="align-middle">{planet.surface_water}</td>
            <td className="align-middle">{planet.population}</td>
            <td className="align-middle">
              {planet.films.map((filme) => (<div key={ filme }>{filme}</div>))}
            </td>
            <td className="align-middle">{planet.created}</td>
            <td className="align-middle">{planet.edited}</td>
            <td className="align-middle">{planet.url}</td>
          </tr>))}
      </tbody>
    </table>
  );
}

export default Table;
