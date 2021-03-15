import React, { useEffect, useState } from 'react';
import './App.css';
import StarWarsContext from './context/StarWarsContext';
import Table from './componetns/Table';

const Url = 'https://swapi-trybe.herokuapp.com/api/planets/';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { results } = await fetch(Url).then((response) => response.json());
      setData(results);
    }
    fetchData();
  }, []);

  return (
    <StarWarsContext.Provider value={ data }>
      <Table />
    </StarWarsContext.Provider>
  );
  //
}

export default App;
