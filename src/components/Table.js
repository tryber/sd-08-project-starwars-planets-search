import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './table.css';

function Table() {
  const { planets, isLoading } = useContext(PlanetsContext);
  const headers = [
    'Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
    'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films',
    'Created', 'Edited', 'Url'];

  if (isLoading) return <span>Loading...</span>;

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => <th key={ index }>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {planets.map((planet) => (
          <tr key={ planet.name }>
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
              {planet.films.map((film, index) => <p key={ index }>{film}</p>)}
            </td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>))}
      </tbody>
    </table>
  );
}

export default Table;
