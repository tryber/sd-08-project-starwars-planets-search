import React from 'react';
import PropTypes from 'prop-types';

const PlanetRow = ({ planetInfos }) => {
  const infosNeeded = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'surface_water',
    'population',
    'edited',
    'films',
    'url',
    'created',
  ];

  return (
    <tr>
      {infosNeeded.map(
        (info) => <td key={ planetInfos.name + info }>{planetInfos[info]}</td>,
      )}
    </tr>
  );
};

PlanetRow.propTypes = {
  planetInfos: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default PlanetRow;
