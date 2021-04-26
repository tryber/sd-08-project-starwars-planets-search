import React from 'react';

import StarWarsProvider from './context/StarWarsProvider';
import Table from './components/Table';
import Header from './components/Header';

import './App.css';

const App = () => (
  <StarWarsProvider>
    <Header />
    <Table />
  </StarWarsProvider>
);

export default App;
