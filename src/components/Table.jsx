import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import TableCard from '../components/TableCard';
import SearchNameFilter from './SearchNameFilter';
import FilterByNumbers from './FilterByNumbers';

function Tables() {
  const { dataForRendering, isFetching } = useContext(StarWarsContext);
  const tableHeaders = [
    'Nome',
    'Tempo de Rotação',
    'Período Orbital ',
    'Diâmetro',
    'Clima',
    'Gravidade',
    'Território',
    'Água',
    'População',
    'Filmes',
    'Criação',
    'Data de Edição',
    'URL',
  ];
  
  return !isFetching ? (
    <>
    <SearchNameFilter />
    <FilterByNumbers />
    <table>
      <thead>
        <tr>
          {tableHeaders.map((headElement, index) => (
            <th key={index}>{headElement}</th>
          ))}
        </tr>
      </thead>
      {dataForRendering.map((result, index) => (
        <TableCard key={index} result={result} />
      ))}
    </table>
    </>
  ) : (
    <span>Carregando...</span>
  );
}

export default Tables;
