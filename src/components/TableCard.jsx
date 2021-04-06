import React from 'react';
import PropTypes from 'prop-types';

function TableCard({ result }) {
  return (
    <tbody>
      <tr>
        <td>{result.name}</td>
        <td>{result.rotation_period}</td>
        <td>{result.orbital_period}</td>
        <td>{result.diameter}</td>
        <td>{result.climate}</td>
        <td>{result.gravity}</td>
        <td>{result.terrain}</td>
        <td>{result.surface_water}</td>
        <td>{result.population}</td>
        <td>{result.films}</td>
        <td>{result.created}</td>
        <td>{result.edited}</td>
        <td>{result.url}</td>
      </tr>
    </tbody>
  );
}

TableCard.propTypes = {
  result: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TableCard;
