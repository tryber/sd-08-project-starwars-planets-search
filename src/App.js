import React from 'react';
import Provider from './context/Provider';
import Table from './components/Table';
import FilterComponent from './components/FilterComponent';

export default function App() {
  return (
    <Provider>
      <FilterComponent />
      <Table />
    </Provider>
  );
}
