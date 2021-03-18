import React from 'react';
import './App.css';
import Forms from './components/Forms';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Forms />
      <Table />
    </Provider>
  );
}

export default App;
