import React, { useContext } from 'react';
import styled from 'styled-components';
import { APIContext } from '../../services/context';
import * as $Tokens from '../../$Tokens/Colors';

const Form = styled.form``;

const InpuntName = styled.input`
border-radius: 8px;
background-color: ${$Tokens.INPUT_BACKGROUND};`;

export default function InputFilter() {
  const {
    filters,
    setFilters,
  } = useContext(APIContext);
  const { filterByName: { name } } = filters;

  const onChangeFiltersName = (e) => {
    setFilters({
      ...filters,
      filterByName: {
        name: e.target.value,
      },
    });
  };

  return (
    <Form>
      <InpuntName
        type="text"
        data-testid="name-filter"
        placeholder="Search by Name"
        value={ name }
        onChange={ onChangeFiltersName }
      />
    </Form>
  );
}
