import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import { columnsNames } from '../helpers/functionsHelpers';

function Table() {
  const { newListPlanetsFilter } = useContext(PlanetContext);

  const renderPlanets = (planets) => (
    <tr key={ planets.name }>
      <td data-testid="planet-name">{planets.name}</td>
      <td>{planets.rotation_period}</td>
      <td>{planets.orbital_period}</td>
      <td>{planets.diameter}</td>
      <td>{planets.climate}</td>
      <td>{planets.gravity}</td>
      <td>{planets.terrain}</td>
      <td>{planets.surface_water}</td>
      <td>{planets.population}</td>
      <td>{planets.films}</td>
      <td>{planets.created}</td>
      <td>{planets.edited}</td>
      <td>{planets.url}</td>
    </tr>
  );
  return (
    <table>
      <thead>
        <tr>
          {columnsNames.map((opt) => (<th key={ opt }>{opt}</th>))}
        </tr>
      </thead>
      <tbody>
        {newListPlanetsFilter.map((planets) => renderPlanets(planets))}
      </tbody>
    </table>
  );
}

export default Table;
