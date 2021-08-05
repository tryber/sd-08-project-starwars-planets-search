import React from 'react';
import styled from 'styled-components';
import Table from './components/Table/Table';
import FilterByName from './components/FilterByName/FilterByName';
import NumericFilter from './components/NumericFilter/NumericFilter';
import ProviderAPI from './services/context';
import SortFilter from './components/SortFilter/SortFilter';
import ActiveFilters from './components/ActiveFilters/ActiveFilters';
import * as $Tokens from './$Tokens/Colors';

const Wrapper = styled.div`
font-family: cursive;
`;

const Separator = styled.div`
background-color: ${$Tokens.SEPARATOR_DARK};
`;
function App() {
  return (
    <Wrapper>
      <ProviderAPI>
        <FilterByName />
        <NumericFilter />
        <SortFilter />
        <Separator>
          <ActiveFilters />
        </Separator>
        <Table />
      </ProviderAPI>
    </Wrapper>
  );
}

export default App;
