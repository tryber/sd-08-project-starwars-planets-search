import React, { useContext } from 'react';
import ContextStars from '../context/ContextStar';
import FiltroAtivo from './FiltroAtivo';

export default function Table() {
  const contexto = useContext(ContextStars);
  const {
    planets,
    bynumbers,
    setbynumbers,
    name,
    onfilterByName,
    filteredplanets,
    setrestoreplanets,
    setfilteredplanets,
    setfiltroAtivo,
  } = contexto;

  const handleClick = () => {
    setrestoreplanets(planets);
    // setplanets([]);
    const { column, comparison, value } = bynumbers;
    if (comparison === 'maior que') {
      setfilteredplanets(
        planets.filter((i) => i[column] > Number(value)),
      );
    }
    if (comparison === 'menor que') {
      setfilteredplanets(
        planets.filter((i) => i[column] < Number(value)),
      );
    }
    if (comparison === 'igual a') {
      setfilteredplanets(
        planets.filter((i) => i[column] === value),
      );
    }
    setfiltroAtivo({ ...bynumbers });
  };
  return (
    <div>
      <header>
        <label htmlFor="filterbyname">
          Filtro por nome:
          <input
            type="text"
            name="filterbyname"
            value={ name }
            data-testid="name-filter"
            onChange={ onfilterByName }
          />
        </label>
        <label htmlFor="column">
          Filtro por coluna:
          <select
            name="column"
            data-testid="column-filter"
            onChange={ (e) => setbynumbers({ ...bynumbers, column: e.target.value }) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>

        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ (e) => setbynumbers({ ...bynumbers, comparison: e.target.value }) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          type="number"
          data-testid="value-filter"
          onChange={
            (e) => setbynumbers({ ...bynumbers, value: (e.target.value),
            })
          }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </header>
      <section>
        <FiltroAtivo />
      </section>
      <table border="1px solid black">
        <thead>
          <tr>
            {Object.keys(planets[0] || []).filter(
              (i) => (i !== 'residents'),
            ).map((item, i) => (
              <th key={ i }>{item}</th>
            ))}

          </tr>
        </thead>
        <tbody>
          {filteredplanets.map((item, i) => (
            <tr key={ i }>
              <td>{item.name}</td>
              <td>{item.rotation_period}</td>
              <td>{item.orbital_period}</td>
              <td>{item.diameter}</td>
              <td>{item.climate}</td>
              <td>{item.gravity}</td>
              <td>{item.terrain}</td>
              <td>{item.surface_water}</td>
              <td>{item.population}</td>
              <td>{item.films.map((f) => (f))}</td>
              <td>{item.created}</td>
              <td>{item.edited}</td>
              <td>{item.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
