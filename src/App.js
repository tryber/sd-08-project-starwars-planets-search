import React, { useEffect, useState } from 'react';
import './App.css';
import StarContext from './context/context';
import Table from './components/Table';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endPoint)
        .then((response) => response.json());
      setData(results);
    }
    fetchData();
  }, []);

  return (
    <StarContext.Provider value={ data }>
      <Table />
    </StarContext.Provider>
  );
}

export default App;
