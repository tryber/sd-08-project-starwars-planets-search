import React, { useContext, useState } from 'react';
import { PlanetsContext } from '../context/planetsContext';
import PlanetTbody from './PlanetTbody';
import PlanetThead from './PlanetThead';

function Planets() {
  const valueContext = useContext(PlanetsContext);
  const [filterName, setFilterName] = useState(null);

  // https://github.com/tryber/sd-08-project-starwars-planets-search/tree/ana-karine-project-starwars
  // https://github.com/tryber/sd-08-project-starwars-planets-search/tree/arnaelcio-sd-08-project-starwars-planets-search
  // Ana Karine e Arnaelcio Gomes
  // auxiliou na logica do função do requisito 3 e 4

  const [useColumn, setUseColumn] = useState('');
  const [useComparision, setUseComparision] = useState('');
  const [useInput, setUseInput] = useState(0);
  const [filterByNumericValues, setfilterByNumericValues] = useState('');
  const [optionState, setOptionState] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const handleChange = (({ target }) => {
    const valueModified = valueContext.filter(({ name }) => name.includes(target.value));
    if (target.value === '') {
      return setFilterName(valueContext);
    }
    return setFilterName(valueModified);
  });

  const handleChangeColumn = (event) => {
    setUseColumn(event);
  };

  const handleChangeComparision = (event) => {
    setUseComparision(event);
  };

  const handleChangeInputNumber = (event) => {
    setUseInput((event));
  };

  function funFilter() {
    const receiveFilter = valueContext.filter((filterItem) => {
      if (useComparision === 'maior que') {
        return filterItem[useColumn] * 1 > useInput;
      }
      if (useComparision === 'menor que') {
        return filterItem[useColumn] * 1 < (useInput);
      }
      if (useComparision === 'igual a') {
        return filterItem[useColumn] === useInput;
      }
      return null;
    });
    setfilterByNumericValues(receiveFilter);

    const deleteOption = optionState.filter((item) => item !== useColumn);
    setOptionState(deleteOption);
  }
  // 01 criar 3 useState para guardar os valores
  // useState = selectColumn
  // useState = selectComparison

  // 02  pegar o valor do select e fazer filter.
  // fazer um filter para comparar o valores da coluna com a comparação.

  //  03 fazer um função quando clicar no botão pegar o filter
  // se o  valor selecionador for  !== " " filtrar

  // 04 estilizar os inpunt select e o botão.

  return (
    <div>
      {console.log(filterName)}
      <header>
        <input
          type="text"
          data-testid="name-filter"
          placeholder="Digite o nome para filtrar"
          onChange={ handleChange }
        />

        <select
          data-testid="column-filter"
          onChange={ (event) => handleChangeColumn(event.target.value) }
        >
          {optionState.map((option) => (
            <option
              key={ option }
              value={ option }
            >
              {option}

            </option>
          ))}
        </select>

        <select
          data-testid="comparison-filter"
          onChange={ (event) => handleChangeComparision(event.target.value) }

        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>

        <input
          type="number"
          data-testid="value-filter"
          onChange={ (event) => handleChangeInputNumber(event.target.value) }
        />

        <button
          data-testid="button-filter"
          type="button"
          onClick={ funFilter }
        >
          Filtrar
        </button>
      </header>
      <table>
        <PlanetThead />
        <PlanetTbody value={ filterByNumericValues || filterName || valueContext } />
      </table>
    </div>
  );
}
export default Planets;
