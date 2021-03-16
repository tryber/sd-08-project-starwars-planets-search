import React from 'react';

import ContextProvider from './context';
import Table from './components/Table';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <ContextProvider>
      <Header />
      <Table />
    </ContextProvider>
  );
}

export default App;
