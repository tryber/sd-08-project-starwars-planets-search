import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import NumericFilter from './numericFilter';

function Table() {
  const { data, setSearch, filter } = useContext(StarWarsContext);
  const [planets, setPlanets] = useState([]);

  const handleComparisonFilterLogic = useCallback((planet, filters) => {
    const { column, value, comparison } = filters;
    if (comparison === 'maior que') {
      return Number(planet[column]) > Number(value);
    } if (comparison === 'menor que') {
      return Number(planet[column]) < Number(value);
    }
    return Number(planet[column]) === Number(value);
  }, []);

  const filterByName = useCallback(() => {
    const filteredPlanets = data.filter((planet) => planet.name.toLowerCase()
      .includes(filter.filterByName.name.toLowerCase()));

    return filteredPlanets;
  }, [data, filter]);

  const filtersPlanets = useCallback(() => {
    const filteredPlanets = filterByName(filter);
    const zero = 0;
    if (filter && filter.filterByNumericValues.length > zero) {
      filter.filterByNumericValues.forEach((value) => {
        const finallyFilteredPlanets = filteredPlanets
          .filter((planet) => handleComparisonFilterLogic(planet, value));
        setPlanets(finallyFilteredPlanets);
      });
    } else {
      setPlanets(filteredPlanets);
    }
  }, [filter, filterByName, handleComparisonFilterLogic]);

  useEffect(() => {
    filtersPlanets();
  }, [filtersPlanets]);

  return (
    <div style={ { overflowX: 'auto' } }>
      <NumericFilter />
      <input
        type="text"
        placeholder="Search Planets"
        data-testid="name-filter"
        onChange={ (e) => setSearch(e.target.value) }
      />
      <table>

        <thead>
          <tr>
            <th>name</th>
            <th>rotation_period</th>
            <th>created</th>
            <th>orbital_period</th>
            <th>edited</th>
            <th>diameter</th>
            <th>url</th>
            <th>climate</th>
            <th>films</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>surface_water</th>
            <th>population</th>

          </tr>
        </thead>
        <tbody>
          {
            planets.map((planet) => (
              <tr key={ planet.url }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.created}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.edited}</td>
                <td>{planet.diameter}</td>
                <td>{planet.url}</td>
                <td>{planet.climate}</td>
                <td>{planet.films}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
