import React from 'react';
import myContext from '../context/dataContext';
import TableHeaders from './tableHeaders';

function Table() {
  return (
    <div>
      <myContext.Consumer>
        { ({ planets }) => (
          <table>
            <TableHeaders />
            <tbody>
              {planets.map((planet, index) => (
                <tr key={ index }>
                  <td data-testid="planet-name">{planet.name}</td>
                  <td>{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td>{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td>{planet.gravity}</td>
                  <td>{planet.terrain}</td>
                  <td>{planet.surface_water}</td>
                  <td>{planet.population}</td>
                  <td><a href={ planet.films }>{planet.films}</a></td>
                  <td>{planet.created}</td>
                  <td>{planet.edited}</td>
                  <td><a href={ planet.url }>{planet.url}</a></td>
                </tr>))}
            </tbody>
          </table>
        )}
      </myContext.Consumer>
    </div>
  );
}

export default Table;
