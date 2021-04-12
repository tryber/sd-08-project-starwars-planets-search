import React from 'react';

import Provider from './context/Provider';

import Header from './components/Header/index';
import Table from './components/Table/index';

import './App.css';

function App() {
  return (
    <Provider>
      <div className="App">
        <Header />
        <Table />
      </div>
    </Provider>
  );
}

export default App;
