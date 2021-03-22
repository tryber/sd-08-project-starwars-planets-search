import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function PlanetsDataTable() {
  const { planets } = useContext(StarWarsContext);
  const planetsWithoutResidentsColumns = planets.map((planet) => {
    delete planet.residents;
    return planet;
  });

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
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {
          planetsWithoutResidentsColumns.map((planet, index) => (
            <tr key={ index }>
              {
                Object.entries(planet).map(([key, value]) => (
                  <td key={ key }>{value}</td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default PlanetsDataTable;
