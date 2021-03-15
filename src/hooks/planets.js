import React,
{
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import api from '../services/api';

const FILTER_STRUCTURE = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
  order: {
    column: 'name',
    sort: 'ASC',
  },
};

const AVAILABLE_FILTERS = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

const orderPlanets = (planets, orderColumn, orderMethod) => {
  const orderedPlanets = [...planets];
  const INVERTED = -1;
  const isNumerical = AVAILABLE_FILTERS.includes(orderColumn);
  if (orderMethod === 'ASC') {
    orderedPlanets.sort(
      (planet1, planet2) => {
        const alphabeticalOrder = planet1[orderColumn] > planet2[orderColumn]
          ? 1 : INVERTED;
        return (
          isNumerical
            ? (Number(planet1[orderColumn]) - Number(planet2[orderColumn]))
            : alphabeticalOrder
        );
      },
    );
  } else {
    orderedPlanets.sort(
      (planet1, planet2) => {
        const alphabeticalOrder = planet1[orderColumn] > planet2[orderColumn]
          ? INVERTED : 1;
        return (
          isNumerical
            ? (Number(planet2[orderColumn]) - Number(planet1[orderColumn]))
            : alphabeticalOrder
        );
      },
    );
  }

  return orderedPlanets;
};

const PlanetContext = createContext({});

export const PlanetProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ results: [] });
  const [filters, setFilters] = useState(FILTER_STRUCTURE);
  const [availableFilters, setAvailableFilters] = useState(AVAILABLE_FILTERS);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const apiData = await api.get('/planets');
        setPlanets(apiData.results);
        setData(apiData);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchPlanets();
  }, []);

  useEffect(() => {
    const { filterByName: { name }, order: { column: columnSort, sort } } = filters;
    const planetArray = orderPlanets(data.results, columnSort, sort);
    setPlanets(
      planetArray
        .filter((planet) => planet.name.toLowerCase().includes(name))
        .filter((planet) => {
          let respectsFilter = true;
          filters.filterByNumericValues.forEach(({ column, comparison, value }) => {
            if (comparison === 'maior que') {
              respectsFilter = Number(planet[column]) > Number(value);
            } else if (comparison === 'menor que') {
              respectsFilter = Number(planet[column]) < Number(value);
            } else {
              respectsFilter = planet[column] === value;
            }
          });

          return respectsFilter;
        }),
    );
  }, [data, data.results, filters]);

  useEffect(() => {
    setAvailableFilters(
      AVAILABLE_FILTERS
        .filter((filter) => (
          !filters.filterByNumericValues.map((numFilter) => numFilter.column)
            .includes(filter)
        )),
    );
  }, [filters.filterByNumericValues]);

  const handleName = (name) => {
    setFilters({ ...filters, filterByName: { name } });
  };

  const addFilter = ({ column, comparison, value }) => {
    const newFilter = {
      column,
      comparison,
      value,
    };

    const { filterByNumericValues: filtersArray } = filters;

    setFilters({ ...filters, filterByNumericValues: [...filtersArray, newFilter] });
  };

  const removeFilter = (filterPosition) => {
    const { filterByNumericValues: filtersArray } = filters;

    setFilters({
      ...filters,
      filterByNumericValues: filtersArray
        .filter((_, index) => index !== filterPosition),
    });
  };

  const handleOrder = (orderColumn, orderMethod) => {
    setFilters({
      ...filters,
      order: {
        column: orderColumn,
        sort: orderMethod,
      },
    });
  };

  return (
    <PlanetContext.Provider
      value={
        { planets,
          loading,
          data,
          filters,
          handleName,
          availableFilters,
          addFilter,
          removeFilter,
          handleOrder }
      }
    >
      {children}
    </PlanetContext.Provider>
  );
};

export const usePlanets = () => {
  const context = useContext(PlanetContext);

  if (!context) {
    throw new Error('usePlanets must be used within an PlanetProvider!');
  }

  return context;
};

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
