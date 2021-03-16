import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const [filterPlanet, setFilterPlanet] = useState('');
  const {
    data,
    filters,
    functionLength,
    filterByNumericValuesFunc,
    removed,
    sorted,
    setSorted,
  } = useContext(StarWarsContext);
  const { filterByName: { name } } = filters;
  const { filterByNumericValues } = filters;
  let filterLength = filterByNumericValues.length;
  filterLength = functionLength(filterLength);
  const { column, comparison, value } = filterByNumericValues[filterLength];
  const filteringByName = data.filter((elem) => elem.name.includes(name));
  let dataFiltered;
  if (name === '' && removed === true && filterByNumericValues.length === 1) {
    dataFiltered = data;
  } else {
    dataFiltered = filteringByName;
  }
  if (column !== '' && filterPlanet === '') {
    dataFiltered = filterByNumericValuesFunc(dataFiltered, column, comparison, value);
    setFilterPlanet(dataFiltered);
  }
  if (filterPlanet !== '' && removed === false) {
    dataFiltered = filterByNumericValuesFunc(filterPlanet, column, comparison, value);
  }
  if (sorted === true) {
    dataFiltered = data;
    setSorted(!sorted);
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Population</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {dataFiltered.map((planet) => (
          <tr key={ planet.name }>
            <td
              data-testid="planet-name"
            >
              {planet.name}
            </td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.population}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.films}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
