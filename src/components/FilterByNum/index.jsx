import React, { useContext } from 'react';
import { StarWarsContext } from '../../context/StarWarsProvider';

const FilterByNum = () => {
  const { filterFuncs, filters, options } = useContext(StarWarsContext);
  const { filterByNum } = filterFuncs;
  const { filterByNumericValues } = filters;

  const handleChange = ({ target }) => {
    const { id, value } = target;
    switch (id) {
    case 'order-by':
      return filterByNum(Object.assign(...filterByNumericValues, { column: value }));
    case 'greater-less':
      return filterByNum(Object.assign(...filterByNumericValues, { comparasion: value }));
    case 'number-value':
      return filterByNum(Object.assign(...filterByNumericValues, { value }));
    default:
      return null;
    }
  };

  return (
    <>
      <select
        id="order-by"
        data-testid="column-filter"
        onChange={ (e) => handleChange(e) }
        value={ filterByNumericValues.column }
      >
        { options.map((option) => (
          <option key={ option } value={ option }>{option}</option>
        ))}
      </select>
      <select
        id="greater-less"
        data-testid="comparison-filter"
        onChange={ (e) => handleChange(e) }
        value={ filterByNumericValues.comparasion }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        id="number-value"
        data-testid="value-filter"
        type="number"
        value={ filterByNumericValues.value }
        onChange={ (e) => handleChange(e) }
      />
    </>
  );
};

export default FilterByNum;
