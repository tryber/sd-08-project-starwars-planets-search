import React, { useContext } from 'react';
import ContextStars from '../context/ContextStar';

function FiltroAtivo() {
  const contextos = useContext(ContextStars);
  const { filtroAtivo,
    setfiltroAtivo, restoreplanets,
    setfilteredplanets } = contextos;
  const { column } = filtroAtivo;

  function apagaFiltro() {
    setfilteredplanets(restoreplanets);
    setfiltroAtivo([]);
  }

  return (
    column && <div
      data-testid="REMOVE_FILTER_SELECTOR"
    >
      {`${column}`}
      <button type="button" onClick={ apagaFiltro }>X</button>

    </div>

  );
}

export default FiltroAtivo;
