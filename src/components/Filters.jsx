import React, { useContext, useState } from 'react';
import { DataContext } from '../data/DataContext';

const Filters = () => {
  const { filters, setFilters, selectPlanet, setSelectPlanet } = useContext(DataContext);

  const [objeto, setObjeto] = useState({});

  function handleChange({ target: { value, name } }) {
    setObjeto({ ...objeto, [name]: value });
  }

  function handleClick() {
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, objeto],
    });
    setSelectPlanet(selectPlanet.filter((element) => objeto.column !== element));
  }

  function handleClickRemoveFilter({ target }) {
    setFilters({
      ...filters,
      filterByNumericValues: filters.filterByNumericValues
        .filter((element) => element.column !== target.value),
    });
    setSelectPlanet([...selectPlanet, target.value]);
  }

  function handleChangeInputName({ target: { value } }) {
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  }

  return (
    <div className="container">

      <input
        data-testid="name-filter"
        onChange={ handleChangeInputName }
        className="input"
        placeholder="Digite um nome"
      />

      <select data-testid="column-filter" onChange={ handleChange } name="column">
        {selectPlanet.map((e) => <option key={ e } value={ e }>{e}</option>)}
      </select>
      <select data-testid="comparison-filter" onChange={ handleChange } name="comparison">
        <option key="maior que" value="maior que">maior que</option>
        <option key="menor que" value="menor que">menor que</option>
        <option key="igual a" value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        onChange={ handleChange }
        placeholder="Digite o valor"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Adicionar Filtro
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
};

export default Filters;
