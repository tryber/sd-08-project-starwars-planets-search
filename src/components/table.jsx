import React, { useContext } from 'react';
import { Context } from '../services/PlanetsContext';
import SortForm from './sortForm';

function PlanetsTable() {
  const { filteredPlanets } = useContext(Context);
  const tableHeaders = [
    'NAME',
    'ROTATION PERIOD',
    'ORBITAL PERIOD',
    'DIAMETER',
    'CLIMATE',
    'GRAVITY',
    'TERRAIN',
    'SURFACE WATER',
    'POPULATION',
    'FILMS',
    'CREATED',
    'EDITED',
    'URL',
  ];

  return (
    <div>
      {SortForm()}
      <table>
        <thead>
          <tr>
            {tableHeaders.map((item, index) => (
              <th key={ index }>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((item, index) => (
            <tr key={ index }>
              <td data-testid="planet-name">{item.name}</td>
              <td>{item.rotation_period}</td>
              <td>{item.orbital_period}</td>
              <td>{item.diameter}</td>
              <td>{item.climate}</td>
              <td>{item.gravity}</td>
              <td>{item.terrain}</td>
              <td>{item.surface_water}</td>
              <td>{item.population}</td>
              <td>{item.films}</td>
              <td>{item.created}</td>
              <td>{item.edited}</td>
              <td>{item.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlanetsTable;
