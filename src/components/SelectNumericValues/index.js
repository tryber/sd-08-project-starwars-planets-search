import React, { useCallback, useContext, useEffect, useState } from 'react';
import StarWarsContext from '../../provider/StarWarsContext';
import SelectColumnFilter from './SelectColumnFilter';
import SelectorComparison from './SelectComparison';
import InputValue from './InputValue';
import ButtonFilter from './ButtonFilter';

const COLUMN_FILTER = [
  'population', 'orbital_period',
  'diameter', 'rotation_period',
  'surface_water',
];
const ARR_COMPARISON = ['maior que', 'menor que', 'igual a'];

function SelectNumericValues() {
  const {
    addFilterByNumeric,
    filters: { filterByNumericValues },
  } = useContext(StarWarsContext);

  const [filterNumeric, setFilterNumeric] = useState({
    column: COLUMN_FILTER[0],
    comparison: ARR_COMPARISON[0],
    value: '0',
  });
  const [message, setMessage] = useState(false);
  const [typeColumn, setTypeColumn] = useState(COLUMN_FILTER);

  const handleChange = ({ target: { name, value } }) => {
    setFilterNumeric({ ...filterNumeric, [name]: value });
  };

  const changeColumnFilter = useCallback(() => {
    if (filterByNumericValues.length === 0) return COLUMN_FILTER;
    const results = COLUMN_FILTER.filter((item) => {
      if (filterByNumericValues.every((el) => el.column !== item)) {
        return item;
      }
      return '';
    });
    if (!results.length) return ['---'];
    return results;
  }, [filterByNumericValues]);

  useEffect(() => {
    setTypeColumn(changeColumnFilter());
  }, [changeColumnFilter]);

  useEffect(() => {
    setFilterNumeric({
      column: typeColumn[0],
      comparison: ARR_COMPARISON[0],
      value: '0',
    });
  }, [filterByNumericValues, typeColumn]);

  const onClickAddFilterNumeric = () => {
    if (filterNumeric.column && filterNumeric.comparison) {
      // resetForm();
      addFilterByNumeric(filterNumeric);
      setMessage(false);
    } else {
      setMessage(true);
    }
  };

  return (
    <form onSubmit={ (e) => e.preventDefault() }>
      <SelectColumnFilter
        column={ filterNumeric.column }
        handleChange={ handleChange }
        columnFilter={ typeColumn }
      />
      <SelectorComparison
        comparison={ filterNumeric.comparison }
        handleChange={ handleChange }
        arrComparison={ ARR_COMPARISON }
      />
      <InputValue
        numberValue={ filterNumeric.value }
        handleChange={ handleChange }
      />
      <ButtonFilter onClickAddFilterNumeric={ onClickAddFilterNumeric } />
      { message && <span>Selecione todas as opções</span>}
    </form>
  );
}

export default SelectNumericValues;
