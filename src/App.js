import React from 'react';
import './App.css';
import FiltrosAtivos from './components/FiltrosAtivos';
import Filtro from './components/Filtro';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Filtro />
      <FiltrosAtivos />
      <Table />
    </Provider>
  );
}

export default App;

// feito com auxilio de stackoverflow, projeto meu antigo da turma 6, e repositorio de Daniel greco
