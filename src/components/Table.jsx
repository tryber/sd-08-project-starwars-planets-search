import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function Table() {
  const { isLoading, planets } = useContext(PlanetContext);

  const title = ['name', 'rotation_period', 'orbital_period',
    'diameter', 'climate', 'gravity', 'terrain', 'surface_water',
    'population', 'films', 'created', 'edited', 'url'];

  // console.log(planets);

  return (
    isLoading
      && (
        <table border="solid">
          <thead>
            <tr>
              {title.map((item, i) => <th key={ i }>{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {/* {
              planets.map((planet, i) => (
                <tr key={ i }>
                  { Object.values(planet)
                    .map((info) => <td key={ info }>{ info }</td>) }
                </tr>))
            } */}

            {
              planets.map((planet, i) => (
                <tr key={ i }>
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
              ))
            }

            {/* { planets.map((planet) => (
              <tr key={ planet.name }>
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
            ))} */}
          </tbody>
        </table>
      )
  );
}

export default Table;
