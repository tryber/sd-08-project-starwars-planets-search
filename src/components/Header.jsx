import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Header() {
  const { fetchData } = useContext(PlanetsContext);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <header>
      <h1>Starwars Planets Search</h1>
    </header>
  );
}

export default Header;
