import React from 'react';
import './App.css';
import Table from './components/table';
import Header from './components/Header';
import SWProvider from './context/SWProvider';

function App() {
  return (
    <div>
      <SWProvider>
        <Header  />
        <Table />
      </SWProvider>
    </div>
  );
}

export default App;
