import React, { useContext, useState, useEffect } from 'react';
import StarContext from '../context/context';
// import { objetosEmComum, objetosEmComum2, objetosEmComum3, objetosEmComum4 } from './HyperFilter';

export default function Table() {
  const valorInicialDeComparação = 0;
  const [input, inputChange] = useState('');
  const [numberInput, numberInputChange] = useState(valorInicialDeComparação);
  const [columnSelect, columnSelectChange] = useState('rotation_period');
  const [comparisonSelect, comparisonSelectChange] = useState('maior que');
  const arrayTd = useContext(StarContext);
  const [filtersMap, filtersMapChange] = useState([]);
  const arrTh = ['Name', 'Terrain', 'Climate', 'Population',
    'Diameter', 'Rotation_period', 'Orbital_period', 'Gravity',
    'Surface_water', 'Created', 'Edited', 'Films', 'Url'];
  const [arrayOfNumericFilter, setArrayOfNumericFilter] = useState([]);

  const filterName = (array) => {
    const arrTdFiltered = array.filter((obj) => obj.name.includes(input));
    return arrTdFiltered;
  };
  const objetosEmComum = (ARRAY) => {
    const inicioDaContagemDeItens = 0;
    let maiorArray = [];
    if (ARRAY.length === 1) {
      return ARRAY[0];
    }
    for (let i = inicioDaContagemDeItens; i < ARRAY.length; i += 1) {
      if (ARRAY[i].length > maiorArray.length) {
        maiorArray = ARRAY[i];
      }
    }
    return maiorArray;
  };
  // essa primeira parte pegou o maior array dentro do arrayzao e pos numa variavel

  const objetosEmComum2 = (ARRAY) => {
    const arr = [...ARRAY];
    const inicioDaContagemDeItens = 0;
    const maiorArray = objetosEmComum(ARRAY);
    for (let i = inicioDaContagemDeItens; i < arr.length; i += 1) {
      if (arr[i] === maiorArray) {
        arr.splice(i, 1);
      }
    }
    // essa segunda parte removeu o maior array de dentro do arrayzao...
    return arr;
  };

  const objetosEmComum3 = (ARRAY) => {
    const inicioDaContagemDeItens = 0;
    const ARRAYY = objetosEmComum2(ARRAY);
    const maiorArray = objetosEmComum(ARRAY);
    const arrFinal = [];
    for (let i = inicioDaContagemDeItens; i < maiorArray.length; i += 1) {
      for (let l = inicioDaContagemDeItens; l < ARRAYY.length; l += 1) {
        for (let j = inicioDaContagemDeItens; j < ARRAYY[l].length; j += 1) {
          if (JSON.stringify(maiorArray[i]) === JSON.stringify(ARRAY[l][j])
           && ARRAYY[l][j] !== undefined) {
            arrFinal.push(ARRAYY[l][j]);
          }
        }
      }
    }

    return arrFinal;
  };

  const objetosEmComum4 = (ARRAY) => {
    if (ARRAY.length === 1) {
      return ARRAY[0];
    }
    const inicioDaContagemDeItens = 0;
    const arrFinal = objetosEmComum3(ARRAY);
    const ARRAYY = objetosEmComum2(ARRAY);
    const organizado = [];
    for (let i = inicioDaContagemDeItens; i < arrFinal.length; i += 1) {
      organizado.push(JSON.stringify(arrFinal[i]));
    }
    organizado.sort();
    const arrDeSaida = [];
    let count = 1;
    for (let i = inicioDaContagemDeItens; i < organizado.length; i += 1) {
      if (organizado[i] === organizado[i + 1]) {
        count += 1;
        if (count === ARRAYY.length) {
          arrDeSaida.push(JSON.parse(organizado[i]));
          count = 1;
        }
      } else if (ARRAYY.length === 1) {
        arrDeSaida.push(JSON.parse(organizado[i]));
      }
    }
    for (let i = 0; i < ARRAYY.length; i += 0) {
      if (ARRAYY[i] === []) {
        return ARRAYY[i];
      }
    }

    return arrDeSaida;
  };

  const filterNumber = () => {
    let arrTdFiltered = [];
    if (comparisonSelect === 'maior que') {
      arrTdFiltered = arrayTd.filter((obj) => obj[columnSelect] * 1 > numberInput);
      return arrTdFiltered;
    }
    if (comparisonSelect === 'menor que') {
      arrTdFiltered = arrayTd.filter((obj) => obj[columnSelect] * 1 < numberInput);
      return arrTdFiltered;
    } if (comparisonSelect === 'igual a') {
      arrTdFiltered = arrayTd.filter((obj) => obj[columnSelect] === numberInput);
      return arrTdFiltered;
    }
    return arrayTd;
  };

  useEffect(() => {
    setArrayOfNumericFilter([[...arrayTd]]);
  }, [arrayTd]);

  const geraFiltrosNumericos = () => {
    const arr = [...arrayOfNumericFilter];
    arr.push(filterNumber());
    setArrayOfNumericFilter(arr);
  };

  const existeArrayOfNumeric = () => {
    if (arrayOfNumericFilter[1] !== undefined) {
      alert('entrounoif, reconheceu arrayOfNumericFilter');
      return objetosEmComum4(arrayOfNumericFilter);
    }
    return arrayTd;
  };
  return (
    <div className="back">
      {' '}
      <div className="nameInputContainer">
        Filtro de Nome:
        <input
          className="nameInput"
          type="text"
          value={ input }
          placeholder="Busque por uma parte do nome do planeta."
          data-testid="name-filter"
          onChange={ (event) => { inputChange(event.target.value); } }
        />
      </div>
      <div className="numberInputContainer">
        Filtro Numérico:
        <select
          data-testid="column-filter"
          value={ columnSelect }
          onChange={ (event) => { columnSelectChange(event.target.value); } }
        >
          <option value="population">population</option>
          <option value="diameter">diameter</option>
          <option value="orbital_period">orbital_period</option>
          <option value="surface_water">surface_water</option>
          <option value="rotation_period">rotation_period</option>
        </select>
        <select
          data-testid="comparison-filter"
          value={ comparisonSelect }
          onChange={ (event) => { comparisonSelectChange(event.target.value); } }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          value={ numberInput }
          data-testid="value-filter"
          onChange={ (event) => { numberInputChange(event.target.value); } }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => geraFiltrosNumericos() }
        >
          Adicionar Filtro
        </button>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => console.log('a') }
        >
          Consolearray
        </button>
        {/* <div className="filtersContainer">
          {filters.map((tipo) => (
            <div key="filterskey">
              <p key={ tipo }>{tipo}</p>
              <button key={ tipo } type="button">
                Excluir Filtro
              </button>
            </div>
          ))}
        </div> */}
      </div>
      <table className="table">
        <thead>
          <tr>
            { arrTh.map((item) => <th className="table" key={ item }>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {/* objetosEmComum4(arrayOfNumericFilter)) */}
          {filterName(existeArrayOfNumeric()).map((obj) => (
            <tr className="table" key={ obj.name }>
              <td className="table">{obj.name}</td>
              <td className="table">{obj.terrain}</td>
              <td className="table">{obj.climate}</td>
              <td className="table">{obj.population}</td>
              <td className="table">{obj.diameter}</td>
              <td className="table">{obj.rotation_period}</td>
              <td className="table">{obj.orbital_period}</td>
              <td className="table">{obj.gravity}</td>
              <td className="table">{obj.surface_water}</td>
              <td className="table">{obj.created}</td>
              <td className="table">{obj.edited}</td>
              <td className="table">
                {obj.films
                  .map((item) => <p key={ item }>{ item }</p>)}
              </td>
              <td className="table">{obj.url}</td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}
