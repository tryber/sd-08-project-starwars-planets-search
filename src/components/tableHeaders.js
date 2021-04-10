import React, { useContext } from 'react';
import myContext from '../context/dataContext';

const removeResidentsField = (data) => Object
  .keys(data[0])
  .filter((head) => head !== 'residents');

const tableHeaderElement = (data) => (
  <thead>
    <tr>
      {removeResidentsField(data).map((field) => <th key={ field }>{field}</th>) }
    </tr>
  </thead>
);
const TableHeaders = () => {
  const { data } = useContext(myContext);
  return (
    (data[0]) ? tableHeaderElement(data) : <thead><tr><th>Espera</th></tr></thead>);
};

export default TableHeaders;
