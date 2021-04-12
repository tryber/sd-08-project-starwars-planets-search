import React from 'react';
import PropTypes from 'prop-types';

function SwPlanet(props) {
  const {
    planet: {
      name, rotation_period: rotationPeriod,
      orbital_period: orbitalPeriod, diameter,
      climate, gravity, terrain, surface_water: surfaceWater,
      population, films, created, edited, url,
    },
  } = props;

  return (
    <tr>
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
  );
}

SwPlanet.propTypes = {
  planet: PropTypes.shape({
    name: PropTypes.string,
    rotation_period: PropTypes.string,
    orbital_period: PropTypes.string,
    diameter: PropTypes.string,
    climate: PropTypes.string,
    gravity: PropTypes.string,
    terrain: PropTypes.string,
    surface_water: PropTypes.string,
    population: PropTypes.string,
    residents: PropTypes.arrayOf(
      PropTypes.string,
    ),
    films: PropTypes.arrayOf(
      PropTypes.string,
    ),
    created: PropTypes.string,
    edited: PropTypes.string,
    url: PropTypes.string,
  }),
};

SwPlanet.defaultProps = {
  planet: {},
};

export default SwPlanet;
