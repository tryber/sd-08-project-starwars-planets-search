import React, { useContext } from 'react';
import PlanetsContext from '../contextAPI/PlanetsContext';
import { filterJunction } from '../services/filterFunctions';
import './Table.css';

function mapHeader(planets) {
  const tableHeaderInfo = Object.keys(planets[0])
    .filter((e) => (e !== 'residents' && e));
  return tableHeaderInfo.map((title) => <th key={ `ReactKeyTh${title}` }>{title}</th>);
}

function mapData(planetsParam) {
  return planetsParam.map((planet) => (
    <tr key={ `ReactKeyTr${planet.name}` }>
      { delete planet.residents }
      {
        Object.values(planet).map((value) => (
          <td key={ `reactKeyTd${value}` }>{value}</td>
        ))
      }
    </tr>
  ));
}

export default function Table() {
  const { planets, filters } = useContext(PlanetsContext);
  const filteredPlanets = filterJunction(planets.results, filters);

  return (
    <table>
      <thead>
        <tr>
          {mapHeader(planets.results)}
        </tr>
      </thead>
      <tbody>
        {mapData(filteredPlanets)}
      </tbody>
    </table>
  );
}
