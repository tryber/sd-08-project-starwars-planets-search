import React, { useContext,
  // useState, useEffect
} from 'react';
import StarWarsPlanetsContext from '../context/StarWarsPlanetsContext';

function PlanetsTable() {
  const {
    filteredPlanets,
    filters,
  } = useContext(StarWarsPlanetsContext);
  const planets = filteredPlanets.sort((a, b) => {
    if (filters.order.sort === 'ASC') {
      return a[filters.order.column] - b[filters.order.column];
    }
    return b[filters.order.column] - a[filters.order.column];
  });

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {Object.keys(planets.reduce((acc, cur) => Object.assign(acc, cur), 0))
              .filter((key) => key !== 'residents')
              .map((header) => <th key={ header }>{ header }</th>)}
          </tr>
        </thead>
        <tbody>
          {planets.map((planet) => (
            <tr key={ planet.name }>
              {Object.keys(planet)
                .filter((key) => key !== 'residents')
                .map((planetInfo) => {
                  if (planetInfo === 'name') {
                    return (
                      <td
                        key={ planetInfo }
                        data-testid="planet-name"
                      >
                        { planet[planetInfo] }
                      </td>
                    );
                  }
                  return (
                    <td key={ planetInfo }>
                      { planet[planetInfo] }
                    </td>
                  );
                })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlanetsTable;
