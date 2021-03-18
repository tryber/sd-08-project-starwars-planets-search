import React from 'react';
import FilterPlanetName from './FilterPlanetName';
import NumericFilter from './NumericFilter';
import '../styles/header.css';
import StarWarsImage from './StarWarsImage';

function Header() {
  return (
    <header>
      <div className="title-image">
        <h1 className="title">Starwars Planets Search</h1>
        <StarWarsImage />
      </div>
      <div className="header">
        <FilterPlanetName />
        <NumericFilter />
      </div>
    </header>
  );
}

export default Header;
