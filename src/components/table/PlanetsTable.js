import React, { useContext } from 'react';
import { PlanetsContext } from '../../context/PlanetsContext';
import PlanetsLine from './PlanetsLine';

const PlanetsTable = () => {
  const { filteredNames } = useContext(PlanetsContext);

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
          <th>Edited</th>
          <th>Films</th>
          <th>URL</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {filteredNames.map(
          (planet) => <PlanetsLine key={ planet.name } planetInfos={ planet } />,
        )}
      </tbody>
    </table>
  );
};

export default PlanetsTable;
