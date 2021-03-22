import React, { useContext } from 'react';
// import getStarwarsApi from '../service/Api';
// import PropTypes from 'prop-types';

import StarwarsContext from '../context/StarwarsContext';

function ListOfInputs() {
  const { starwarsData, isLoading, filterByName } = useContext(StarwarsContext);
  // conceito visto na w3school
  function headTableListOfInputs() {
    return (
      <thead>
        <tr>
          <th>name</th>
          <th>rotation_period</th>
          <th>orbital_period</th>
          <th>diameter</th>
          <th>climate</th>
          <th>gravity</th>
          <th>terrain</th>
          <th>surface_water</th>
          <th>population</th>
          <th>films</th>
          <th>created</th>
          <th>edited</th>
          <th>url</th>
        </tr>
      </thead>
    );
  }

  function bodyTableListOfInputs() {
    console.log(starwarsData);
    return (
      <tbody>
        { starwarsData
          .filter((data) => (filterByName ? data.name.includes(filterByName) : data))
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
          ))}
      </tbody>
    );
  }

  function loading() {
    return (
      <span>Loading...</span>
    );
  }

  return (
    <div>
      { isLoading
        ? loading() : (
          <table>
            { headTableListOfInputs() }
            { bodyTableListOfInputs() }
          </table>) }
    </div>
  );
}

export default ListOfInputs;
