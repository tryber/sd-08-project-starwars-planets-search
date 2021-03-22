import React, { useContext } from 'react';
import createContext from '../contextApi/createContext';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Loading from './Loading';
import Filters from './Filters';

function Table() {
  const { data } = useContext(createContext);
  const estilo = { border: '1px solid black' };

  if (data.length !== 0) {
    return (
      <div>
        <Filters />
        <table style={ estilo }>
          <thead>
            <TableHeader />
          </thead>
          <tbody>
            <TableBody />
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <Loading />
  );
}

export default Table;
