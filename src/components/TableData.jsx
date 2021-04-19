import React, { useContext, useState, useEffect, useCallback } from 'react';
import Context from '../context/Context';

export default function TableData() {
  const { data, filters } = useContext(Context);
  const [tableContent, setTableContent] = useState([]);

  function renderTableHeader() {
    const columns = Object.keys(data[0]);
    return columns.map((item) => (
      <th key={ item } title={ item.charAt(0).toUpperCase() + item.slice(1) }>
        {item.charAt(0).toUpperCase() + item.slice(1).replace('_', ' ')}
      </th>
    ));
  }

  const filteredPlanets = useCallback(() => {
    const planetsAfterNameFilter = (planetData) => {
      const {
        filterByName: { name },
      } = filters;
      const nameFilter = planetData
        .filter((item) => item.name.toLowerCase()
          .includes(name.toLowerCase()));
      return nameFilter;
    };
    const planetsAfterNumericFilter = () => {
      const { filterByNumericValues } = filters;
      if (filterByNumericValues.length) {
        const numericFilteredPlanets = filterByNumericValues.map((item) => {
          if (item.comparison === 'maior que') {
            return planetsAfterNameFilter(data).filter(
              (planet) => planet[item.column] > parseInt(item.value, 10),
            );
          }
          if (item.comparison === 'menor que') {
            return planetsAfterNameFilter(data).filter(
              (planet) => planet[item.column] < parseInt(item.value, 10),
            );
          }
          if (item.comparison === 'igual a') {
            return planetsAfterNameFilter(data).filter(
              (planet) => planet[item.column] === item.value,
            );
          }
          return planetsAfterNameFilter(data);
        });
        return numericFilteredPlanets[0];
      }
      return planetsAfterNameFilter(data);
    };

    const planetsAfterOrderFilter = () => {
      if (filters.order.sort === 'ASC') {
        return planetsAfterNumericFilter()
          .sort((a, b) => a[filters.order.column].localeCompare(b[filters.order.column]));
      }
      return planetsAfterNumericFilter()
        .sort((a, b) => b[filters.order.column].localeCompare(a[filters.order.column]));
    };

    setTableContent(planetsAfterOrderFilter());
  }, [data, filters]);

  function isLoading() {
    return <td>Carregando...</td>;
  }

  useEffect(() => {
    if (data) filteredPlanets();
  }, [data, filteredPlanets]);

  function renderTableContent() {
    const columns = Object.keys(data[0]);

    return (
      <>
        {tableContent.map((row, indexRow) => (
          <tr key={ indexRow }>
            {columns.map((item, indexCell) => {
              if (indexCell === 0) {
                return (
                  <td
                    key={ row[item] }
                    data-testid="planet-name"
                    style={ {
                      border: '1px solid black',
                      textAlign: 'center',
                      fontStyle: 'italic',
                      padding: '10px',
                    } }
                  >
                    {row[item]}
                  </td>
                );
              }
              return (
                <td
                  key={ row[item] }
                  style={ {
                    border: '1px solid black',
                    textAlign: 'center',
                    fontStyle: 'italic',
                    padding: '10px',
                  } }
                >
                  {row[item]}
                </td>
              );
            })}
          </tr>
        ))}
      </>
    );
  }

  return (
    <table>
      <thead>
        <tr>{data[0] ? renderTableHeader() : isLoading()}</tr>
      </thead>
      <tbody>{data[0] ? renderTableContent() : null}</tbody>
    </table>
  );
}
