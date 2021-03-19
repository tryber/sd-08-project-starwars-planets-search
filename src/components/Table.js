import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import PlanetCard from './PlanetCard';

function Table() {
  const { planets } = useContext(PlanetsContext);

  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>rotation_period</th>
          <th>orbital_period</th>
          <th>diameter</th>
          <th>climate</th>
          <th>gravity</th>
          <th>terrain</th>
          <th>surface_water</th>
          <th>population</th>
          <th>films</th>
          <th>created</th>
          <th>edited</th>
          <th>url</th>
        </tr>
      </thead>
      <tbody>
        {
          (planets === undefined)
            ? ''
            : planets.map((item) => <PlanetCard key={ item.name } item={ item } />)
        }
      </tbody>
    </table>
  );
}

export default Table;
