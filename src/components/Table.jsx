import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from '../data/StarWarsContext';

const RESIDENTS_INDEX = 9;

export default function Table() {
  const { filters: { filterByName: { name },
  }, filteredData,
  } = useContext(StarWarsContext);

  const queryFilter = filteredData.filter((planet) => planet.name.includes(name));

  return (
    <table>
      {queryFilter.length < 1
        ? (
          <>
            <thead>
              <tr>
                <th>Sem resultados</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tente novamente com outro termo.</td>
              </tr>
            </tbody>
          </>
        ) : (
          <>
            <thead>
              <tr>
                {Object.keys(queryFilter[0]).map((key, i) => (
                  key !== 'residents' && <th key={ i }>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {queryFilter.map((planet, i) => (
                <tr key={ i }>
                  {Object.values(planet).map((values, j) => (
                    j !== RESIDENTS_INDEX && <td key={ j }>{values}</td>))}
                </tr>
              ))}
            </tbody>
          </>
        )}
    </table>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;
