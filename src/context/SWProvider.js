import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';
import FetchStarWars from '../helpers/API';

export default function SWProvider({ children }) {
  const GO_BACK = -1;
  const STAY = 1;
  const [filterByName, setFilterByName] = useState('');
  const [filter, setFilter] = useState({
    filters: { filterByName: { name: '' },
      filterByNumericValues: [],
      order: { column: 'name', sort: 'ASC' } } });
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterNumber, setFilterNumber] = useState('');
  const [SWData, setSWData] = useState([]);
  const [FSWData, setFSWData] = useState([]);
  const [sortOrder, setSortOrder] = useState('ASC');
  const [sortColumn, setSortColumn] = useState('name');
  // const inputName = (e) => {
  //   getFilterByName(e.target.value);
  //   Filter();
  // }
  // 
  // pagina: Page
  // <div>
  //       <Header MakeFilter={makeFilter} /> 
  //       <Table FSWdata={FSWData} />
  // </div>
  // fazer todo o processamento de filtragem

  const ComparisonFunction = (column, comparison, value) => {
    value = parseInt(value, 10);
    column = parseInt(column, 10);
    // console.log(`  ${value} ${comparison} ${column} result ${value < column}`);
    switch (comparison) {  
    case 'maior que':
      // console.log(column > value);
      return value < column;
    case 'menor que':
      // console.log(value < column);
      return value > column;
    case 'igual a':
      // console.log(column === value);
      return column === value;
    default:
      console.log(`erro na função ${comparison}`);
    }
  };

  const sortData = (data, resultFilter) => {
    data.sort((A, B) => {
      let planetaA = 0;
      let planetaB = 0;
      // eslint-disable-next-line no-restricted-globals
      if (parseInt(A[resultFilter.filters.order.column][0], 10)) {
        planetaA = parseInt(A[resultFilter.filters.order.column], 10);
        planetaB = parseInt(B[resultFilter.filters.order.column], 10);
      } else {
        planetaA = A[resultFilter.filters.order.column];
        planetaB = B[resultFilter.filters.order.column];
      }
      if (resultFilter.filters.order.sort === 'ASC') {
        // console.log(` ${planetaA} > ${planetaB} `);
        if (planetaA > planetaB) {
          return STAY;
        } return GO_BACK;
      }
      // console.log(` ${planetaA} < ${planetaB} `);
      if (planetaA < planetaB) {
        return STAY;
      } return GO_BACK;
    });
    return data;
  };

  const UseFilter = () => {
    let data = [...SWData];
    const resultFilter = { ...filter };
    if (resultFilter.filters.filterByName !== '') {
      const regex = new RegExp(resultFilter.filters.filterByName.name);
      data = data.filter((planet) => regex.test(planet.name));
    }
    if (resultFilter.filters.filterByNumericValues.length > 0) {
      let result = '';
      data = data.filter((planet) => {
        result = resultFilter.filters.filterByNumericValues.map(
          (question) => (ComparisonFunction(
            planet[question.column], question.comparison, question.value,
          )),
        );
        return result.every((e) => e);
      });
    }
    data = sortData(data, resultFilter);
    setFilterColumn('');
    setFSWData(data);
  };

  const MakeFilter = () => {
    console.log('makeFilter');
    const resultFilter = { ...filter };
    if (filterByName !== '' || filter.filters.filterByName.name !== '') {
      resultFilter.filters.filterByName.name = filterByName;
    }
    if (filterNumber !== '' && filterColumn !== '') {
      resultFilter.filters.filterByNumericValues = [
        ...resultFilter.filters.filterByNumericValues,
        { column: filterColumn,
          comparison: filterComparison,
          value: filterNumber }];
    }
    if (sortColumn !== '' && sortOrder !== '') {
      resultFilter.filters.order = {
        column: sortColumn,
        sort: sortOrder,
      };
    }
    if (resultFilter !== filter) {
      console.log('setFilter');
      setFilterColumn('');
      setSortColumn('');
      setFilter(resultFilter);
      ///// fim da função MakeFilter ()
      //// inicop da função UseFilter();
      let data = [...SWData];
      // const resultFilter = { ...filter };
      if (resultFilter.filters.filterByName !== '') {
        const regex = new RegExp(resultFilter.filters.filterByName.name);
        data = data.filter((planet) => regex.test(planet.name));
      }
      if (resultFilter.filters.filterByNumericValues.length > 0) {
        let result = '';
        data = data.filter((planet) => {
          result = resultFilter.filters.filterByNumericValues.map(
            (question) => (ComparisonFunction(
              planet[question.column], question.comparison, question.value,
            )),
          );
          return result.every((e) => e);
        });
      }
      data = sortData(data, resultFilter);
      setFilterColumn('');
      setFSWData(data);
    }
  };

  const fetchData = async () => {
    const data = await FetchStarWars();
    data.sort((A, B) => {
      if (A.name > B.name) {
        return 1;
      }
      return (GO_BACK);
    });
    setSWData(data);
    setFSWData(data);
    // MakeFilter();
    // return data;
  };

  useEffect(() => {
     
       fetchData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log('Filtro mudou');
    UseFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const deleteFilter = (e) => {
    let result = filter.filters.filterByNumericValues.filter((_, index) => (index !== e));
    // console.log(`${index}  ${e}  ${index !== e}`);
    result = { filters:
      { filterByName: filter.filters.filterByName,
        filterByNumericValues: result,
        order: filter.filters.order } };
    setFilter(result);
    // MakeFilter();
  };

  useEffect(() => {
    MakeFilter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByName]);

  const context = {
    filterByName,
    setFilterByName,
    filter,
    MakeFilter,
    setFilterComparison,
    setFilterColumn,
    setFilterNumber,
    FSWData,
    fetchData,
    deleteFilter,
    setSortOrder,
    setSortColumn,
  };

  return (
    <SWContext.Provider value={ context }>
      {children}
    </SWContext.Provider>
  );
}

SWProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
