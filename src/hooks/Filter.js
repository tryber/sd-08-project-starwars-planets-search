import { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../provider/StarWarsContext';

function FilterName(data, value) {
  if (!value) return data;
  const result = data.filter((el) => {
    if (el.name.includes(value)) return el;
    return '';
  });
  return result;
}

function switchFilter({ column, comparison, value }, planet) {
  if (planet[column] === 'unknown') return '';
  if (comparison === 'maior que' && Number(planet[column]) > Number(value)) {
    return planet;
  }
  if (comparison === 'menor que' && Number(planet[column]) < Number(value)) {
    return planet;
  }
  if (comparison === 'igual a' && Number(planet[column]) === Number(value)) {
    return planet;
  }
  return '';
}

function FilterByColumn(planets, setFilter) {
  let result = [...planets];
  if (setFilter.length === 0) return planets;
  setFilter.forEach((el) => {
    const planetsFilter = result.filter((planet) => switchFilter(el, planet));
    result = [...planetsFilter];
  });
  return result;
}

function orderColumns(planets, { column, sort }) {
  if (sort === 'ASC') {
    if (planets.some((el) => !Number.isNaN(Number(el[column])))) {
      console.log('aqui');
      return planets.sort((a, b) => a[column] - b[column]);
    }
    return planets.sort((a, b) => a[column].localeCompare(b[column]));
  }

  if (planets.some((el) => !Number.isNaN(Number(el[column])))) {
    return planets.sort((a, b) => b[column] - a[column]);
  }

  return planets.sort((a, b) => b[column].localeCompare(a[column]));
}

function Filter() {
  const {
    data,
    filters: {
      filterByName: { name },
      filterByNumericValues,
      order,
    },
    orderApproved,
    setOrderApproved,
  } = useContext(StarWarsContext);

  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    if (orderApproved && data.length > 1) {
      const isOrderPlanets = orderColumns(data, order);
      setPlanets(isOrderPlanets);
      setOrderApproved(false);
    } else {
      setPlanets(data);
    }
  }, [data, order, orderApproved, setOrderApproved]);

  useEffect(() => {
    const planetsFilterName = FilterName(data, name);
    const planetsFilterNumeric = FilterByColumn(planetsFilterName, filterByNumericValues);
    if (orderApproved && planetsFilterNumeric.length > 1) {
      const orderPlanets = orderColumns(planetsFilterNumeric, order);
      setPlanets(orderPlanets);
      setOrderApproved(false);
    } else {
      setPlanets(planetsFilterNumeric);
    }
  }, [data, filterByNumericValues, name, order, orderApproved, setOrderApproved]);

  return [planets];
}

export default Filter;
