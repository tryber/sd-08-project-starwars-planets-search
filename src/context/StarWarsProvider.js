import React from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = React.useState([]);
  const [newData, setNewData] = React.useState([]);
  const [origin, setOrigin] = React.useState([]);
  const [name, setName] = React.useState('');
  const [filters, setFilters] = React.useState({
    filterByName: {},
    filterByNumericValues: [],
    order: [],
  });
  const [column1, setColumn1] = React.useState('population');
  const [comparison1, setComparison1] = React.useState('maior que');
  const [value1, setValue1] = React.useState(null);
  const [ordColumn, setOrdColumn] = React.useState('population');
  const [ord, setOrd] = React.useState('');

  const [options, setOptions] = React.useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  React.useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((json) => setOrigin(json.results));
  }, []);

  React.useEffect(() => {
    setData(origin.sort((a, b) => a.name.localeCompare(b.name)));
  }, [origin]);

  const atualizaFiltro = () => {
    filters.filterByNumericValues.forEach((item) => {
      const { column, comparison, value } = item;
      switch (comparison) {
      case ('maior que'):
        setData(data
          .filter((planet) => Number(planet[column]) > Number(value)));
        break;
      case ('menor que'):
        setData(data
          .filter((planet) => Number(planet[column]) < Number(value)));
        break;
      case ('igual a'):
        setData(data
          .filter((planet) => Number(planet[column]) === Number(value)));
        break;
      default:
        setData(origin.sort((a, b) => a.name.localeCompare(b.name)));
      }
    });
  };

  const onClickFilter = () => {
    console.log(column1, comparison1, value1);
    filters.filterByNumericValues.push({
      column: column1,
      comparison: comparison1,
      value: value1,
    });
    atualizaFiltro();
  };

  const removeFilter = (item) => {
    const zero = 0;
    filters.filterByNumericValues
      .splice(item, 1);
    if (filters.filterByNumericValues.length !== zero) {
      atualizaFiltro();
    } else {
      setData(origin);
    }
  };

  const ordemASC = (a, b) => {
    switch (ordColumn) {
    case ('population'):
      return a.population - b.population;
    case ('orbital_period'):
      return a.orbital_period - b.orbital_period;
    case ('diameter'):
      return a.diameter - b.diameter;
    case ('rotation_period'):
      return a.rotation_period - b.rotation_period;
    case ('surface_water'):
      return a.surface_water - b.surface_water;
    default:
      console.log('erro');
    }
  };

  const ordemDESC = (a, b) => {
    switch (ordColumn) {
    case ('population'):
      return b.population - a.population;
    case ('orbital_period'):
      return b.orbital_period - a.orbital_period;
    case ('diameter'):
      return b.diameter - a.diameter;
    case ('rotation_period'):
      return b.rotation_period - a.rotation_period;
    case ('surface_water'):
      return b.surface_water - a.surface_water;
    default:
      console.log('erro');
    }
  };

  const onClickOrder = () => {
    filters.order.push({
      column: ordColumn,
      sort: ord,
    });
    if (ord === 'ASC') {
      setData(origin.sort(ordemASC));
    } else {
      setData(origin.sort(ordemDESC));
    }
    atualizaFiltro();
    console.log(data);
    setNewData(data);
    console.log(newData);
  };

  const onNameChange = (itemname) => {
    setData(origin.filter((planetName) => planetName
      .name.toLowerCase().includes(itemname)));
    setName(itemname);
  };

  const context = {
    data,
    setData,
    filters,
    setFilters,
    origin,
    setOrigin,
    name,
    setName,
    onNameChange,
    options,
    setOptions,
    onClickFilter,
    setColumn1,
    setComparison1,
    setValue1,
    removeFilter,
    setOrdColumn,
    setOrd,
    onClickOrder,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
