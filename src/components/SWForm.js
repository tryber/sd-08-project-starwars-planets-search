import React, { useContext } from 'react';
import SWContext from '../context/SWContext';

function SWForm() {
  const {
    handleSearchInput,
    searchInput,
    handleTheComparing,
    handleClick, theComparing,
    comparingParameter,
    compareOptions } = useContext(SWContext);

  return (
    <div>
      <label htmlFor="Name">
        Name:
        <input
          data-testid="name-filter"
          type="text"
          value={ searchInput }
          onChange={ handleSearchInput }
        />
      </label>
      <select
        data-testid="column-filter"
        name="subject"
        value={ theComparing.subject }
        onChange={ handleTheComparing }
      >
        {compareOptions.map((column, index) => (
          <option key={ index }>{column}</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        name="isThan"
        value={ theComparing.isThan }
        onChange={ handleTheComparing }
      >
        {comparingParameter.map((comparingPar, index) => (
          <option key={ index }>{comparingPar}</option>))}
      </select>
      <input
        type="number"
        name="number"
        data-testid="value-filter"
        value={ theComparing.number }
        onChange={ handleTheComparing }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar resultados
      </button>
    </div>

  );
}

export default SWForm;
