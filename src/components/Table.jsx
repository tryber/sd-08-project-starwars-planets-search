import React, { useContext } from 'react';

import Filters from './sub-comps/Filters';
import TableHeader from './sub-comps/TableHeader';
import TableData from './sub-comps/TableData';
import SWContext from '../context/SWContext';

const Table = () => {
  const context = useContext(SWContext);
  const { filteredPlanets } = context;
  return (
    <>
      <Filters />
      <table>
        <TableHeader />
        <TableData results={ filteredPlanets } />
      </table>
    </>
  );
};

export default Table;
