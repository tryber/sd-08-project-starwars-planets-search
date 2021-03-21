import React from 'react';
import './App.css';
import FilterRemover from './Components/FilterRemover';
import Filters from './Components/Filters';
import Table from './Components/Table';
import StarWarsProvider from './Contexts/StarWars/StarWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <Filters />
      <FilterRemover />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
