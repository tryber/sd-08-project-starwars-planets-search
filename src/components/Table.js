import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../contexts/PlanetsContext';
import filterDataByNumericValues from '../helpers/filterDataByNumericValues';

function Table({ keys }) {
  const { data, filters, order } = useContext(PlanetsContext);
  const { name } = filters.filterByName;
  const { filterByNumericValues } = filters;

  const numericColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const filtredDataByName = data.filter((planet) => planet.name.includes(name)) || [];
  const filtredData = filterDataByNumericValues(filtredDataByName, filterByNumericValues);
  const orderedData = filtredData.sort((a, b) => {
    let elementA = a[order.column];
    let elementB = b[order.column];
    if (numericColumns.includes(order.column)) {
      if (order.sort === 'ASC') {
        elementA = parseInt(elementA, 10);
        elementB = parseInt(elementB, 10);
      } else {
        const aux = parseInt(elementA, 10);
        elementA = parseInt(elementB, 10);
        elementB = aux;
      }
      return elementA - elementB;
    }
    if (order.sort === 'ASC') {
      return elementA.localeCompare(elementB);
    }
    return elementB.localeCompare(elementA);
  });

  return (
    <table>
      <thead>
        <tr>
          { keys.map((key) => (
            <th key={ key }>
              { key }
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        { orderedData.map((planet, index) => (
          <tr key={ index }>
            { keys.map((key) => (
              <td
                key={ key }
                data-testid={ `planet-${key}` }
              >
                { planet[key] }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Table;
