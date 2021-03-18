import React from 'react';

import TableHead from './TableHead';
import TableBody from './TableBody';
import Filters from './Filters';

function Table() {
  return (
    <>
      <Filters />
      <table border="1">
        <TableHead />
        <tbody>
          <TableBody />
        </tbody>
      </table>
    </>
  );
}

export default Table;
