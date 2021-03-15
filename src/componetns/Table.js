import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import './Table.css';

function Table() {
  const StarWars = useContext(StarWarsContext);
  const PlantsInfo = StarWars;
  const [search, setSearch] = useState('');
  const [byNumericValues, setByNumericValues] = useState('');
  const [numericValues, setNumericValues] = useState(false);
  const [filteredByName, setFilteredByName] = useState(true);
  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [value, setValue] = useState('');

  const FilteredPlanets = PlantsInfo.filter((planet) => (
    planet.name.toLowerCase().includes(search.toLowerCase())
  ));

  const filterByNumericValues = () => {
    // column, comparison, value
    setFilteredByName(false);
    setNumericValues(true);
    const ByNumericValues = PlantsInfo.filter((planet) => {
      if (comparison === 'maior que') {
        return planet[column] > Number(value);
      }
      if (comparison === 'menor que') {
        return planet[column] < Number(value);
      }
      if (comparison === 'igual a') {
        return planet[column] === value;
      }
      return null;
    });
    setByNumericValues(ByNumericValues);
  };

  const turnOnOriginals = () => {
    setFilteredByName(true);
    setNumericValues(false);
  };
  console.log(byNumericValues);
  return (
    <>
      <input
        onChange={ (e) => setSearch(e.target.value) }
        type="text"
        data-testid="name-filter"
      />

      <select
        onChange={ (e) => setColumn(e.target.value) }
        data-testid="column-filter"
      >
        <option>rotation_period</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>surface_water</option>
        <option>population</option>
      </select>
      <select
        onChange={ (e) => setComparison(e.target.value) }
        data-testid="comparison-filter"
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        onChange={ (e) => setValue(e.target.value) }
        data-testid="value-filter"
        type="Number"
      />
      <button
        onClick={ filterByNumericValues }
        data-testid="button-filter"
        type="button"
      >
        Filtrar
      </button>
      <button
        onClick={ turnOnOriginals }
        data-testid="filter"
        type="button"
      >
        turnOnOriginals
      </button>
      <table>
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
        <tbody>
          {!numericValues && filteredByName
            ? FilteredPlanets.map((item) => (
              <tr key={ item.name }>
                <td key={ item.name }>{item.name}</td>
                <td key={ item.rotation_period }>{item.rotation_period}</td>
                <td key={ item.orbital_period }>{item.orbital_period}</td>
                <td key={ item.diameter }>{item.diameter}</td>
                <td key={ item.climate }>{item.climate}</td>
                <td key={ item.gravity }>{item.gravity}</td>
                <td key={ item.terrain }>{item.terrain}</td>
                <td key={ item.surface_water }>{item.surface_water}</td>
                <td key={ item.population }>{item.population}</td>
                <td key={ item.films }>{item.films}</td>
                <td key={ item.created }>{item.created}</td>
                <td key={ item.edited }>{item.edited}</td>
                <td key={ item.url }>{item.url}</td>
              </tr>
            ))
            : byNumericValues.map((planet) => (
              <tr key={ planet.name }>
                <td key={ planet.name }>{planet.name}</td>
                <td key={ planet.rotation_period }>{planet.rotation_period}</td>
                <td key={ planet.orbital_period }>{planet.orbital_period}</td>
                <td key={ planet.diameter }>{planet.diameter}</td>
                <td key={ planet.climate }>{planet.climate}</td>
                <td key={ planet.gravity }>{planet.gravity}</td>
                <td key={ planet.terrain }>{planet.terrain}</td>
                <td key={ planet.surface_water }>{planet.surface_water}</td>
                <td key={ planet.population }>{planet.population}</td>
                <td key={ planet.films }>{planet.films}</td>
                <td key={ planet.created }>{planet.created}</td>
                <td key={ planet.edited }>{planet.edited}</td>
                <td key={ planet.url }>{planet.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
