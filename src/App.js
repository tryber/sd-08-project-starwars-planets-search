import React from 'react';
import './App.css';
import GlobalDataContext from './API/DataContext';
import Table from './components/Table';

function App() {
  return (
    <GlobalDataContext>
      <Table />
    </GlobalDataContext>
  );
}

export default App;
