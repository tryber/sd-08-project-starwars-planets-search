import React, { useContext, useState } from 'react';
import { savePlanet } from '../context/PlanetContext';

export default function FormPlanets() {
  const {
    filters,
    setFilters,
    selectPlanet,
    setSelectPlanet,
  } = useContext(savePlanet);

  const [object, setObject] = useState({});

  function filterOption({ target: { value, name } }) {
    setObject({ ...object, [name]: value });
  }

  function handleClick() {
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, object],
    });
    setSelectPlanet(selectPlanet.filter((element) => object.column !== element));
  }

  function handleClickRemoveFilter({ target }) {
    setFilters({
      ...filters,
      filterByNumericValues: filters.filterByNumericValues
        .filter((element) => element.column !== target.value),
    });
    setSelectPlanet([...selectPlanet, target.value]);
  }

  function filterOptionInputName({ target: { value } }) {
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  }

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ filterOptionInputName }
        placeholder="Nome do Planeta"
      />
      <select data-testid="column-filter" onChange={ filterOption } name="column">
        {selectPlanet.map((key) => <option key={ key } value={ key }>{key}</option>)}
      </select>
      <select data-testid="comparison-filter" onChange={ filterOption } name="compare">
        <option key="maior que" value="maior que">maior que</option>
        <option key="menor que" value="menor que">menor que</option>
        <option key="igual a" value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ filterOption }
        name="value"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
      <div data-testid="filter">
        {filters.filterByNumericValues.map((filter, index) => (
          <button
            key={ index }
            type="button"
            value={ filter.column }
            onClick={ handleClickRemoveFilter }
          >
            {`Limpar ${filter.column}`}
          </button>))}
      </div>
    </div>
  );
}
