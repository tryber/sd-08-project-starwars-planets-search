import React, { useContext } from 'react';
import Header from './Header';
import PlanetsContext from '../context/MyContext';

const Table = () => {
  const {
    planets,
    searchName,
    setSearchName,
    filterByNumber,
    numberFiltered,
    columnFiltered,
    comparisonFiltered,
    newColumn,
    filterList,
  } = useContext(PlanetsContext);

  return (
    <div>
      <h1>StarWars DataTable Hooks</h1>
      <div className="all-filter">
        <div className="filter">
          <span>Filter by name</span>
          <input
            type="text"
            placeholder="select a planet"
            data-testid="name-filter"
            value={ searchName }
            onChange={ (e) => setSearchName(e.target.value) }
          />
          <div>
            <span>{filterList}</span>
            <button type="button">X</button>
          </div>
        </div>
        <div className="filter">
          <span>Filter by number</span>
          <select
            data-testid="column-filter"
            onChange={ (e) => columnFiltered(e.target.value) }
          >
            { newColumn.map(
              (
                column,
              ) => <option key={ column } value={ column }>{ column }</option>,
            )}
          </select>
          <select
            data-testid="comparison-filter"
            onChange={ (e) => comparisonFiltered(e.target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <input
            data-testid="value-filter"
            type="number"
            onChange={ (event) => numberFiltered(event.target.value) }
            placeholder="type a number"
          />
          <button
            type="button"
            data-testid="button-filter"
            onClick={ () => filterByNumber() }
          >
            Filter
          </button>
        </div>
        <div className="filter" />
      </div>
      <table>
        <Header />
        <tbody>
          {planets.map((planet) => (
            <tr key={ planet.name }>
              <td>{ planet.name }</td>
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
    </div>
  );
};

export default Table;
