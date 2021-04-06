import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const {
    planets,
    planetsFilters,
    filters,
    setFilters,
  } = useContext(StarWarsContext);

  const [column, setColumn] = useState();
  const [range, setRange] = useState();
  const [values, setValue] = useState();

  useEffect(() => {
  }, [filters]);

  const filterNamePlanets = ({ target }) => {
    const { value } = target;
    setFilters(
      { ...filters,
        filterByName: {
          name: value,
        },
      },
    );
  };

  const options = () => {
    const { filterByNumericValues } = filters;
    const newFilters = [];
    filterByNumericValues.map((filter) => newFilters.push(filter.column));
    const columnsAll = [
      'diameter',
      'orbital_period',
      'population',
      'rotation_period',
      'surface_water',
    ];
    const columnsForRender = columnsAll.filter((compar) => (
      newFilters.every((item) => item !== compar)
    ));
    return (
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => setColumn(target.value) }
        name="column"
      >
        {columnsForRender.map((columns, index) => (
          <option key={ index } value={ columns }>
            { columns }
          </option>
        ))}
      </select>
    );
  };

  const columnsForOrder = () => {
    const allColumns = [
      'name',
      'rotation_period',
      'orbital_period',
      'diameter',
      'climate',
      'gravity',
      'terrain',
      'surface_water',
      'population',
      'films',
      'created',
      'edited',
      'url',
    ];
    return (
      <select
        data-testid="column-sort"
        name="columnOrder"
        onChange={ ({ target }) => setFilters({
          ...filters,
          order: { ...filters.order, column: target.value },
        }) }
      >
        {allColumns.map((columns, index) => (
          <option key={ index } value={ columns }>
            { columns }
          </option>
        ))}
      </select>
    );
  };

  const filterNumeric = () => {
    setFilters(
      { ...filters,
        filterByNumericValues: [
          ...filters.filterByNumericValues,
          {
            column,
            comparison: range,
            value: values,
          },
        ],
      },
    );
  };

  const zero = 0;

  if (planets.length === zero) return (<h1>Carregando...</h1>);
  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Digite o nome do Planeta"
        onChange={ filterNamePlanets }
      />
      { options() }
      <select
        data-testid="comparison-filter"
        name="range"
        onChange={ ({ target }) => setRange(target.value) }
      >
        <option>Escolha uma medida</option>
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        placeholder="Digite o valor"
        onChange={ ({ target }) => setValue(target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ filterNumeric }
      >
        Filtrar
      </button>
      <label htmlFor="columnOrder">
        Ordenar
        { columnsForOrder() }
      </label>
      <label htmlFor="asc">
        ascendente:
        <input
          type="radio"
          name="sort"
          value="ASC"
          data-testid="column-sort-input-asc"
          onChange={ ({ target }) => setFilters({
            ...filters,
            order: { ...filters.order, sort: target.value },
          }) }
        />
      </label>
      <label htmlFor="desc">
        descendente:
        <input
          name="sort"
          type="radio"
          value="DESC"
          data-testid="column-sort-input-desc"
          onChange={ ({ target }) => setFilters({
            ...filters,
            order: { ...filters.order, sort: target.value },
          }) }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
      >
        Ordenar
      </button>
      <table border="1">
        <thead>
          <tr>
            {Object.keys(planets[0]).map((item) => (
              <th key={ item }>{ item }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planetsFilters.map(({
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
          }, index) => (
            <tr key={ index }>
              <td data-testid="planet-name">{name}</td>
              <td>{rotationPeriod}</td>
              <td>{orbitalPeriod}</td>
              <td>{diameter}</td>
              <td>{climate}</td>
              <td>{gravity}</td>
              <td>{terrain}</td>
              <td>{surfaceWater}</td>
              <td>{population}</td>
              <td>{films}</td>
              <td>{created}</td>
              <td>{edited}</td>
              <td>{url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
