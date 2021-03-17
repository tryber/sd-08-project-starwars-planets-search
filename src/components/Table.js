import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import './Table.css';

function Table() {
  const {
    filters,
    setFilter,
    filterPlanets,
    setOrderValues,
    setOrder,
  } = useContext(StarWarsContext);

  const zero = 0;

  const [column, setColumn] = useState('population');
  const [comparison, setCompare] = useState('maior que');
  const [value, setValue] = useState(zero);

  useEffect(() => {
    if (filters.columnToGrab.length > zero) {
      setColumn(filters.columnToGrab[zero]);
    }
  }, [filters.columnToGrab]);

  const filterData = () => {
    const grabbedColumns = filters.columnToGrab
      .filter((elem) => elem !== column);

    setFilter(
      {
        ...filters,
        filterValues: [
          ...filters.filterValues,
          {
            column,
            comparison,
            value,
          },
        ],
        columnToGrab: grabbedColumns,
      },
    );
  };

  const grabbedColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const clearBtn = (index) => {
    const newFilterNumValue = [...filters.filterValues];
    newFilterNumValue.splice(index, 1);
    grabbedColumns.splice(grabbedColumns
      .indexOf(filters.filterValues.column), 1);

    setFilter(
      {
        ...filters,
        filterValues: newFilterNumValue,
        columnToGrab: grabbedColumns,
      },
    );
  };

  return (
    <div>
      <section className="clouds">
        <h2>Star Wars</h2>
        <h1>Trybe</h1>
      </section>
      <div>
        <input
          className="margin input-text-number"
          type="text"
          data-testid="name-filter"
          onChange={ ({ target }) => {
            setFilter({ ...filters, filterByName: { name: target.value } });
          } }
        />
      </div>
      <div>
        <select
          className="margin"
          name="column"
          data-testid="column-filter"
          onChange={ ({ target }) => {
            setColumn(target.value);
          } }
        >
          {filters.columnToGrab.map((columnToGrab) => (
            <option value={ columnToGrab } key={ columnToGrab }>
              { columnToGrab }
            </option>
          ))}
        </select>
        <select
          className="margin"
          name="comparison"
          data-testid="comparison-filter"
          onChange={ ({ target }) => {
            setCompare(target.value);
          } }
        >
          <option value="menor que">menor que</option>
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          className="margin input-text-number"
          name="value"
          type="number"
          data-testid="value-filter"
          value={ value }
          onChange={ ({ target }) => {
            setValue(target.value);
          } }
        />
        <button
          className="margin btn"
          type="button"
          data-testid="button-filter"
          onClick={ filterData }
        >
          Filtrar
        </button>
        <label htmlFor="column-sort">
          <h1>Ordenar</h1>
          <select
            className="margin"
            name="column"
            data-testid="column-sort"
            onChange={ (e) => setOrderValues(e) }
          >
            {grabbedColumns
              .map((option) => (
                <option
                  name="column"
                  key={ option }
                  value={ option }
                >
                  { option }
                </option>))}
          </select>
        </label>
        <label htmlFor="asc">
          <h1>Ascendente</h1>
          <input
            className="margin"
            required
            name="sort"
            id="asc"
            value="ASC"
            type="radio"
            data-testid="column-sort-input-asc"
            onChange={ (e) => setOrderValues(e) }
          />
        </label>
        <label htmlFor="desc">
          <h1>Descendente</h1>
          <input
            className="margin"
            required
            name="sort"
            id="desc"
            value="DESC"
            type="radio"
            data-testid="column-sort-input-desc"
            onChange={ (e) => setOrderValues(e) }
          />
        </label>
        <button
          className="margin btn"
          type="button"
          data-testid="column-sort-button"
        >
          Ordenar
        </button>
      </div>
      <div>
        {filters.filterValues.map((filter, index) => (
          <div key={ index } data-testid="filter">
            { `${filter.column} ${filter.comparison} ${filter.value}`}
            <button
              type="button"
              onClick={ () => clearBtn(index) }
            >
              X
            </button>
          </div>
        ))}
      </div>

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
        <tbody>
          {filterPlanets()
            .sort(setOrder)
            .map((Planet, index) => (
              <tr className="table" key={ index }>
                <td data-testid="planet-name">{Planet.name}</td>
                <td>{Planet.rotation_period}</td>
                <td>{Planet.orbital_period}</td>
                <td>{Planet.diameter}</td>
                <td>{Planet.climate}</td>
                <td>{Planet.gravity}</td>
                <td>{Planet.terrain}</td>
                <td>{Planet.surface_water}</td>
                <td>{Planet.population}</td>
                <td>{Planet.films}</td>
                <td>{Planet.created}</td>
                <td>{Planet.edited}</td>
                <td>{Planet.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
