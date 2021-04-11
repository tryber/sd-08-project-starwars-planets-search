import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import FiltroNumero from './FiltroNumero';
import Ordenar from './Ordenar';

export default function Filtro() {
  const { filters, setFilters } = useContext(PlanetsContext);
  const {
    filtrarPorNome: { name },
  } = filters;

  const handleChange = (e) => {
    setFilters({
      ...filters,
      filtrarPorNome: {
        name: e.target.value,
      },
    });
  };

  return (
    <form>
      <input
        type="text"
        value={ name }
        onChange={ handleChange }
        data-testid="name-filter"
      />
      <FiltroNumero />
      <Ordenar />
    </form>
  );
}
