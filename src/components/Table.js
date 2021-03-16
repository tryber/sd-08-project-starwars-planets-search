import React, { useContext } from 'react';
import StarContext from '../context/StarContext';

function Table() {
  const {
    data,
    inputTextValue,
    handleChange,
    setColumn,
    setComparison,
    setValue,
    handleClickValues,
  } = useContext(StarContext);

  return (
    <div>
      <input type="text" data-testid="name-filter" onChange={ handleChange } />
      <select
        data-testid="column-filter"
        name="column"
        onChange={ (e) => setColumn(e.target.value) }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ (e) => setComparison(e.target.value) }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        onChange={ (e) => setValue(e.target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClickValues }
      >
        Filter
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotarion Period</th>
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
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {
            data ? data.filter((e) => e.name.toLowerCase()
              .includes(inputTextValue.toLowerCase()))
              .map((planet) => (
                <tr key={ planet.name }>
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
              )) : <span>Loading...</span>
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
