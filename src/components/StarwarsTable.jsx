import React, { useContext } from 'react';
import StarwarsContext from '../context/StarwarsContext';

import tableHeaders from '../common/tableHeaders';

export default function StarwarsTables() {
  const { tables } = useContext(StarwarsContext);
  return (
    <table>
      <thead>
        <tr>
          { tableHeaders.map((item, index) => (
            <th key={ index }>
              { item }
            </th>
          )) }
        </tr>
      </thead>
      <tbody>
        { tables.map((item, index) => (
          <tr key={ index }>
            <td>{ item.name }</td>
            <td>{ item.rotation_period }</td>
            <td>{ item.orbital_period }</td>
            <td>{ item.diameter }</td>
            <td>{ item.climate }</td>
            <td>{ item.gravity }</td>
            <td>{ item.terrain }</td>
            <td>{ item.surface_water }</td>
            <td>{ item.population }</td>
            <td>{ item.films }</td>
            <td>{ item.created }</td>
            <td>{ item.edited }</td>
            <td>{ item.naurl }</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
}
