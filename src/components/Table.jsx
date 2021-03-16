import React, { useContext } from 'react';
import starWarsContext from '../context/context';

function Table() {
  const planets = useContext(starWarsContext);

  let headers = [];
  if (planets.length > 0) {
    headers = Object.keys(planets[0]);
  }

  return (
    <table>
      <thead>
        <tr>
          { headers.map((header) => (
            <th key={ header }>{ header }</th>
          ))}
        </tr>
      </thead>
      <tbody>
        { planets.map((planet, i) => (
          <tr key={ i }>
            { Object.values(planet).map((value, index) => {
              if (index === 0) {
                return (
                  <td key={ `${index}+${value}` } data-testid="planet-name">
                    { value }
                  </td>
                );
              }
              return (
                <td key={ `${index}+${value}` }>
                  { value }
                </td>
              );
            }) }
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default Table;
