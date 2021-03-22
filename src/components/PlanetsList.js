import React, { useContext } from 'react';
import AppContext from '../context/Context';

function PlanetsList() {
  const { dataApi,
    filters: { filterByNumericValues },
    filters: { filterByName: { name },
    } } = useContext(AppContext);

  return (
    dataApi
      .filter((planet) => filterByNumericValues.every((element) => {
        const { column, comparison, value } = element;
        if (comparison === 'maior que') {
          return planet[column] > parseFloat(value)
            && planet.name.toLowerCase().includes(name.toLowerCase());
        }
        if (comparison === 'menor que') {
          return planet[column] < parseFloat(value)
            && planet.name.toLowerCase().includes(name.toLowerCase());
        }
        if (comparison === 'igual a') {
          return planet[column] === value
            && planet.name.toLowerCase().includes(name.toLowerCase());
        }
        return planet.name.toLowerCase().includes(name.toLowerCase());
      }))

      .map((data, index) => (
        <tr key={ index }>
          <td>{ data.name }</td>
          <td>{ data.rotation_period }</td>
          <td>{ data.orbital_period }</td>
          <td>{ data.diameter }</td>
          <td>{ data.climate }</td>
          <td>{ data.gravity }</td>
          <td>{ data.terrain }</td>
          <td>{ data.surface_water }</td>
          <td>{ data.population }</td>
          <td>{ data.films }</td>
          <td>{ data.created }</td>
          <td>{ data.edited }</td>
          <td>{ data.url }</td>
        </tr>
      ))
  );
}

export default PlanetsList;
