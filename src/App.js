import React from 'react';
import './App.css';
import Table from './components/Table';
import DataProvider from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Table />
    </DataProvider>
  );
}

export default App;
