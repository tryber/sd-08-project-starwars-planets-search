import React, { useContext } from 'react';
import StarWarsContext from './Context/createContext';
import './style.css';

function Table() {
  const Context = useContext(StarWarsContext);

  const { setText, dataFilter, text,
    setColumn, setCompa, setValue,
    column, comparison, value } = Context;
  // setar valores da coluna aqui ,depois enviar pelo botao de clique e setar no obj para depois

  function handleName({ target }) {
    setText({
      ...text,
      filters: {
        ...text.filters,
        filterByName: { name: target.value },
      },
    });
  }
  function handleValuesC() {
    setText({
      ...text,
      filters: {
        ...text.filters,
        filterByNumericValues: [
          ...text.filters.filterByNumericValues,
          {
            column,
            comparison,
            value,

          },
        ],
      },
    });
    const arr = Array.from(document.querySelector('.compar'));
    const arr1 = Array.from(document.querySelector('.column'));

    arr.find((element) => element.value === comparison && element.remove());
    arr1.find((element) => element.value === column && element.remove());
  }

  function removeFilter(values) {
    setText((previous) => ({
      ...text,
      filters: {
        ...text.filters,
        filterByNumericValues:
         previous.filters.filterByNumericValues
           .filter((e) => !Object.values(e).includes(values)),

      },
    }));
  }

  return (
    <div>
      <label htmlFor="search label">
        Search:
        <input
          type="text"
          onChange={ (event) => handleName(event) }
          data-testid="name-filter"
        />
      </label>
      <select
        className="column"
        data-testid="column-filter"
        onChange={ ({ target }) => setColumn(target.value) }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        className="compar"
        data-testid="comparison-filter"
        onChange={ (e) => setCompa(e.target.value) }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ (e) => setValue(e.target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleValuesC }
      >
        Adicionar Filtro
      </button>
      {text.filters.filterByNumericValues.map(
        ({ column: column1, comparison: comparison1, value: value1 }, index) => (
          <div data-testid="filter" key={ index }>
            <p>{`${column1} ${comparison1} ${value1}`}</p>
            <button type="button" onClick={ () => removeFilter(value1) }>X</button>
          </div>
        ),
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>rotation_period</th>
            <th>orbital_period</th>
            <th>diameter</th>
            <th>climate</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>surface_water</th>
            <th>population</th>
            <th>films</th>
            <th>created</th>
            <th>edited</th>
            <th>url</th>
          </tr>
        </thead>
        <tbody>
          {dataFilter && dataFilter.map(
            ({ name,
              rotation_period: rotationPeriod, orbital_period: oribitalPeriod,
              diameter, climate, gravity,
              terrain, surface_water: surfaceWater,
              population, films, created, edited, url },
            index) => (
              <tr key={ index }>
                <td>{name}</td>
                <td>{rotationPeriod}</td>
                <td>{oribitalPeriod}</td>
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
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
