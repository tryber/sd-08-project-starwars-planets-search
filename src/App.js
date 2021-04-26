import React from 'react';
import Provider from './context/Provider';
import './App.css';
import Table from './component/Table';
import NameFilter from './component/NameFilter';
import NumericFilter from './component/NumericFilter';
import FiltersChoices from './component/FiltersChoices';
import OrderChoice from './component/OrderChoices';

function App() {
  return (
    <Provider>
      <main>
        <NameFilter />
        <NumericFilter />
        <FiltersChoices />
        <OrderChoice />
        <Table />
      </main>
    </Provider>
  );
}

export default App;
