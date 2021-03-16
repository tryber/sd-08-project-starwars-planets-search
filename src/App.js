import React from 'react';

import Provider from './context/Provider';
import Filters from './components/Filters';
import Table from './components/Table';

import './App.css';

function App() {
  return (
    <Provider>
      <div className="background">
        <h1 className="title is-1 header">Star Wars Planets</h1>
        <Filters />
      </div>
      <Table />
    </Provider>
  );
}

export default App;
