import React from 'react';
import './App.css';
import Tabela from './components/Tabela';
import Form from './components/Form';
import Provider from './context/Provider';
import SelectForm from './components/SelectForm';
import SelectedFilters from './components/SelectedFilters';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from './images/unnamed.png';

function App() {
  return (
    <Provider>
      <div className="App">
        <img className="Image" src={ image } alt="Star Wars!" />
        <Form />
        <SelectForm />
        <SelectedFilters />
        <Tabela />
      </div>
    </Provider>
  );
}

export default App;
