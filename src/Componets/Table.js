import React, { useContext } from 'react';
import Context from '../Context/Contexto';

const Table = () => {
  const {
    filtroPlaneta,
    procurarNome,
    setProcurarNome,
    options,
    tamanho,
    filtro,
    handleClick,
    handleDelet,
    tabela,
  } = useContext(Context);
  return (
    <div>
      <h1>Starwars Planets Search</h1>
      <label htmlFor="Name">
        Name:
        <input
          data-testid="name-filter"
          type="text"
          onChange={ (e) => setProcurarNome(e.target.value) }
          value={ procurarNome }
        />
      </label>
      <select data-testid="column-filter" onChange={ filtro }>
        {options.map((key) => (
          <option key={ key }>{key}</option>
        ))}
      </select>
      <select data-testid="comparison-filter" onChange={ filtro }>
        {tamanho.map((key) => (
          <option key={ key }>{key}</option>
        ))}
      </select>
      <input type="number" data-testid="value-filter" onChange={ filtro } />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Add Filtro
      </button>
      <br />
      <h2>Filtros Ativos</h2>
      <table>
        <tbody>
          {tabela.map((item, index) => (
            <tr key={ index }>
              <td>{ item.column }</td>
              <td>{ item.comparison }</td>
              <td>{ item.value }</td>
              <td><button type="button" onClick={ (e) => handleDelet(e) }>Excluir Filtro</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
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
          { filtroPlaneta.map((planet, index) => (
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
    </div>
  );
};

export default Table;
