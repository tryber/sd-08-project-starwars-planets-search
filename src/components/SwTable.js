import React, { useContext } from 'react';
import { ContextFromStarWars } from '../contexts/ContextFromStarWars';
import SwPlanet from './SwPlanet';

function SwTable() {
  const {
    filteredPlanets,
    sortPlanets,
  } = useContext(ContextFromStarWars);
  return (
    <table>
      <tbody>
        <tr>
          {[
            'Name', 'Rotation Period',
            'Orbital Period', 'Diameter',
            'Climate', 'Gravity', 'Terrain', 'surface Water',
            'Population', 'Films', 'Created', 'Edited', 'Url',
          ].map((field) => (
            <th key={ field }>{field}</th>
          ))}
        </tr>
        {filteredPlanets.sort(sortPlanets).map((planet) => (
          <SwPlanet key={ planet.name } planet={ planet } />
        ))}
      </tbody>
    </table>
  );
}

SwTable.defaultProps = {
  filteredPlanets: [],
};

export default SwTable;
