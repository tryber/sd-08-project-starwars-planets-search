import React from 'react';

import getPlanetsApi from '../services/getPlanetsAPI';

export default function tableContructor() {
  const data = getPlanetsApi();
  return (
    data.results.map((planet) => (
      <tr key={ planet.name }>
        <th>{ planet.name }</th>
        <th>{ planet.rotation_period }</th>
        <th>{ planet.orbital_period }</th>
        <th>{ planet.diameter }</th>
        <th>{ planet.climate }</th>
        <th>{ planet.gravity }</th>
        <th>{ planet.terrain }</th>
        <th>{ planet.surface_water }</th>
        <th>{ planet.population }</th>
        <th>{ planet.films }</th>
        <th>{ planet.created }</th>
        <th>{ planet.edited }</th>
        <th>{ planet.url }</th>
      </tr>
    )));
}
