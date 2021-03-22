import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { data, forSetData, fetch,
    filters: { filterByName: { name: names } } } = useContext(StarWarsContext);
  useEffect(() => {
    forSetData();
  }, [forSetData]);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>rotation period</th>
            <th>orbital period</th>
            <th>diameter</th>
            <th>climate</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>surface_water</th>
            <th>population</th>
            <th>residents</th>
            <th>films</th>
            <th>created</th>
            <th>edited</th>
          </tr>
        </thead>
        { fetch && data.filter(({ name }) => name.includes(names)).map((element) => (
          <tbody key={ element.name }>

            <tr>
              <td>{ element.name }</td>
              <td>{ element.rotation_period }</td>
              <td>{ element.orbital_period }</td>
              <td>{ element.diameter }</td>
              <td>{ element.climate }</td>
              <td>{ element.gravity }</td>
              <td>{ element.terrain }</td>
              <td>{ element.surface_water }</td>
              <td>{ element.population }</td>
              <td>{element.residents.length}</td>
              <td>{element.films.length}</td>
              <td>{element.created}</td>
              <td>{element.edited}</td>

            </tr>
          </tbody>

        ))}
      </table>
    </div>

  );
}

export default Table;
