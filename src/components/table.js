import React, { useContext } from 'react';
import { PlanetsContext } from '../context/planetsContext';

const Table = () => {
  const { data, header, filteredData } = useContext(PlanetsContext);
  if (data.length !== 0) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              {header.map((property) => {
                if (property === 'Name') {
                  return <th key={ property }>{property}</th>;
                }
                return <th key={ property }>{property}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((planet, index) => (
              <tr key={ index }>
                {header.map((property, index2) => {
                  if (property === 'name') {
                    return (
                      <td
                        key={ index2 }
                        data-testid="planet-name"
                      >
                        {planet[property]}
                      </td>);
                  }
                  return <td key={ index2 }>{planet[property]}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div>Carregando...</div>
  );
};

export default Table;
