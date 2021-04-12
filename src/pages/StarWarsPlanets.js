import React from 'react';
import Filters from '../components/Filters';
import Sort from '../components/Sort';
import PlanetsTable from '../components/PlanetsTable';
import starWarsLogo from '../images/starWarsLogo.svg';

function starWarsPlanets() {
  return (
    <div>
      <img
        className="star-wars-logo"
        alt="star wars logo"
        src={ starWarsLogo }
      />
      <h1>Planets</h1>
      <Filters />
      <Sort />
      <PlanetsTable />
    </div>
  );
}

export default starWarsPlanets;
