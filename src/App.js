import React from 'react';
import StarWarsProvider from './context/StarWarsProvider';
import Header from './component/Header';
import Table from './component/Table';
import './App.css';

function App() {
  return (
    <div>
      <StarWarsProvider>
        <Header />
        <Table />
      </StarWarsProvider>
    </div>
  );
}
export default App;
