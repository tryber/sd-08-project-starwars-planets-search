import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import SearchHeader from './SearchHeader';

function Table() {
  // useContext -> ler infos do 'provider'
  const { data, titles } = useContext(StarWarsContext);

  return (
    <div>
      <SearchHeader />
      <table>
        <thead>
          <tr>
            { titles.map((title) => (
              <th key={ title }>
                { title }
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          { data.length ? data.map((planet) => (
            <tr key={ planet }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          )) : (<th>Loading...</th>)}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
