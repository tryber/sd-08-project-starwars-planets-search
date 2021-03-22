import React from 'react';
import './App.css';
import Provider from './Context/Provider';
import Table from './Components/Table';

function App() {
  return (
    <Provider>
      <span>Hello, App!#VQV#</span>
      <Table />
    </Provider>
  );
}

export default App;
