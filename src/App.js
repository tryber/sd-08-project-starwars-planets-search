import React from 'react';
import './App.css';
import DataProvider from './context/DataProvider';
import Table from './components/Table';
import Inputs from './components/Inputs';

function App() {
  return (
    <DataProvider>
      <div>
        <Inputs />
        <Table />
      </div>
    </DataProvider>
  );
}

export default App;
