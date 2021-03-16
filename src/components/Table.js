import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import theads from '../data/theads';
import '../styles/Table.css';

function Table() {
  const { planets, filterByName, filterByNumericValue,
    order } = useContext(StarWarsContext);

  const newData = planets.sort((a, b) => {
    const MENOR_VALOR = -1;
    const { column } = order;
    if (column === 'population'
    || column === 'diameter'
    || column === 'orbital_period') {
      if (order.order === 'ASC') {
        if (Number(a[column]) > Number(b[column])) return 1;
        if (Number(a[column]) < Number(b[column])) return MENOR_VALOR;
        return 0;
      }
      if (Number(a[column]) > Number(b[column])) return MENOR_VALOR;
      if (Number(a[column]) < Number(b[column])) return 1;
      return 0;
    }

    if (order.order === 'ASC') {
      if (a[column] > b[column]) return 1;
      if (a[column] < b[column]) return MENOR_VALOR;
      return 0;
    }
    if (a[column] > b[column]) return MENOR_VALOR;
    if (a[column] < b[column]) return 1;
    return 0;
  })

    .filter(
      (elem) => elem.name.includes(filterByName),
    )
    .filter((elem) => {
      if (filterByNumericValue[0]) {
        const { column, comparision, value } = filterByNumericValue[0];
        if (comparision === 'menor que') return elem[column] < Number(value);
        if (comparision === 'maior que') return elem[column] > Number(value);
        return elem[column] === (value);
      } return elem;
    })
    .filter((elem) => {
      if (filterByNumericValue[1]) {
        const { column, comparision, value } = filterByNumericValue[1];
        if (comparision === 'menor que') return elem[column] < Number(value);
        if (comparision === 'maior que') return elem[column] > Number(value);
        return elem[column] === (value);
      } return elem;
    })
    .filter((elem) => {
      if (filterByNumericValue[2]) {
        const { column, comparision, value } = filterByNumericValue[1];
        if (comparision === 'menor que') return elem[column] < Number(value);
        if (comparision === 'maior que') return elem[column] > Number(value);
        return elem[column] === (value);
      } return elem;
    })
    .filter((elem) => {
      if (filterByNumericValue[3]) {
        const { column, comparision, value } = filterByNumericValue[1];
        if (comparision === 'menor que') return elem[column] < Number(value);
        if (comparision === 'maior que') return elem[column] > Number(value);
        return elem[column] === (value);
      } return elem;
    })
    .filter((elem) => {
      if (filterByNumericValue[4]) {
        const { column, comparision, value } = filterByNumericValue[1];
        if (comparision === 'menor que') return elem[column] < Number(value);
        if (comparision === 'maior que') return elem[column] > Number(value);
        return elem[column] === (value);
      } return elem;
    })
    .map((elem) => Object.entries(elem)
      .filter((f) => f[0] !== 'residents'));

  return (
    <div className="table-body">
      <div className="planets-table">
        <table>
          <thead>
            <tr>
              {theads.map((e, index) => <th key={ index }>{e}</th>)}
            </tr>
          </thead>
          <tbody>
            {newData.map((elem, index) => (
              <tr key={ index }>
                {elem.map((e) => {
                  if (e[0] === 'name') {
                    return <td key={ e[0] } data-testid="planet-name">{e[1]}</td>;
                  }
                  return <td key={ e[0] }>{e[1]}</td>;
                })}
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>

  );
}

export default Table;
