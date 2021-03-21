import React from 'react';
import './App.css';
import Table from './components/Table';
import NumberFilter from './components/NumberFilter';
import TodoProvider from './context/TodoProvider';

function App() {
  return (
    <div>
      <h1>Projeto Star Wars</h1>
      <TodoProvider>
        <NumberFilter />
        <Table />
      </TodoProvider>
    </div>
  );
}

export default App;
