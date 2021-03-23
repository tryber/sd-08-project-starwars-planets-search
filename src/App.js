import React from 'react';
import './App.css';
import Table from './components/Table';
import FilterForm from './components/FilterForm';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <main>
        <span>Hello, App!</span>
        <FilterForm />
        <Table />
      </main>
    </Provider>
  );
}

export default App;
