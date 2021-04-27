import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const Table = () => {
  const { data, filters } = useContext(StarWarsContext);
  const { filterByName: { name } } = filters;
  const { order } = filters;

  const toAscOrder = (a, b) => {
    const columnFormat = order.column.toLowerCase();
    const lessThen = -1;
    const biggerThen = 1;
    if (a[columnFormat] > b[columnFormat]) return biggerThen;
    if (a[columnFormat] < b[columnFormat]) return lessThen;
    return 0;
  };

  const toDescOrder = (a, b) => {
    const columnFormat = order.column.toLowerCase();
    const lessThen = -1;
    const biggerThen = 1;
    if (a[columnFormat] > b[columnFormat]) return lessThen;
    if (a[columnFormat] < b[columnFormat]) return biggerThen;
    return 0;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        {data
          .sort((a, b) => {
            const { column, sort } = order;
            const columnFormat = column.toLowerCase();
            if (Number.isNaN(parseInt(a[columnFormat], 10))) {
              if (sort === 'ASC') return toAscOrder(a, b);
              return toDescOrder(a, b);
            }
            const isNumberColumnA = parseInt(a[columnFormat], 0);
            const isNumberColumnB = parseInt(b[columnFormat], 0);
            if (sort === 'ASC') {
              const lessThen = -1;
              const biggerThen = 1;
              if (isNumberColumnA > isNumberColumnB) return biggerThen;
              if (isNumberColumnA < isNumberColumnB) return lessThen;
              return 0;
            }
            const lessThen = 1;
            const biggerThen = -1;
            if (isNumberColumnA > isNumberColumnB) return biggerThen;
            if (isNumberColumnA < isNumberColumnB) return lessThen;
            return 0;
          })
          .filter((planet) => planet.name.includes(name))
          .filter((planet) => { // créditos ao Julio Kauer da minha antiga turma 07 que me ajudou a desenvolver esse filtro;
            let match = true;
            const { filterByNumericValues } = filters;
            if (filterByNumericValues === []) return true;
            filterByNumericValues.forEach((currFilter) => {
              switch (currFilter.comparison) {
              case 'maior que':
                match = match && parseFloat(planet[currFilter.column]) > currFilter.value;
                break;
              case 'menor que':
                match = match && parseFloat(planet[currFilter.column]) < currFilter.value;
                break;
              case 'igual a':
                match = match && planet[currFilter.column] === currFilter.value;
                break;
              default:
                match = true;
              }
            });
            return match;
          })
          .map((planet, index) => (
            <tr key={ index }>
              <td data-testid="planet-name">{planet.name}</td>
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
          ))}
      </tbody>
    </table>
  );
};

export default Table;
