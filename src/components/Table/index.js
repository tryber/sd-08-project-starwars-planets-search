import React, { useContext } from 'react';
import StarWarsContext from '../../context/StartWarsContext';

function Table() {
  const { data, isFetching } = useContext(StarWarsContext);
  const headers = [
    'climate', 'created', 'diameter',
    'edited', 'films', 'gravity',
    'name', 'orbitalPeriod', 'population',
    'rotationPeriod', 'surfaceWater', 'terrain', 'url',
  ];

  if (isFetching) return <div>Carregando</div>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((head) => (
              <th key={ head }>{ head }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(({
            climate,
            created,
            diameter,
            edited,
            films,
            gravity,
            name,
            orbital_period: orbitalPeriod,
            population,
            rotation_period: rotationPeriod,
            surface_water: surfaceWater,
            terrain,
            url,
          }) => (
            <tr key={ name }>
              <td>{ climate }</td>
              <td>{ created }</td>
              <td>{ diameter }</td>
              <td>{ edited }</td>
              <td>
                {films.map((filme) => (
                  <p key={ filme }>{ filme }</p>
                ))}
              </td>
              <td>{ gravity }</td>
              <td data-testid="planet-name">{ name }</td>
              <td>{ orbitalPeriod }</td>
              <td>{ population }</td>
              <td>{ rotationPeriod }</td>
              <td>{ surfaceWater }</td>
              <td>{ terrain }</td>
              <td>{ url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
