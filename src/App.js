import React from 'react';
import './App.css';
import Header from './Components/Header';
import Table from './Components/Table';
import FilterArea from './Components/FilterArea';
import Provider from './Hooks/Provider';

function App() {
  return (
    <Provider>
      <Header />
      <FilterArea />
      <Table />
    </Provider>
  );
}

export default App;
