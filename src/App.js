import React from 'react';
import Provider from './context/Provider';
import './App.css';
import Table from './Components/Table';
import Header from './Components/Header';

function App() {
  return (
    <Provider>
      <h1>StarWars</h1>
      <Header />
      <Table />
    </Provider>
  );
}

export default App;
