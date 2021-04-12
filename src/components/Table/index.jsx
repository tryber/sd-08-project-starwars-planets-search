import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StarWarsContext } from '../../context/StarWarsProvider';
import FilterSort from '../FilterSort';
import PlanetsTable from '../PlanetsTable';

const Table = () => {
  const { data, filters, filterFuncs } = useContext(StarWarsContext);
  const { filterByName, filterByNumericValues } = filters;
  const negative = -1;

  const [dataFiltered, setDataFiltered] = useState(data);
  useEffect(() => {
    setDataFiltered(data.filter(({ name }) => name.includes(filterByName.name))
      .sort(({ name: a }, { name: b }) => (a > b ? 1 : negative)));
  }, [data, filterByName.name, negative]);

  const filterButton = () => {
    setDataFiltered(dataFiltered.filter((info) => {
      const { comparasion, column, value } = filterByNumericValues[0];
      filterFuncs.updateOptions(column);

      switch (comparasion) {
      case 'maior que':
        if (info[column] === 'unknown') return false;
        return Number(info[column]) > Number(value);
      case 'menor que':
        if (info[column] === 'unknown') return false;
        return Number(info[column]) < Number(value);
      case 'igual a':
        return info[column] === value;
      default:
        return null;
      }
    }));
  };

  const resetButton = () => setDataFiltered(data) || filterFuncs.resetFilters();

  const sortBy = useCallback((sorting, column) => {
    switch (column) {
    case 'name':
      return setDataFiltered([...data].sort(({ [column]: a }, { [column]: b }) => {
        if (sorting === 'DESC') return b > a ? 1 : negative;
        return a > b ? 1 : negative;
      }));
    case 'orbital_period':
      return setDataFiltered([...data].sort(({ [column]: a }, { [column]: b }) => {
        if (sorting === 'DESC') return b - a;
        return a - b;
      }));
    default:
      return null;
    }
  }, [data, negative]);

  return (
    <>
      <button data-testid="button-filter" type="button" onClick={ filterButton }>
        Filtrar
      </button>
      <table>
        <thead>
          <tr>
            <th>Planeta</th>
            <th>Periodo de rotação</th>
            <th>Periodo em orbita</th>
            <th>Diametro</th>
            <th>Clima</th>
            <th>Gravidade</th>
            <th>Terreno</th>
            <th>Água da superfície</th>
            <th>População</th>
            <th>Filmes</th>
            <th>Criado em</th>
            <th>Mais informações</th>
            <th>Apagar filtro</th>
          </tr>
        </thead>
        <tbody>
          { dataFiltered.map((info) => (
            <PlanetsTable key={ info.name } info={ info } resetButton={ resetButton } />
          )) }
        </tbody>
      </table>
      <FilterSort sortBy={ sortBy } />
    </>
  );
};

export default Table;
