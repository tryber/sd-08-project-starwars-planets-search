import React from 'react';
// import PropTypes from 'prop-types';

import { PlanetsType } from '../common/Types';

const TABLE_HEADERS = [
  'name',
  'rotation_period',
  'orbital_period',
  'diameter',
  'climate',
  'gravity',
  'terrain',
  'surface_water',
  'population',
  'films',
  'created',
  'edited',
  'url',
];

function PlanetsTable({ data }) {
  const builder = () => data.map((i, index) => (
    <tr key={ index }>
      <td>{i.name}</td>
      <td>{i.rotation_period}</td>
      <td>{i.orbital_period}</td>
      <td>{i.diameter}</td>
      <td>{i.climate}</td>
      <td>{i.gravity}</td>
      <td>{i.terrain}</td>
      <td>{i.surface_water}</td>
      <td>{i.population}</td>
      <td>{i.films}</td>
      <td>{i.created}</td>
      <td>{i.edited}</td>
      <td>{i.url}</td>
    </tr>));

  return (
    <table>
      <thead>
        <tr>
          { TABLE_HEADERS.map((i, index) => (
            <th key={ index }>
              {i}
            </th>)) }
        </tr>
      </thead>
      <tbody>
        { builder()}
      </tbody>
    </table>
  );
}

PlanetsTable.propTypes = {
  data: PlanetsType.isRequired,
};

export default PlanetsTable;
