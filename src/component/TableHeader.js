import React, { useContext } from 'react';
import createContext from '../contextApi/createContext';

function TableBody() {
  const { data } = useContext(createContext);

  data.forEach((element) => delete element.residents);
  const keys = Object.keys(data[0]);
  const estilo = { border: '1px solid black' };

  return (
    <tr>
      { keys.map((element, index) => (
        <th style={ estilo } key={ `${index}-planets` }>{ element }</th>
      )) }
    </tr>
  );
}

export default TableBody;
