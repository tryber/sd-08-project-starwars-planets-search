import React, { useContext, useState } from 'react';
import Context from '../context/Context';

export default function NumberInputFilter() {
  const { setFilters, selectOptions, setSelectOptions } = useContext(Context);
  const [temporaryColumn, setTemporaryColumn] = useState(selectOptions[0]);
  const [temporaryValue, setTemporaryValue] = useState('');
  const [temporaryComparison, setTemporaryComparison] = useState('maior que');
  const sendNumericFilter = () => {
    setFilters((prevState) => ({
      ...prevState,
      filterByNumericValues: [
        ...prevState.filterByNumericValues,
        {
          column: temporaryColumn,
          comparison: temporaryComparison,
          value: temporaryValue,
        },
      ],
    }));
    setSelectOptions(selectOptions.filter((item) => item !== temporaryColumn));
    console.log(selectOptions.filter((item) => item !== temporaryColumn));
    setTemporaryValue('');
  };

  return (
    <form>
      Filtrar por valor/número:
      <select
        data-testid="column-filter"
        value={ temporaryColumn }
        name="column"
        onChange={ (e) => setTemporaryColumn(e.target.value) }
      >
        {selectOptions.map((selectCategory, index) => (
          <option key={ index } value={ selectCategory }>
            {selectCategory}
          </option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        value={ temporaryComparison }
        name="comparison"
        onChange={ (e) => setTemporaryComparison(e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ temporaryValue }
        name="value"
        placeholder="Digite um número"
        onChange={ (e) => setTemporaryValue(e.target.value) }
      />
      <button
        type="button"
        onClick={ sendNumericFilter }
        data-testid="button-filter"
      >
        Filtrar
      </button>
    </form>
  );
}
