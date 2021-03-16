import React, { useContext } from 'react';
import MyContext from './MyContext';

const Table = () => {
  const { starwarsData, filters } = useContext(MyContext);
  const { filterByName, filterByNumericValues } = filters;
  const resultsStarWarsApi = starwarsData.results;
  const showTableRow = (rowInfo) => {
    const {
      name,
      rotation_period: rotationPeriod,
      orbital_period: orbitalPeriod,
      diameter,
      climate,
      gravity,
      terrain,
      surface_water: surfaceWater,
      population,
      films,
      created,
      edited,
      url,
    } = rowInfo;
    return (
      <tr key={ name }>
        <td>{name}</td>
        <td>{rotationPeriod}</td>
        <td>{orbitalPeriod}</td>
        <td>{diameter}</td>
        <td>{climate}</td>
        <td>{gravity}</td>
        <td>{terrain}</td>
        <td>{surfaceWater}</td>
        <td>{population}</td>
        <td>
          {films.map((film) => (
            <span key={ film }>
              {film}
              {' '}
              <br />
            </span>
          ))}
        </td>
        <td>{created}</td>
        <td>{edited}</td>
        <td>{url}</td>
      </tr>
    );
  };

  const filterNumerics = (list) => {
    let filteredList = [...list];
    filterByNumericValues.forEach((element) => {
      const { column, comparison, value } = element;
      if (comparison === 'maior que') {
        filteredList = filteredList.filter(
          (item) => parseInt(item[column], 10) > parseInt(value, 10),
        );
      } else if (comparison === 'menor que') {
        filteredList = filteredList.filter(
          (item) => parseInt(item[column], 10) < parseInt(value, 10),
        );
      } else if (comparison === 'igual a') {
        filteredList = filteredList.filter(
          (item) => parseInt(item[column], 10) === parseInt(value, 10),
        );
      }
    });
    return filteredList;
  };

  const filter = () => {
    if (filterByNumericValues.length === 0) {
      return resultsStarWarsApi
        .filter((result) => result.name.includes(filterByName.name))
        .map((result) => showTableRow(result));
    }
    const filteredByName = resultsStarWarsApi
      .filter((result) => result.name.includes(filterByName.name));
    const filteredByNumerics = filterNumerics(filteredByName);
    return filteredByNumerics.map((result) => showTableRow(result));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>{filter()}</tbody>
    </table>
  );
};

export default Table;
