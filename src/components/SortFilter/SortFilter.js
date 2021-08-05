import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import * as $Tokens from '../../$Tokens/Colors';
import { APIContext } from '../../services/context';

const InputRadio = styled.input`
margin-left: 5px;
`;

const Label = styled.label``;

const Dropdown = styled.select`
border-radius: 8px;
background-color: ${$Tokens.INPUT_BACKGROUND};
cursor: pointer;
margin-left: 5px;
margin-right: 5px;
`;

const SorterButton = styled.button`
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

// import { Container } from './styles';
function SortFilter() {
  const {
    filters, setFilters } = useContext(APIContext);
  const [filterOrder, setFilterOrder] = useState({
    column: 'name',
    sort: 'ASC',
  });
  const { column, sort } = filterOrder;

  const columns = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'terrain',
    'surface_water',
    'population',
  ];

  const onChangeOrderFilter = ({ target }) => {
    setFilterOrder({
      ...filterOrder,
      [target.name]: target.value,
    });
  };

  const handleBtnSort = () => {
    setFilters({
      ...filters,
      order: {
        column,
        sort,
      },
    });
  };

  return (
    <>
      <Dropdown
        value={ column }
        name="column"
        onChange={ onChangeOrderFilter }
        data-testid="column-sort"
      >
        {columns.map((columnOption) => (
          <option key={ columnOption }>{columnOption}</option>
        ))}
      </Dropdown>
      <span>
        <Label htmlFor="ASC">
          Ascendent
          <InputRadio
            type="radio"
            data-testid="column-sort-input-asc"
            value="ASC"
            id="ASC"
            name="sort"
            onChange={ onChangeOrderFilter }
          />
        </Label>
        <Label htmlFor="DESC">
          Descendent
          <InputRadio
            type="radio"
            data-testid="column-sort-input-desc"
            value="DESC"
            id="DESC"
            onChange={ onChangeOrderFilter }
            name="sort"
          />
        </Label>
      </span>
      <SorterButton
        data-testid="column-sort-button"
        onClick={ handleBtnSort }
        type="submit"
      >
        Sort
      </SorterButton>
    </>
  );
}

export default SortFilter;
