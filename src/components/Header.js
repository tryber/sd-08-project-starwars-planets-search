import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import FormFilter from './FormFilter';
import FormOrder from './FormOrder';
import IconsBackground from './IconsBackground';

import '../styles/Header.css';

function Header() {
  const { handleFilterName } = useContext(StarWarsContext);
  return (
    <header className="header">
      <h1>STAR WARS PLANETS</h1>
      <IconsBackground />
      <div className="form-container">
        <input
          placeholder="filter by name"
          data-testid="name-filter"
          type="text"
          onChange={ handleFilterName }
        />
        <FormFilter />
        <FormOrder />
      </div>

    </header>
  );
}

export default Header;
