import React from 'react';
import Header from './component/Header';
import SelectedFilter from './component/SelectedFilter';
import Table from './component/Table';
import StarWarsProvider from './provider/StarWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <Header />
      <SelectedFilter />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
