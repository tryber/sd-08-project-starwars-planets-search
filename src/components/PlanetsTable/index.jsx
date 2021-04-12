import React from 'react';
import PropTypes from 'prop-types';

const PlanetsTable = ({ info, resetButton }) => (
  <tr key={ info.name }>
    <td data-testid="planet-name">{info.name}</td>
    <td>{info.rotation_period}</td>
    <td>{info.orbital_period}</td>
    <td>{info.diameter}</td>
    <td>{info.climate}</td>
    <td>{info.gravity}</td>
    <td>{info.terrain}</td>
    <td>{info.surface_water}</td>
    <td>{info.population}</td>
    <td>{info.films.map((film) => film)}</td>
    <td>{info.created}</td>
    <td>{info.url}</td>
    <td data-testid="filter">
      <button type="button" onClick={ resetButton }>
        X
      </button>
    </td>
  </tr>
);

export default PlanetsTable;

PlanetsTable.propTypes = {
  info: PropTypes.shape({
    name: PropTypes.string,
    rotation_period: PropTypes.string,
    orbital_period: PropTypes.string,
    diameter: PropTypes.string,
    climate: PropTypes.string,
    gravity: PropTypes.string,
    terrain: PropTypes.string,
    surface_water: PropTypes.string,
    population: PropTypes.string,
    films: PropTypes.arrayOf(PropTypes.string),
    created: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  resetButton: PropTypes.func.isRequired,
};
