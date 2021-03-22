import React, { useState, useEffect } from 'react';
import MyContextPlanets from './components/MyContext';
import Table from './components/Table';
import fetchApi from './apiUrl';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchApi().then((result) => setData(result));
  }, []);

  return (
    <MyContextPlanets.Provider value={ data }>
      <Table />
    </MyContextPlanets.Provider>
  );
}

export default App;
