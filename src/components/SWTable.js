import React, { useContext } from 'react';
import SWContext from '../context/SWContext';
import './SWTable.css';

const SWTable = () => {
  const { planets, filterByInput } = useContext(SWContext);
  const existKeys = planets[0] || {};
  const tHeader = Object.keys(existKeys)
    .map((element, index) => (
      <th
        key={ index }
        style={ { border: '1px solid black' } }
      >
        {element.toUpperCase()}
      </th>));
  const tBody = filterByInput.map((element, index) => (
    <tr key={ index }>
      <td data-testid="planet-name">{element.name}</td>
      <td>{element.rotation_period}</td>
      <td>{element.orbital_period}</td>
      <td>{element.diameter}</td>
      <td>{element.climate}</td>
      <td>{element.gravity}</td>
      <td>{element.terrain}</td>
      <td>{element.surface_water}</td>
      <td>{element.population}</td>
      <td>{element.films}</td>
      <td>{element.created}</td>
      <td>{element.edited}</td>
      <td>{element.url}</td>
    </tr>));

  return (
    <table>
      <thead>
        <tr key="table-header">
          {tHeader}
        </tr>
      </thead>
      <tbody>
        {tBody}
      </tbody>
    </table>

  );
};

export default SWTable;
