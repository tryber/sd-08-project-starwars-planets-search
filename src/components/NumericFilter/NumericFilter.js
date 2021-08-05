import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { APIContext } from '../../services/context';
import * as $Tokens from '../../$Tokens/Colors';

const NumericInput = styled.input`
border-radius: 8px;
background-color: ${$Tokens.INPUT_BACKGROUND};
margin-left: 5px;
`;

const FilterButton = styled.button`
border-radius: 8px;
border: 1px solid ${$Tokens.BUTTON_GHOST_BORDER};
background-color: ${$Tokens.BUTTON_TERTIARY_VARIANT_BACKGROUND};
color: ${$Tokens.TEXT_DARK};
margin-left: 4px;
cursor: pointer;

&:hover {
  background: ${$Tokens.BUTTON_TERTIARY_HOVER_BACKGROUND}
}
`;

const Dropdown = styled.select`
border-radius: 8px;
background-color: ${$Tokens.INPUT_BACKGROUND};
margin-left: 5px;
cursor: pointer;
`;

const DropdownItem = styled.option`
color: ${$Tokens.TEXT_LIGHT};
cursor: pointer;
`;

export default function FilterNumeric() {
  const {
    filters,
    setFilters,
    columns,
  } = useContext(APIContext);

  const [filterValues, setFilterValues] = useState({});
  const comparisons = ['maior que', 'menor que', 'igual a'];
  const { filterByNumericValues } = filters;
  const { column, comparison, value } = filterValues;

  useEffect(() => {
    setFilterValues({
      column: columns[0],
      comparison: 'maior que',
      value: '0',
    });
  }, [columns]);

  const onChangeNumericFilter = ({ target }) => {
    setFilterValues({
      ...filterValues,
      [target.name]: target.value });
  };

  const handleBtnFilter = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [...filterByNumericValues, filterValues],
    });
  };
  return (
    <form>
      <Dropdown
        value={ column }
        name="column"
        onChange={ onChangeNumericFilter }
        data-testid="column-filter"
      >
        {columns.map((columnOption) => (
          <DropdownItem key={ columnOption }>{columnOption}</DropdownItem>
        ))}
      </Dropdown>
      <Dropdown
        value={ comparison }
        name="comparison"
        onChange={ onChangeNumericFilter }
        data-testid="comparison-filter"
      >
        {comparisons.map((comparisonOption) => (
          <DropdownItem key={ comparisonOption }>{comparisonOption}</DropdownItem>
        ))}
      </Dropdown>
      <NumericInput
        type="number"
        value={ value }
        name="value"
        data-testid="value-filter"
        placeholder="0"
        onChange={ onChangeNumericFilter }
      />
      <FilterButton type="button" data-testid="button-filter" onClick={ handleBtnFilter }>
        Filter
      </FilterButton>
    </form>
  );
}
