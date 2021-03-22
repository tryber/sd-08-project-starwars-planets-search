import React from 'react';
import './App.css';
import FormInput from './component/FormInput';
import Table from './component/Table';
import StarwarsProvider from './context/StarwarsProvider';

function App() {
  return (
    <StarwarsProvider>
      <div>
        <FormInput />
        <Table />
      </div>
    </StarwarsProvider>
  );
}

export default App;
