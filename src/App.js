import React from 'react';
import { Table, FilterInput, FilterByNum } from './components';
import './App.css';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <div className="App">
        <FilterInput />
        <FilterByNum />
        <Table />
      </div>
    </StarWarsProvider>
  );
}

export default App;
