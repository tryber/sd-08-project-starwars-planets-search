import React, { useContext, useEffect } from 'react';
import planetsContext from '../Hooks/planetsContext';

function Table() {
  const {
    data,
    isFetching,
    shouldFilter,
    setShouldFilter,
    filteredData,
    setFilteredData,
    setFilterByName,
    filterByName,
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues: [
        {
          column,
          comparison,
          value,
        },
      ],
    },
  } = useContext(planetsContext);

  let tableHeaders = [];
  if (data[0]) {
    tableHeaders = Object.keys(data[0]);
  }

  data.forEach((obj) => delete obj.residents);

  useEffect(() => {
    setFilteredData(data.filter((obj) => obj.name.includes(name)));
  }, [data, setFilteredData, name]);

  useEffect(() => {
    if (shouldFilter) {
      let newData;
      if (comparison === 'maior que') {
        newData = filteredData
          .filter((obj) => parseInt(obj[column], 10) > parseInt(value, 10));
        setFilteredData(newData);
      } else if (comparison === 'menor que') {
        newData = filteredData
          .filter((obj) => parseInt(obj[column], 10) < parseInt(value, 10));
        setFilteredData(newData);
      } else if (comparison === 'igual a') {
        newData = filteredData
          .filter((obj) => parseInt(obj[column], 10) === parseInt(value, 10));
        setFilteredData(newData);
      }
      setShouldFilter(false);
    } else if (filterByName) {
      setFilteredData(data.filter((obj) => obj.name.includes(name)));
      setFilterByName(false);
    }
  });

  function renderTbody() {
    return (
      <tbody>
        {filteredData.map((obj) => (
          <tr key={ obj.name }>
            {Object.entries(obj)
              .map((values, index) => <td key={ `${obj.name}${index}` }>{values[1]}</td>)}
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <table className="table">
      <thead>
        <tr>
          {!isFetching
            ? tableHeaders
              .map((header) => <th key={ header } scope="col">{header}</th>)
            : <th>Carregando...</th>}
        </tr>
      </thead>
      {!isFetching ? renderTbody() : <tbody><tr><th>Carregando...</th></tr></tbody>}
    </table>
  );
}

export default Table;
