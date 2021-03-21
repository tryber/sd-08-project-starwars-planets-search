import React, { useState, useContext } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';

const Table = () => {
  const { data } = useContext(PlanetsContext);

  const [search, setSearch] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  function renderData() {
    if (filteredPlanets.length === 0) return data;

    return filteredPlanets;
  }

  function handleFilteredPlanets() {
    const filteredData = [];

    data.filter((planets) => {
      if (comparison === 'maior que') {
        filteredData.push(parseInt(planets[column], 0) > number ? planets : null);

        setFilteredPlanets(filteredData);
      } else if (comparison === 'menor que') {
        filteredData.push(parseInt(planets[column], 0) < number ? planets : null);

        setFilteredPlanets(filteredData);
      } else if (comparison === 'igual a') {
        filteredData.push(planets[column] === number ? planets : null);

        setFilteredPlanets(filteredData);
      }

      return filteredData;
    });
  }

  return (
    <>
      <input
        type="text"
        name="search"
        value={ search }
        onChange={ ({ target: { value } }) => setSearch(value) }
        placeholder="Pesquise por um planeta"
        data-testid="name-filter"
      />

      <select
        value={ column }
        onChange={ ({ target: { value } }) => setColumn(value) }
        data-testid="column-filter"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        value={ comparison }
        onChange={ ({ target: { value } }) => setComparison(value) }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        name="number"
        value={ number }
        onChange={ ({ target: { value } }) => setNumber(value) }
        data-testid="value-filter"
      />

      <button
        type="submit"
        onClick={ handleFilteredPlanets }
        data-testid="button-filter"
      >
        Filtrar
      </button>

      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>ROTATION PERIOD</th>
            <th>ORBITAL PERIOD</th>
            <th>DIAMETER</th>
            <th>CLIMATE</th>
            <th>GRAVITY</th>
            <th>TERRAIN</th>
            <th>SURFACE WATER</th>
            <th>POPULATION</th>
            <th>FILMS</th>
            <th>CREATED AT</th>
            <th>EDITED AT</th>
            <th>URL</th>
          </tr>
        </thead>

        <tbody>
          {renderData().filter((planets) => {
            if (search === '') return planets;

            return planets.name.toLowerCase().includes(search.toLowerCase());
          }).map((planet, index) => (
            <tr key={ index }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
