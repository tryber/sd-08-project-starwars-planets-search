import React from 'react';
import './App.css';
import Table from './Components/Table';
import Filter from './Components/Filter';
import Sort from './Components/Sort';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <Filter />
      <Sort />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
