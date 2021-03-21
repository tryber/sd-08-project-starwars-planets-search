import React, { useEffect, useContext } from 'react';
import DataContext from '../context/DataContext';

function ordenation(data, filters, column, sort) {
  const filterByText = () => data.filter(
    (row) => row.name.includes(filters.filterByName.name),
  );

  const sortNumbers = () => {
    if (sort === 'ASC') {
      return filterByText().sort((a, b) => a[column] - b[column]);
    }
    return filterByText().sort((a, b) => b[column] - a[column]);
  };

  // ajuda de https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare e
  // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value?page=1&tab=votes#tab-top
  const sortStrings = () => {
    if (sort === 'ASC') {
      return filterByText().sort((a, b) => a[column].localeCompare(b[column]));
    }
    return filterByText().sort((a, b) => b[column].localeCompare(a[column]));
  };

  const applyOrder = () => {
    if (column === 'name') {
      return sortStrings();
    }
    return sortNumbers();
  };

  return applyOrder();
}

function Table() {
  const { data,
    isLoading,
    filters,
    order } = useContext(DataContext);

  useEffect(() => {
  }, [isLoading]);

  // criar uma função para sort aqui com os parâmetros do context

  ordenation(data, filters);

  let updatedFilter = ordenation(data, filters, order.column, order.sort);

  // let updatedFilter = filterByText().sort((a, b) => a.name.localeCompare(b.name));
  // console.log(updatedFilter);

  const filterList = filters.filterByNumericValues;
  // console.log(filterList);

  filterList.forEach((objectToFilter) => {
    const { column, comparison, value } = objectToFilter;
    if (value && comparison === 'maior que') {
      // console.log({ column, comparison, value });
      updatedFilter = updatedFilter.filter(
        (row) => (parseInt(row[column], 10) > parseInt(value, 10)),
      );
      // console.log('if1');
    } else if (value && comparison === 'menor que') {
      // console.log({ column, comparison, value });
      updatedFilter = updatedFilter.filter(
        (row) => (parseInt(row[column], 10) < parseInt(value, 10)),
      );
      // console.log('if2');
    } else if (value) {
      // console.log({ column, comparison, value });
      updatedFilter = updatedFilter.filter(
        (row) => (parseInt(row[column], 10) === parseInt(value, 10)),
      );
      // console.log('if2');
    }
  });

  // const filterByNumber = () => {

  // };

  function renderCells(row, field) {
    const planetsList = updatedFilter.map((planet) => planet.name);
    const isPlanetCell = planetsList.some((planet) => planet === row[field]);
    if (isPlanetCell === true) {
      return (
        <td
          data-testid="planet-name"
          key={ row[field] }
          title={ row[field] }
        >
          {row[field]}
        </td>
      );
    }
    return (
      <td key={ row[field] } title={ row[field] }>{row[field]}</td>
    );
  }

  if (!isLoading && data.length !== 0) {
    // console.log(data[0]);
    const fields = Object.keys(data[0]);
    // console.log(fields);
    const fieldsFiltered = fields.filter(
      (field) => (
        field !== 'residents'
        && field !== 'films'
        && field !== 'url'
        && field !== 'created'
        && field !== 'edited'),
    );
    // console.log(fieldsFiltered);
    return (
      <section className="section">
        {/* {productsFromMLB.map(
          (product) => (<ProductCard exemploProps={ product } key={ product.id } />),
        )} */}
        <table className="table">
          <thead>
            <tr>
              {fieldsFiltered.map(
                (field) => (<th key={ field } title={ field }>{field}</th>),
              )}
              <th>teste</th>
              <th>teste</th>
              <th>teste</th>
              <th>teste</th>
            </tr>
          </thead>
          <tbody>
            {updatedFilter
              .map(
                (row) => (
                  <tr key={ row.name } title={ row.name }>
                    {fieldsFiltered.map(
                      (field) => (
                        renderCells(row, field)
                        // <td key={ row[field] } title={ row[field] }>{row[field]}</td>
                      ),
                    )}
                  </tr>),
              )}
          </tbody>
        </table>
      </section>
    );
  }
  return (
    <div>Loadding...</div>
  );
}
export default Table;
