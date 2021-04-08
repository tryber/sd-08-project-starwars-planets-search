import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Loading from './Loading';
import NoResults from './NoResults';

export default function Table() {
  const { planets, isLoading } = useContext(PlanetsContext);
  return (
    <div>
      {
        isLoading
          ? <Loading />
          : (
            <table>
              <thead>
                <tr className="thead">
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
                  planets.length === 0
                    ? <NoResults />
                    : (
                      planets.map((planet) => (
                        <tr key={ planet.name } className="tbody">
                          <td data-testid="planet-name">{planet.name}</td>
                          <td>{planet.rotation_period}</td>
                          <td>{planet.orbital_period}</td>
                          <td>{planet.diameter}</td>
                          <td>{planet.climate}</td>
                          <td>{planet.gravity}</td>
                          <td>{planet.terrain}</td>
                          <td>{planet.surface_water}</td>
                          <td>{planet.population}</td>
                          <td>{planet.films}</td>
                          <td>{planet.created}</td>
                          <td>{planet.edited}</td>
                          <td>{planet.url}</td>
                        </tr>
                      )))
                }
              </tbody>
            </table>
          )
      }
    </div>
  );
}
