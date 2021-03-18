import React, { useContext, useEffect } from 'react';
import Table from '../components/table';
import Forms from '../components/forms';
import PlanetsStarWarsContext from '../context/PlanetsStarWarsContext';
import './homePage.css';

const NUMBER_ONE_NEGATIVE = -1;

function Home() {
  const { planetsStarWars,
    filters, filterDeleteButton,
    setPlanetStarWars, setPlanetStarWarsAUX } = useContext(PlanetsStarWarsContext);

  useEffect(() => {
    const fetchAPI = async () => {
      const planetsStarWarsAPI = await fetch('https://swapi-trybe.herokuapp.com/api/planets');
      const planetsStarWarsJSON = await planetsStarWarsAPI.json();
      setPlanetStarWars(planetsStarWarsJSON.results.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (b.name > a.name) {
          return NUMBER_ONE_NEGATIVE;
        }
        return 0;
      }));
      setPlanetStarWarsAUX(planetsStarWarsJSON.results);
    };
    fetchAPI();
  }, [setPlanetStarWars, setPlanetStarWarsAUX]);

  return (
    <>
      <Forms />
      { !filters.filterByNumericValues.length ? <span>{}</span>
        : filters.filterByNumericValues
          .map((filter, index) => (
            <div key={ index } data-testid="filter">
              <p>{`${filter.column} ${filter.comparison} ${filter.value}`}</p>
              <button type="button" onClick={ () => filterDeleteButton(index) }>x</button>
            </div>
          )) }
      <table className="table">
        <thead className="table-head">
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Residents</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
          </tr>
        </thead>
        <Table planets={ planetsStarWars } />
      </table>
    </>
  );
}

export default Home;
