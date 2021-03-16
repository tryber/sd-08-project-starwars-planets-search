import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import FilterContext from '../context/FilterContext';

function Table() {
  const { data } = useContext(PlanetsContext);
  const { filters } = useContext(FilterContext);
  const [dataToBeRendered, setDataToBeRendered] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);

  useEffect(() => {
    if (data.length !== 0) {
      setDataToBeRendered(data.map((result) => {
        delete result.residents;
        return result;
      }));
    }
  }, [data]);

  const sort = (arr, column, order) => (
    arr.sort((a, b) => {
      if (order === 'ASC') {
        return parseFloat(a[column]) - parseFloat(b[column])
          || a[column].localeCompare(b[column]);
      }
      return parseFloat(b[column]) - parseFloat(a[column])
        || b[column].localeCompare(a[column]);
    })
  );

  useEffect(() => {
    if (dataToBeRendered.length !== 0 && tableHeaders.length === 0) {
      setTableHeaders(Object.keys(dataToBeRendered[0]));
      const { order } = filters;
      setDataToBeRendered(sort(dataToBeRendered, order.column, order.sort));
    }
  }, [dataToBeRendered]);

  const filterName = (name) => (
    [...data].filter((row) => row.name.includes(name))
  );

  const filterNumericValues = (arr, column, comparison, value) => (
    arr.filter((row) => {
      switch (comparison) {
      case 'maior que':
        return parseFloat(row[column]) > value;
      case 'menor que':
        return parseFloat(row[column]) < value;
      case 'igual a':
        return parseFloat(row[column]) === value;
      default:
        return true;
      }
    })
  );

  useEffect(() => {
    const filteredByName = filterName(filters.filterByName.name);
    const filteredByNameAndNumeric = filters.filterByNumericValues
      .reduce((acc, { column, comparison, value }) => (
        filterNumericValues(acc, column, comparison, parseFloat(value))
      ), filteredByName);
    const { order } = filters;
    const sortedAndFiltered = sort(filteredByNameAndNumeric, order.column, order.sort);
    setDataToBeRendered(sortedAndFiltered);
  }, [filters]);

  return (
    <table>
      <thead>
        <tr>
          { tableHeaders.map((header) => <th key={ header }>{ header }</th>) }
        </tr>
      </thead>
      <tbody>
        { dataToBeRendered.map((row) => (
          <tr key={ row.name }>
            { tableHeaders.map((objKey, index) => (
              <td
                key={ row.name + index }
                data-testid={ objKey === 'name' && 'planet-name' }
              >
                { row[objKey] }
              </td>
            ))}
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default Table;
