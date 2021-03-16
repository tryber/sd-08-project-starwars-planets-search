import React, { useContext } from 'react';
// import PropTypes from 'prop-types';

import { Context } from '../context';
import compare from '../services/comparison';

const tableHeaderContent = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter',
  'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created',
  'Edited', 'Url'];

const Table = () => {
  const { data, isLoading,
    filters: { filterByName, filterByNumericValues } } = useContext(Context);

  const existingColumnsFilter = filterByNumericValues.map(({ column }) => column);

  return (!isLoading
    && (
      <table>
        <thead>
          <tr>
            { tableHeaderContent.map((value) => <th key={ value }>{value}</th>) }
          </tr>
        </thead>
        <tbody>
          { data
            .filter(({ name }) => name.toLowerCase()
              .includes(filterByName.name.toLowerCase()))
            .filter((planet) => {
              if (existingColumnsFilter.length < 1) return true;
              return existingColumnsFilter.every((curColumn) => (
                compare(curColumn, planet[curColumn], filterByNumericValues)));
            })
            .map((planet) => (
              <tr key={ planet.name }>
                { Object.entries(planet)
                  .filter(([key]) => key !== 'residents')
                  .map(([, value]) => (<td key={ value }>{ value }</td>)) }
              </tr>)) }
        </tbody>
      </table>)
  );
};

// Table.propTypes = {

// };

export default Table;
