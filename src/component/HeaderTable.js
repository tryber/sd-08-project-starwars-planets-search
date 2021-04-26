import React, { useContext } from 'react';
import Context from '../context';

function HeaderTable() {
  const { headers } = useContext(Context);
  return (
    <thead>
      <tr>
        {headers.map((header) => <th key={ header }>{ header }</th>)}
      </tr>
    </thead>
  );
}

export default HeaderTable;
