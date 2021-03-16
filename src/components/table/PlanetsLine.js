import React from 'react';
import PropTypes from 'prop-types';

const PlanetsLine = ({ planetInfos }) => {
  const typeInfos = [
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
      {typeInfos.map(
        (info) => <td key={ planetInfos.name + info }>{planetInfos[info]}</td>,
      )}
    </tr>
  );
};

PlanetsLine.propTypes = {
  planetInfos: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default PlanetsLine;
