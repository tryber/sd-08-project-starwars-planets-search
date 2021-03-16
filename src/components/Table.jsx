import React, { useContext } from 'react';
import AppContext from '../utils/AppContext';

const Table = () => {
  const { data, filters } = useContext(AppContext);
  const { name } = filters.filterByName;
  const headList = Object.keys(data[0]);
  return (
    <table>
      <thead>
        <tr>
          { headList.map((title) => <th key={ title }>{ title }</th>)}
        </tr>
      </thead>
      <tbody>
        { data
          .filter((planet) => planet.name.includes(name))
          .map((row) => (
            <tr key={ row.name }>
              { Object.values(row).map((value) => <td key={ value }>{ value }</td>)}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
