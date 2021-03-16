import React, { useContext } from 'react';
import Context from '../context/Context';
import './Table.css';

const Table = () => {
  const { data, filters: { filterByName: { name } } } = useContext(Context);

  function renderRow(planet, index) {
    return (
      <tr key={ index }>
        {Object.values(planet).map((info, key) => (
          <td key={ key }>
            { Array.isArray(info) ? info.join('\n') : info.toString() }
          </td>
        ))}
      </tr>
    );
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            {Object.keys(data[0] || []).map((info, index) => (
              <th className="col" key={ index }>
                { info }
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          { data
            .filter((planet) => planet.name.includes(name))
            .map((planet, key) => renderRow(planet, key)) }
        </tbody>
      </table>
    </div>
  );
};

export default Table;
