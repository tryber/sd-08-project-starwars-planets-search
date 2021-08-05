import React, { useContext } from 'react';
import styled from 'styled-components';
import { APIContext } from '../../services/context';
import * as $Tokens from '../../$Tokens/Colors';

const Label = styled.label`
  h3 {
  color: ${$Tokens.TEXT_MEDIUM};
}`;

const Forms = styled.form`
  border: 1px solid ${$Tokens.SKELETON_MEDIUM};
  li {
  color: ${$Tokens.TEXT_ACTIVE};
  display: flex;
  width: 210px;

  &:hover {
    background-color: ${$Tokens.SKELETON_MEDIUM};
  } 
}`;

const CloseButton = styled.button`
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

const ActiveFilters = () => {
  const { onClickRemoveFilter, filters } = useContext(APIContext);
  return (
    <Label htmlFor="active-filters">
      <Forms>
        <h3>Active Filters</h3>
        <ul>
          { filters.filterByNumericValues.length > 0
              && filters.filterByNumericValues.map((filter) => (
                <li data-testid="filter" key={ filter.column }>
                  { `${filter.column} ${filter.comparison} ${filter.value} ` }
                  <CloseButton
                    type="button"
                    id={ filter.column }
                    onClick={ (event) => onClickRemoveFilter(event.target.id) }
                  >
                    x
                  </CloseButton>
                </li>))}
        </ul>
      </Forms>

    </Label>
  );
};

export default ActiveFilters;
