import React from 'react';
import './App.css';
import ProviderContext from './contextApi/ProviderContext';
import Table from './component/Table';

function App() {
  return (
    <ProviderContext>
      <Table />
    </ProviderContext>
  );
}

export default App;
