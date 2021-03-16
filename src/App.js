import React from 'react';
import './App.css';
import Provider from './context/Provider';
import TablePage from './pages/TablePage';
import SearchBar from './components/SearchBar';
import CustomFilters from './components/CustomFilters';

function App() {
  return (
    <Provider>
      <SearchBar />
      <CustomFilters />
      <TablePage />
    </Provider>
  );
}

export default App;
