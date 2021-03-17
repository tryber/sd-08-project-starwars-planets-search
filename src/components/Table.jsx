import React, { useContext } from 'react';
import PlanetContext from '../contexts/PlanetContext';
import useFilterByColumn from '../hooks/useFilterByColumn';
import useFilterByName from '../hooks/useFilterByName';

function sortList(list, columnSort, sortType) {
  if (sortType === 'ASC') {
    list.sort((a, b) => a[columnSort].localeCompare(b[columnSort], undefined, {
      numeric: true,
      sensitivity: 'base',
    }));
  }
  if (sortType === 'DESC') {
    list.sort((a, b) => b[columnSort].localeCompare(a[columnSort], undefined, {
      numeric: true,
      sensitivity: 'base',
    }));
  }
  console.log(list);
  return list;
}

function Table() {
  const {
    planetsList,
    filters,
  } = useContext(PlanetContext);
  const { filterByNumericValues, order: { column, sort }, sorted } = filters;

  const [filteredByName] = useFilterByName();
  const [filteredByColumn] = useFilterByColumn();

  const listOfPlanets = (filterByNumericValues.length > 0)
    ? filteredByColumn : filteredByName;

  function getTableHeadInfo() {
    const planetKeys = Object.keys(planetsList[0]);
    return planetKeys.filter((key) => key !== 'residents');
  }

  if (listOfPlanets.length) {
    const headInfo = getTableHeadInfo();
    if (sorted) { sortList(listOfPlanets, column, sort); }

    return (
      <table>
        <thead>
          <tr>
            { headInfo.map((planetKey) => (
              <th key={ planetKey } className="table-head">{ planetKey }</th>
            )) }
          </tr>
        </thead>
        <tbody>
          { listOfPlanets.map((planet) => (
            <tr key={ planet.name }>
              <td data-testid="planet-name">{ planet.name }</td>
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
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <span>Loading...</span>
  );
}

export default Table;
