import React, { useContext } from 'react';
import styled from 'styled-components';
import * as $Tokens from '../../$Tokens/Colors';
import { APIContext } from '../../services/context';

const Wrapper = styled.div``;

const Tabela = styled.table`
border: 1px solid  ${$Tokens.SKELETON_LIGHT};`;

const Header = styled.thead`
border-bottom: 1px solid ${$Tokens.SKELETON_MEDIUM};`;

export default function Table() {
  const { applyFilter, filters } = useContext(APIContext);
  const renderDataAfterNumericFilter = applyFilter();

  function sortData(dataTable) {
    const sortColumn = filters.order.column;
    const isString = !parseInt(dataTable[0][sortColumn], 10);
    const isAscending = filters.order.sort === 'ASC';
    const DECRESCENT = -1;
    const order = isAscending ? 1 : DECRESCENT;

    return dataTable.sort((a, b) => (isString
      ? (a[sortColumn].localeCompare(b[sortColumn]) * order)
      : (a[sortColumn] - b[sortColumn]) * order));
  }
  if (renderDataAfterNumericFilter.length > 0) {
    sortData(renderDataAfterNumericFilter);
  }

  const header = ['name', 'rotation_period', 'orbital_period', 'diameter',
    'climate', 'gravity', 'terrain',
    'surface_water', 'population', 'films', 'created', 'edited', 'url'];

  const headerOmmitName = header.filter((item) => item !== 'name');

  return (
    <Wrapper>
      <Tabela>
        <Header>
          <tr>
            {header.map((item, index) => <th key={ index }>{item}</th>)}
          </tr>
        </Header>
        <tbody>
          {renderDataAfterNumericFilter.map((array) => (
            <tr key={ array.name }>
              <td data-testid="planet-name">{array.name}</td>
              {headerOmmitName.map((item, index) => <td key={ index }>{array[item]}</td>)}
            </tr>
          ))}
        </tbody>
      </Tabela>
    </Wrapper>
  );
}
