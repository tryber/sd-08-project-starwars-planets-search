import React, { useContext } from 'react';
import StarWarsContext from '../context/Context';
import { orderByValue, orderByTextOrNumber } from '../helpers';

export default function Table() {
  const { planetList, filterByName,
    filterNumericColumns, orderColumnBy } = useContext(StarWarsContext);
  if (!planetList) {
    return <div>Loading...</div>;
  }
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(planetList[0]).map((header) => (
            <th key={ header }>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {planetList
          .filter((planet) => planet.name.toLowerCase()
            .includes(filterByName.toLowerCase()))
          .filter((planet) => {
            const { column, comparison, value } = filterNumericColumns;
            if (column && comparison && value) {
              const order = orderByValue(comparison, planet[column], value);
              return order;
            }
            return planet;
          })
          .sort((a, b) => {
            const { orderColumn, orderType } = orderColumnBy;
            const sortValue = orderByTextOrNumber(a, b, orderColumn, orderType);
            return sortValue;
          })
          .map((planet) => (
            <tr key={ planet.name }>
              {Object.values(planet).map((item, i) => {
                if (item === planet.name) {
                  return (
                    <td key={ i } data-testid="planet-name">
                      {item}
                    </td>
                  );
                }
                return (
                  <td key={ i }>
                    {item}
                  </td>);
              })}
            </tr>))}
      </tbody>
    </table>
  );
}
