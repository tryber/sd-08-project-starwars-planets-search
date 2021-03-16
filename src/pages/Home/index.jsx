import React from 'react';
import SearchBar from '../../components/SearchBar';
import PlanetsTable from '../../components/table/PlanetsTable';
import './styles.css';

const Home = () => (
  <>
    <SearchBar />
    <PlanetsTable />
  </>
);

export default Home;
