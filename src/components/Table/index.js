import React, { useContext } from 'react';
import StarWarsContext from '../../provider/StarWarsContext';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Filter from '../../hooks/Filter';

function Table() {
  const { isLoading, data } = useContext(StarWarsContext);
  const [planets] = Filter();

  if (isLoading) return <h1>Loading</h1>;

  const headerTable = () => Object.keys(data[0]);

  return (
    <main>
      <table>
        <TableHeader nameColumn={ headerTable() } />
        <TableBody contentRow={ planets } />
      </table>
    </main>
  );
}

export default Table;
