import React from 'react';
import PropTypes from 'prop-types';

const TableData = (props) => {
  const { results } = props;
  return (
    <tbody>
      {
        results !== undefined
        && results.map((planet) => {
          delete planet.residents;
          return (
            <tr key={ planet.name }>
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
          );
        })
      }
    </tbody>
  );
};

TableData.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableData;
