import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import fetchPlanets from '../services/getPlanets';

const filterPlanets = {
  filterByName: {
    name: '',
  },
  order: {
    column: 'name',
    sort: 'ASC',
  },
};

const arrOptions = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

const NEGATIVE = -1;
const POSITIVE = 1;

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [selectColumns, setSelectColumns] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState(filterPlanets);
  const [numFilter, setNumFilter] = useState([]);

  function sortBy(arr, column, sort) {
    return arr.sort((a, b) => {
      switch (sort) {
      case 'ASC':
        if (parseFloat(a[column]) < parseFloat(b[column])) return NEGATIVE;
        if (parseFloat(a[column]) > parseFloat(b[column])) return POSITIVE;
        break;
      case 'DSC':
        if (parseFloat(a[column]) < parseFloat(b[column])) return POSITIVE;
        if (parseFloat(a[column]) > parseFloat(b[column])) return NEGATIVE;
        break;
      default:
        return 0;
      }
      return 0;
    });
  }

  useEffect(() => {
    const getPlanets = async () => {
      const starWarsPlanets = await fetchPlanets();
      starWarsPlanets.sort((a, b) => {
        if (a.name < b.name) {
          return NEGATIVE;
        }
        if (a.name > b.name) {
          return POSITIVE;
        }
        return 0;
      });
      setData(starWarsPlanets);
      setIsLoading(true);
    };
    getPlanets();
  }, []);

  useEffect(() => {
    const { filterByName: { name } } = filters;
    const filtered = data.filter((item) => item.name.includes(name));
    setPlanets(filtered);
    if (selectColumns === undefined) {
      setSelectColumns(arrOptions);
    }
  }, [data, filters, selectColumns]);

  useEffect(() => {
    // const { }
    let arrOfPlanets = [...data];
    numFilter.forEach(({ comparison, column, value }) => {
      if (comparison === 'igual a') {
        arrOfPlanets = data.filter((item) => +item[column] === +value);
      } if (comparison === 'maior que') {
        arrOfPlanets = data.filter((item) => +item[column] > +value);
      } if (comparison === 'menor que') {
        arrOfPlanets = data.filter((item) => +item[column] < +value);
      }
    });
    const { column, sort } = filters.order;

    // console.log(column, sort);

    const sortered = sortBy(arrOfPlanets, column, sort);
    // console.log(sortered);
    setPlanets(sortered);
  },
  [data, filters.order, numFilter, selectColumns]);

  const value = {
    data,
    planets,
    isLoading,
    filters,
    setFilters,
    setNumFilter,
    numFilter,
    selectColumns,
    setSelectColumns,
  };

  return (
    <PlanetContext.Provider value={ value }>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
