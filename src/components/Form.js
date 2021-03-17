import React, { useContext } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import SWContext from '../context/SWContext';

function Form() {
  const { filters, setFilters } = useContext(SWContext);
  const { filterByName: { name } } = filters;

  function handleChange({ target }) {
    setFilters({
      ...filters,
      filterByName: { name: target.value },

    });
  }

  return (
    <div>
      <InputGroup size="lg">
        <FormControl
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          placeholder="digite aqui seu planeta"
          onChange={ handleChange }
          value={ name }
          data-testid="name-filter"
        />
      </InputGroup>
    </div>
  );
}

export default Form;
