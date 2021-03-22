import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { planets, filterPlanets } = useContext(PlanetsContext);
  const renderRow = (planet, index) => (
    <tr key={ index }>
      {Object.values(planet).map((p, key) => <td key={ key }>{p}</td>)}
    </tr>
  );

  return (
    <table>
      <thead>
        <tr>
          {planets.length > 0 && Object.keys(planets[0])
            .map((planet, index) => <th key={ index }>{ planet }</th>)}
        </tr>
      </thead>
      <tbody>
        {filterPlanets.length > 0
          ? filterPlanets.map((planet, index) => renderRow(planet, index))
          : planets.map((planet, index) => renderRow(planet, index))}
      </tbody>
    </table>
  );
}

export default Table;
