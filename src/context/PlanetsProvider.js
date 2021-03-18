import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import getPlanetsAPI from '../services/StarwarsAPI';

const ORDER_MENOS_UM = -1;
function PlanetsProvider({ children }) {
  const initialFilteres = {
    columnValues: [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ],
    columnValuesInitial: [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ],
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  };
  const dataInitial = { dataFiltered: [] };
  const [data, setData] = useState(dataInitial);
  const [isFetching, setIsFetching] = useState(true);
  const [filters, setFilters] = useState(initialFilteres);

  async function fetchData() {
    const { results } = await getPlanetsAPI();
    const resultsOrder = results.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return ORDER_MENOS_UM;
      }
      return 0;
    });
    setData({ dataFromAPI: resultsOrder, dataFiltered: resultsOrder });
    setIsFetching(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData((d) => {
      if (d !== undefined && d.dataFiltered.length > 0) {
        const dataFiltered = d.dataFromAPI
          .filter((element) => element.name.toLowerCase()
            .includes(filters.filterByName.name.toLowerCase()));
        return { ...d, dataFiltered };
      }
    });
  }, [filters.filterByName.name]);

  useEffect(() => {
    function funcFilter(filtro, d) {
      const { column, comparison, value } = filtro;
      const dataFiltered = d.dataFromAPI.filter((element) => {
        if (comparison === 'maior que') {
          return Number(element[column]) > value;
        }
        if (comparison === 'menor que') {
          return Number(element[column]) < value;
        }
        return Number(element[column]) === Number(value);
      });
      return dataFiltered;
    }
    setData((d) => {
      let dataFiltered = [];
      if (d !== undefined && d.dataFiltered && d.dataFiltered.length > 0) {
        if (filters.filterByNumericValues.length === 0) {
          return { ...d, dataFiltered: d.dataFromAPI };
        }
        filters.filterByNumericValues.map((filtro) => {
          dataFiltered = funcFilter(filtro, d);
          return true;
        });
      }
      return { ...d, dataFiltered };
    });
  }, [filters.filterByNumericValues]);

  useEffect(() => {
    function orderAsc(d) {
      if (d.dataFromAPI && Number.isNaN(Number(d.dataFromAPI[0][filters.order.column]))) {
        const dataOrdered = d.dataFiltered.sort((a, b) => a[filters.order.column]
          .localeCompare(b[filters.order.column]));
        return dataOrdered;
      }
      const dataOrdered = d.dataFiltered
        .sort((a, b) => a[filters.order.column] - b[filters.order.column]);
      return dataOrdered;
    }

    function orderDesc(d) {
      if (d.dataFromAPI && Number.isNaN(Number(d.dataFromAPI[0][filters.order.column]))) {
        const dataOrdered = d.dataFiltered
          .sort((a, b) => b[filters.order.column].localeCompare(a[filters.order.column]));
        return dataOrdered;
      }
      const dataOrdered = d.dataFiltered
        .sort((a, b) => b[filters.order.column] - a[filters.order.column]);
      return dataOrdered;
    }

    setData((d) => {
      let dataOrdered = [];
      if (filters.order.sort === 'ASC') {
        dataOrdered = orderAsc(d);
      }
      if (filters.order.sort === 'DESC') {
        dataOrdered = orderDesc(d);
      }
      return { ...d, dataFiltered: dataOrdered };
    });
  }, [filters.order]);

  return (
    <PlanetsContext.Provider
      value={
        { data, isFetching, setData, setIsFetching, filters, setFilters }
      }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
