import React, { useContext } from 'react';
import DataContext from './DataContext';

export default function FiltersCombine() {
  const {
    column,
    setColumn,
    range,
    setRange,
    number,
    setNumber,
    Filter,
  } = useContext(DataContext);

  function columnHandler(e) {
    const text = e.target.value;
    setColumn(text);
  }

  function rangeHandler(e) {
    const text = e.target.value;
    setRange(text);
  }

  function numberHandler(e) {
    const text = e.target.value;
    setNumber(text);
  }

  return (
    <div>
      <label htmlFor="select-input">
        Filtrar por Colunas
        <select
          id="select-input"
          name="select"
          value={ column }
          onChange={ columnHandler }
          data-testid="column-filter"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>

        </select>
      </label>

      <label htmlFor="select-input-Range">
        Faixa de Valor
        <select
          id="select-input-Range"
          name="select-Range"
          value={ range }
          onChange={ rangeHandler }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>

        </select>
      </label>

      <input
        data-testid="value-filter"
        type="number"
        placeholder="number"
        value={ number }
        onChange={ numberHandler }
      />

      <button
        data-testid="button-filter"
        type="button"
        onClick={ Filter }
      >
        Adicionar Filtro
      </button>
    </div>
  );
}
