import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import getPlanetsApi from '../../services/getPlanetsAPI';

import '../../styles/table-of-planets.css';

export default function TableOfPlanets(props) {
  const { state, setState } = props;

  const getPlanetsApiAndSetState = async () => {
    const data = await getPlanetsApi();
    setState({ ...state, results: data, fixResults: data });
  };

  useEffect(() => {
    getPlanetsApiAndSetState();
  }, []);

  return (
    <table width="100%">
      <thead>
        <tr className="header-table">
          <th>Nome</th>
          <th>Periodo rotacional</th>
          <th>Periodo orbital</th>
          <th>Diametro</th>
          <th>Clima</th>
          <th>Gravidade</th>
          <th>Terreno</th>
          <th>Água da superfície</th>
          <th>População</th>
          <th>Filmes</th>
          <th>Criado</th>
          <th>Editado</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        { state.fixResults.map((planet) => (
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
        )) }
      </tbody>
    </table>
  );
}

TableOfPlanets.propTypes = {
  state: PropTypes.arrayOf.isRequired,
  setState: PropTypes.func.isRequired,
};
