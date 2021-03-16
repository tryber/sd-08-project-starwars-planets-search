import React from 'react';
import './App.css';
import Table from './components/Table';
import StarProvider from './context/StarProvider';

function App() {
  return (
    <StarProvider>
      <div className="App">
        <Table />
      </div>
    </StarProvider>
  );
}

export default App;
