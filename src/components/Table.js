import React, { useContext, useEffect, useState } from 'react';

import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const [data, setData] = useState([]);

  const {
    requesting,
    planets,
    setPlanetsFiltered,
    planetsFiltered,
    numericFilteredPlanets,
  } = useContext(PlanetsContext);

  function setList() {
    if (numericFilteredPlanets.length) {
      setData(numericFilteredPlanets);
    } else if (planetsFiltered.length) {
      setData(planetsFiltered);
    } else {
      setData(planets);
    }
  }

  useEffect(() => setList());
  useEffect(() => {
    if (!document.querySelector('#inputSearch')
      .value.length) return setPlanetsFiltered(planets);
  });

  return (
    <>
      <table className="table table-hover table-bordered table-dark">
        <caption>Planets list</caption>
        <thead>
          <tr className="text-warning">
            <th>#</th>
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
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {!requesting && data.map((planet, index) => (
            <tr key={ planet.name }>
              <td>{index + 1}</td>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>
                {planet.films.map((filme) => (<div key={ filme }>{filme}</div>))}
              </td>
              <td>{planet.created}</td>
              <td>{planet.url}</td>
            </tr>))}
        </tbody>
      </table>
      {requesting && <p>Loading...</p>}
    </>
  );
}

export default Table;
