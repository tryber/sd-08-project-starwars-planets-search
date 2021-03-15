import React, { useState, useEffect } from 'react';

import PlanetsTable from './components/PlanetsTable';
import SearchBar from './components/SearchBar';

import getPlanets from './services/api';

import './App.css';

function App() {
  const [data, setData] = useState([]);

  const fetchPlanets = async () => {
    const res = await getPlanets();
    setData(res);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <main>
      <h1>STAR WARS</h1>
      <SearchBar />
      <br />
      <PlanetsTable data={ data } />
      {/* {JSON.stringify(data)} */}
    </main>
  );
}

export default App;
