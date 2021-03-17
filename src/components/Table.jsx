import React, { useContext } from 'react';
import { DateContext } from '../context/DataContext';

const Table = () => {
  const {
    filterName, searchName, filterPlanet, filterNumber, setFilterNumber, handleClick,
  } = useContext(DateContext);

  return (
    <>
      <h1> StormTrooper, consulte o planeta de sua próxima missão no campo abaixo </h1>
      <label htmlFor="searchInput">
        Faça sua busca por nome:
        <input
          data-testid="name-filter"
          type="text"
          onChange={ filterName }
          value={ searchName }
        />
      </label>

      Faça sua busca por colunas:
      <select
        data-testid="column-filter"
        name="column"
        onChange={ (e) => setFilterNumber(
          { ...filterNumber, column: e.target.value },
        ) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      Maior/Menor/Igual:

      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ (e) => setFilterNumber(
          { ...filterNumber, comparison: e.target.value },
        ) }
      >
        <option value="maior que">maior que</option>
        <option value="igual a">igual a</option>
        <option value="menor que">menor que</option>
      </select>

      <label htmlFor="numberInput">
        Insira o número:
        <input
          data-testid="value-filter"
          name="value"
          type="number"
          onChange={ (e) => setFilterNumber(
            { ...filterNumber, value: e.target.value },
          ) }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>

      <table border="1">
        <caption>Lista de Planetas</caption>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Nome</th>
            <th>Tempo de rotação</th>
            <th>Tempo de rotação orbital</th>
            <th>Diâmetro</th>
            <th>Clima</th>
            <th>Força Gravitacional</th>
            <th>Tipo de Terreno</th>
            <th>Qtde de Água</th>
            <th>População</th>
            <th>Aparição em Filmes</th>
            <th>Criado em</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filterPlanet.map((item, index) => (
            <tr key={ item.name }>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.rotation_period}</td>
              <td>{item.orbital_period}</td>
              <td>{item.diameter}</td>
              <td>{item.climate}</td>
              <td>{item.gravity}</td>
              <td>{item.terrain}</td>
              <td>{item.surface_water}</td>
              <td>{item.population}</td>
              <td>{item.films.map((filme) => (<li key={ filme }>{filme}</li>))}</td>
              <td>{item.created}</td>
              <td>{item.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
