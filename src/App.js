import React from 'react';
import './App.css';
import StarProvider from './context/StarProvider';
import Table from './components/Table';

const App = () => (
  <StarProvider>
    <div>
      <span>Hello, App!</span>
      <Table />
    </div>
  </StarProvider>
);

export default App;
