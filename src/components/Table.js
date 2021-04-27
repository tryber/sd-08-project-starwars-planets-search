import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../MyContext';

function Table() {
  const columnFilter = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const filterComparison = ['maior que', 'menor que', 'igual a'];
  const {
    data, fetchPlanets, name, setNameFilter, filterByName, setFilter,
    setColumn, setComparison, setValue,
    filterExample: { filters: { filterByNumericValues } },
  } = useContext(MyContext);
  useEffect(() => {
    fetchPlanets();
  }, []);

  const [Mapping, setMapping] = useState(false);

  const handleFilterName = (e) => {
    setNameFilter((e.target.value));
    const filteringByName = data.filter((planet) => planet.name.includes(e.target.value));
    setFilter(filteringByName);
  };

  const handleFilterByNumber = () => {
    const { column, comparison, value } = filterByNumericValues[0];
    let filteringByValue;
    if (comparison === 'maior que') {
      filteringByValue = data.filter((planet) => planet[column] > value);
      setFilter(filteringByValue);
    }
    if (comparison === 'menor que') {
      filteringByValue = data.filter((planet) => planet[column] < value);
      setFilter(filteringByValue);
    }
    if (comparison === 'igual a') {
      filteringByValue = data.filter((planet) => Number(planet[column]) === value);
      setFilter(filteringByValue);
    }
    setMapping(true);
  };

  return (
    <div>
      <section>
        <input
          data-testid="name-filter"
          value={ name }
          type="text"
          onChange={ handleFilterName }
        />
        <div>
          <select
            data-testid="column-filter"
            value={ filterByNumericValues.column }
            onChange={ ({ target }) => setColumn(target.value) }
          >
            {!Mapping && columnFilter.map((elem) => <option key={ elem }>{elem}</option>)}
            {Mapping && columnFilter.map((elem) => {
              if (filterByNumericValues.find((item) => item.column !== elem)) {
                return <option key={ elem }>{elem}</option>;
              }
              return '';
            })}
          </select>
          <select
            data-testid="comparison-filter"
            value={ filterByNumericValues.comparison }
            onChange={ ({ target }) => setComparison(target.value) }
          >
            {filterComparison.map((elem) => <option key={ elem }>{elem}</option>)}
          </select>
          <input
            type="number"
            data-testid="value-filter"
            value={ filterByNumericValues.value }
            onChange={ ({ target }) => setValue(Number(target.value)) }
          />
          <button
            data-testid="button-filter"
            type="button"
            onClick={ () => handleFilterByNumber() }
          >
            Filtrar
          </button>
        </div>
        <div>
          {Mapping
            && filterByNumericValues.map((item) => (
              <>
                <span>{item.column}</span>
                {' '}
                <span>{item.comparison}</span>
                {' '}
                <span>{item.value}</span>
                <button type="button">X</button>
              </>
            ))}
        </div>
      </section>
      <table>
        <thead>
          <tr>
            {data[0] !== undefined ? Object.keys(data[0])
              .map((item) => item !== 'url' && <th key={ item }>{item}</th>)
              : <td>Carregando</td>}
          </tr>
        </thead>
        <tbody>
          {filterByName.map((item) => (
            <tr key={ item.name }>
              <td>{item.name}</td>
              <td>{item.rotation_period}</td>
              <td>{item.orbital_period}</td>
              <td>{item.diameter}</td>
              <td>{item.climate}</td>
              <td>{item.gravity}</td>
              <td>{item.terrain}</td>
              <td>{item.surface_water}</td>
              <td>{item.population}</td>
              <td>Residents</td>
              <td>{item.films}</td>
              <td>{item.created}</td>
              <td>{item.edited}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
