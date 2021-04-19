import React from 'react';
import TableData from './TableData';
import Filters from './Filters';
import SelectFilters from './SelectFilters';

export default function Table() {
  return (
    <main>
      <TableData />
      <Filters />
      <SelectFilters />
    </main>
  );
}
