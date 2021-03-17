import React, { useState, useEffect } from 'react';
import { useStateValue } from '../contexts/StateContext';

const Table = () => {
  const {
    data,
    filters: {
      filterByName: { name },
    },
  } = useStateValue();
  const [headers, setHeaders] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filters, setFilter] = useState([]);

  useEffect(() => {
    setFilter(
      data.filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase())),
    );
  }, [data, name]);
  useEffect(() => {
    if (data.length !== 0) {
      setHeaders(
        Object.keys(data[0]).filter((header) => header !== 'residents'),
      );
      setPlanets(filters);
    }
  }, [data, filters, name]);

  return (
    <table border="1">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={ index }>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {planets.map((planet, index) => (
          <tr key={ index }>
            {headers.map((header, hindex) => (
              <td key={ hindex }>{planet[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
