import React, { useContext, useEffect } from 'react';
import tableContext from './context/tableContext';
import Header from './components/Header';
import Filters from './components/Filters';
import Table from './components/Table';
import getData from './services/getData';
import filtering from './utils/filtering';

export default function Main() {
  const {
    data,
    setData,
    setIsFetching,
    setFilteredData,
    filters } = useContext(tableContext);

  useEffect(() => {
    getData(setData, setIsFetching, setFilteredData);
  }, []);

  useEffect(() => {
    filtering(data, filters, setFilteredData);
  }, [data]);

  useEffect(() => {
    filtering(data, filters, setFilteredData);
  }, [filters]);
  return (
    <>
      <Header />
      <Filters />
      <main>
        <Table />
      </main>
    </>
  );
}
