import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

const StarWarsProvider = ({ children }) => {
  // this.state = { data: [] }
  // this.setState({ data: [100] })

  // useState -> criar 'states'
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [titles, setTitles] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
  });
  const [newColumn, setNewColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const planetsAPI = async () => {
    const { results } = await fetch(endpoint).then((response) => response.json());
    results.map((result) => delete result.residents);

    setAllData(results);
    setTitles(Object.keys(results[0]));
  };

  // useEffect -> aqui, similar ao 'componentDidMount'
  useEffect(() => {
    planetsAPI();
  }, []);

  const filterName = (value) => {
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  };

  const { name } = filters.filterByName;
  // useEffect -> aqui, similar ao 'componentDidUpdate'
  useEffect(() => {
    const filterData = allData.filter((array) => array.name.includes(name));

    setData(filterData);
  }, [allData, name]);

  const filterColumn = (value) => {
    setFilters({
      ...filters,
      filterByNumericValues: {
        ...filters.filterByNumericValues,
        column: value,
      },
    });
  };

  const filterComparison = (value) => {
    setFilters({
      ...filters,
      filterByNumericValues: {
        ...filters.filterByNumericValues,
        comparison: value,
      },
    });
  };

  const filterValue = (value) => {
    setFilters({
      ...filters,
      filterByNumericValues: {
        ...filters.filterByNumericValues,
        value,
      },
    });
  };

  // Auxílio dos meus queridos amigos:
  // Adriano (https://github.com/adrianoforcellini)
  // Arnaelcio (https://github.com/Arnaelcio)
  const { column, comparison, value } = filters.filterByNumericValues;
  const buttonFilter = () => {
    const filterNumData = allData.filter((item) => {
      if (comparison === 'maior que') {
        return item[column] * 1 > value;
      }
      if (comparison === 'menor que') {
        return item[column] * 1 < value;
      }
      if (comparison === 'igual a') {
        return item[column] === value;
      }
      return null;
    });
    setData(filterNumData);
    const filterNewColumn = newColumn.filter((select) => select !== column);
    setNewColumn(filterNewColumn);
  };
  // ----------------------------------------------------------------------

  const context = {
    data,
    titles,
    newColumn,
    filterName,
    filterColumn,
    filterComparison,
    filterValue,
    buttonFilter,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
