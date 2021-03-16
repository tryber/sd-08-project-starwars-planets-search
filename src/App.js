import React from 'react';
import './App.css';
import Table from './components/Table';
import Filters from './components/Filters';
import Provider from './utils/Provider';

function App() {
  return (
    <Provider>
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;
