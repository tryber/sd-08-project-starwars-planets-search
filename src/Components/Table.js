import React, { useContext, useEffect } from 'react';
import SWContext from '../Context/SWContext';

function Table() {
  const { getPlanets } = useContext(SWContext);
  useEffect(() => {
    getPlanets();
  });
  const { planets, isFiltered, filteredPlanets } = useContext(SWContext);
  const headerTable = [
    'Nome',
    'Período de Rotação',
    'Período de Órbita',
    'Diâmetro',
    'Clima',
    'Gravidade',
    'Terreno',
    'Água',
    'População',
    'Filmes',
    'Criado em',
    'Editado em',
    'Link',
  ];

  const showPlanets = !isFiltered ? planets : filteredPlanets;
  return (
    <table>
      <tr>
        { headerTable.map((tablehead) => <th key={ tablehead }>{ tablehead }</th>) }
      </tr>
      { showPlanets.map((planet, index) => (
        <tr key={ index }>
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
          <td><a href={ planet.url }>{`Planeta ${planet.name}`}</a></td>
        </tr>
      )) }
    </table>
  );
}
export default Table;
