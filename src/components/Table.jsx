/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import {
  Table,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import NumericFilterInputs from './NumericFilterInputs';
import SortFilter from './SortFilter';
import NameFilter from './NameFilter';
import { Context } from '../context';

const compareNumbers = (a, b) => {
  const aBeforeB = -1;
  if (a === 'unknown') return aBeforeB;
  if (b === 'unknown') return 1;
  return a - b;
};
const compareWords = (a, b) => {
  const A_BEFORE_B = -1;
  const B_BEFORE_A = 1;
  const A_EQUAL_B = 0;
  if (a < b) return A_BEFORE_B;
  if (a > b) return B_BEFORE_A;
  return A_EQUAL_B;
};

const numbersColumns = [
  'rotation_period',
  'orbital_period',
  'diameter',
  'surface_water',
  'population',
];

const applyOrder = (planetsArray, { column, sort }) => {
  console.log('chamou applyOrder');
  // const { column, sort } = filterObject.filters.order;
  let orderedPlanets = planetsArray;
  if (sort === 'ASC') {
    orderedPlanets = planetsArray.sort((planetA, planetB) => {
      if (numbersColumns.includes(column)) {
        return compareNumbers(
          planetA[column], planetB[column],
        );
      }
      return compareWords(planetA[column], planetB[column]);
    });
  } else if (sort === 'DESC') {
    orderedPlanets = planetsArray.sort((planetA, planetB) => {
      if (numbersColumns.includes(column)) {
        return compareNumbers(
          planetB[column], planetA[column],
        );
      }
      return compareWords(planetB[column], planetA[column]);
    });
  }
  return orderedPlanets;
};

const StarWarsTable = () => {
  const { dataObject, filterObject } = useContext(Context);

  useEffect(() => {
    dataObject.handleData();
  }, []);

  console.log(dataObject, filterObject);
  return (
    <div>
      <InputGroup className="mb-3 p-2">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">Filter by name</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          data-testid="name-filter"
          placeholder="Planet name"
          aria-describedby="basic-addon1"
          value={ filterObject.filters.filterByName.name }
          onChange={ ({ target }) => {
            filterObject.handleFilterByName(target.value);
          } }
        />
      </InputGroup>
      <NumericFilterInputs />
      <NameFilter />
      <SortFilter />
      <Table striped bordered hover variant="dark">
        { console.log('renderizou') }
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation period</th>
            <th>Orbital period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface water</th>
            <th>Population</th>
            <th>Residents</th>
            <th>Films</th>
            <th>Created at</th>
            <th>Edited at</th>
          </tr>
        </thead>
        <tbody>
          { dataObject.planets
            ? applyOrder(dataObject.planets, filterObject.filters.order)
              .filter((result) => result.name.includes(
                filterObject.filters.filterByName.name,
              ))
              .map((planet) => (
                <tr key={ planet.name }>
                  <td data-testid="planet-name">{ planet.name }</td>
                  <td>{ planet.rotation_period }</td>
                  <td>{ planet.orbital_period }</td>
                  <td>{ planet.diameter }</td>
                  <td>{ planet.climate }</td>
                  <td>{ planet.gravity }</td>
                  <td>{ planet.terrain }</td>
                  <td>{ planet.surface_water }</td>
                  <td>{ planet.population }</td>
                  <td>{ planet.residents }</td>
                  <td>{ planet.films }</td>
                  <td>{ planet.created }</td>
                  <td>{ planet.edited }</td>
                </tr>
              ))
            : (
              <tr>
                <td colSpan="13">Loading</td>
              </tr>) }
        </tbody>
      </Table>
    </div>
  );
};

export default StarWarsTable;
