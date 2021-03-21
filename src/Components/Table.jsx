import React, { useContext } from 'react';
import StarWarsContext from '../Contexts/StarWars/StarWarsContext';

const Table = () => {
  const { planets,
    headers,
    filters: {
      filterByName: { name },
      filterByNumericValues,
      order: { column: header, sort } },
  } = useContext(StarWarsContext);

  const comparisonReducer = (p, { comparison, value, column }) => {
    switch (comparison) {
    case 'maior que':
      return p.filter((planet) => Number(planet[column]) > Number(value));

    case 'menor que':
      return p.filter((planet) => Number(planet[column]) < Number(value));

    case 'igual a':
      return p.filter((planet) => Number(planet[column]) === Number(value));

    default:
      return p;
    }
  };

  return (
    <table>
      <thead>
        <tr>
          {
            headers
              .map((h, index) => <th key={ index }>{h}</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
          filterByNumericValues
            .reduce(comparisonReducer, planets)
            .filter((planet) => (planet.name).includes(name))
            .sort((a, b) => {
              let fieldA = a[header];
              let fieldB = b[header];

              if (fieldA === 'unknown') fieldA = 0;
              if (fieldB === 'unknown') fieldB = 0;

              if (!Number.isNaN(Number(fieldA))) {
                fieldA = Number(fieldA);
                fieldB = Number(fieldB);
              }

              if (fieldA > fieldB) {
                return sort === 'ASC' ? 1 : +'-1';
              }
              if (fieldA < fieldB) {
                return sort === 'ASC' ? +'-1' : 1;
              }
              return 0;
            })
            .map((planet, index) => (
              <tr key={ index }>
                {
                  Object.entries(planet)
                    .map(([key, info]) => (
                      <td
                        data-testid={ key === 'name' ? 'planet-name' : null }
                        key={ info }
                      >
                        {info}
                      </td>))
                }
              </tr>
            ))
        }
      </tbody>
    </table>
  );
};

export default Table;
