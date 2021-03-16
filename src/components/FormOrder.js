import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import theads from '../data/theads';
import '../styles/FormOrder.css';

function FormOrder() {
  const { changeOrder } = useContext(StarWarsContext);
  const [localOrder, setLocalOrder] = useState({ column: 'name', order: 'ASC' });
  const handleChange = ({ target }) => {
    setLocalOrder({
      ...localOrder,
      [target.name]: target.value,
    });
  };

  return (
    <form className="form-order">
      <label htmlFor="column">
        Ordem:
        <select
          onChange={ handleChange }
          name="column"
          data-testid="column-sort"
          value={ localOrder.column }
        >
          {theads.map((e, index) => <option key={ index }>{e}</option>)}
        </select>
      </label>
      <label htmlFor="order">
        <input
          onChange={ handleChange }
          name="order"
          value="ASC"
          type="radio"
          data-testid="column-sort-input-asc"
        />
        ASC
        <input
          onChange={ handleChange }
          name="order"
          value="DESC"
          type="radio"
          data-testid="column-sort-input-desc"
        />
        DESC
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => changeOrder(localOrder) }
      >
        Ordenar
      </button>

    </form>
  );
}

export default FormOrder;
