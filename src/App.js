import React, { useState, useEffect } from 'react';
import StarWarsContext from './context/StarWarsContext';
import TablePlanet from './pages/Table';
import Filters from './components/Filters';

function App() {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [starWars, setStarWars] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '' },
    filterByNumericValues: [],
  });

  const initialState = {
    starWars,
    setStarWars,
    filters,
    setFilters,
  };

  useEffect(() => {
    async function data() {
      const { results } = await fetch(url)
        .then((response) => response.json());
      setStarWars(results);
    }
    data();
  }, [url]);

  return (
    <div>
      <StarWarsContext.Provider value={ initialState }>
        <Filters />
        <TablePlanet />
      </StarWarsContext.Provider>
    </div>
  );
}

export default App;
